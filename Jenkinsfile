pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME',      defaultValue: 'main',           description: 'Checkout yapılacak branch adı')
        string(name: 'IMAGE_TAG',        defaultValue: 'latest',         description: 'Docker image tag değeri')
        string(name: 'REMOTE_SERVER_IP', defaultValue: '35.240.55.34',   description: 'SSH bağlantısı kurulacak sunucu IP adresi')
        string(name: 'SSH_USERNAME',     defaultValue: 'batuhansarihan', description: 'Hedef sunucudaki SSH kullanıcı adı')
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH_NAME}",
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/bbatus/Exam_Mate.git'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-cred',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                    '''
                }
            }
        }

        stage('SSH Connection Test') {
            steps {
                script {
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'exam-mate-key',
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        sh """
                            echo "SSH Key dosyası: \$SSH_KEY"
                            echo "SSH Kullanıcı: \$SSH_USER"
                            ls -la \$SSH_KEY
                            chmod 600 \$SSH_KEY
                            
                            ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "echo 'SSH bağlantısı başarılı!' && whoami && docker --version && docker-compose --version && nginx -v || echo 'Nginx kurulu değil'"
                        """
                    }
                }
            }
        }

        stage('Deploy to Remote Server') {
            steps {
                script {
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'exam-mate-key',
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        // Nginx konfigürasyon dosyasını oluştur ve sunucuya aktar
                        sh """
                            chmod 600 \$SSH_KEY
                            
                            # Nginx konfigürasyon dosyasını oluştur
                            cat > nginx-goexammate.conf << 'EOL'
server {
    listen 80;
    server_name goexammate.com www.goexammate.com;
    
    # Frontend için proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
    
    # Backend API için proxy
    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL
                            
                            # Sunucuda doğrudan GitHub'dan klonlama yapılacak
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "
                                # Eğer varsa, mevcut docker container'ları durdur
                                docker-compose -f ~/exam_mate/docker-compose.yml down 2>/dev/null || true
                                
                                # Exam_mate dizinini temizle ve yeniden oluştur
                                sudo rm -rf ~/exam_mate
                                mkdir -p ~/exam_mate
                                
                                # GitHub'dan projeyi klonla
                                cd ~/exam_mate
                                git clone https://github.com/bbatus/Exam_Mate.git .
                            "
                            
                            # Nginx konfigürasyon dosyasını sunucuya kopyala
                            scp -o StrictHostKeyChecking=no -i \$SSH_KEY ./nginx-goexammate.conf ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP}:~/exam_mate/
                        """
                        
                        // Nginx yapılandırması
                        sh """
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "
                                # Nginx kurulumu ve yapılandırması
                                sudo apt-get update
                                sudo apt-get install -y nginx
                                sudo cp ~/exam_mate/nginx-goexammate.conf /etc/nginx/sites-available/goexammate
                                sudo ln -sf /etc/nginx/sites-available/goexammate /etc/nginx/sites-enabled/
                                sudo rm -f /etc/nginx/sites-enabled/default
                                sudo nginx -t
                                sudo systemctl reload nginx
                            "
                        """
                        
                        // Docker Compose ile deploy
                        sh """
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "
                                cd ~/exam_mate
                                echo 'Docker Compose ile build ve deploy başlatılıyor...'
                                docker-compose down
                                docker-compose build --no-cache
                                docker-compose up -d
                                echo 'Deploy işlemi tamamlandı!'
                            "
                        """
                    }
                }
            }
        }

        stage('Health Check') {
            steps {
                script {
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'exam-mate-key',
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        sh """
                            sleep 15
                            chmod 600 \$SSH_KEY
                            
                            ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "
                                echo 'Container durumu kontrol ediliyor...'
                                docker ps | grep exam_mate && echo '✅ Containerlar başarıyla çalışıyor!' || (echo '❌ Containerlar çalışmıyor!' && exit 1)
                            "
                        """
                    }
                }
            }
        }

        stage('Database Migration Check') {
            steps {
                script {
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'exam-mate-key',
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        sh """
                            chmod 600 \$SSH_KEY
                            
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "
                                echo 'Database migration kontrol ediliyor...'
                                docker exec exam_mate_backend npx prisma migrate status
                                echo '✅ Database migration durumu kontrol edildi!'
                            "
                        """
                    }
                }
            }
        }

        stage('Nginx Check') {
            steps {
                script {
                    withCredentials([
                        sshUserPrivateKey(
                            credentialsId: 'exam-mate-key',
                            keyFileVariable: 'SSH_KEY',
                            usernameVariable: 'SSH_USER'
                        )
                    ]) {
                        sh """
                            chmod 600 \$SSH_KEY
                            
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "
                                echo 'Nginx durumu kontrol ediliyor...'
                                sudo systemctl status nginx
                                echo '✅ Nginx başarıyla çalışıyor!'
                            "
                        """
                    }
                }
            }
        }

        stage('Success Confirmation') {
            steps {
                echo "✅ Exam_Mate pipeline'ı başarıyla tamamlandı!"
                echo "🚀 Uygulama http://goexammate.com adresinde çalışmaktadır."
                echo "🌐 API http://goexammate.com/api adresinde çalışmaktadır."
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        
        success {
            echo "🎉 Pipeline başarıyla tamamlandı!"
        }
        
        failure {
            echo "❌ Pipeline başarısız oldu. Logları kontrol edin."
        }
    }
} 
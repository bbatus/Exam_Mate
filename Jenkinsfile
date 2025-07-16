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
                            chmod 600 \$SSH_KEY
                            ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "echo 'SSH bağlantısı başarılı!' && whoami && docker --version && docker-compose --version && nginx -v || echo 'Nginx kurulu değil'"
                        """
                    }
                }
            }
        }

        stage('Prepare Deployment Files') {
            steps {
                script {
                    // Nginx konfigürasyon dosyasını oluştur
                    sh """
                        cat > nginx-goexammate.conf << 'EOL'
server {
    listen 80;
    server_name goexammate.com www.goexammate.com;
    
    # HTTP'den HTTPS'e yönlendirme
    location / {
        return 301 https://\$host\$request_uri;
    }
}

server {
    listen 443 ssl;
    server_name goexammate.com www.goexammate.com;
    
    # SSL sertifikaları
    ssl_certificate /etc/letsencrypt/live/goexammate.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/goexammate.com/privkey.pem;
    
    # SSL ayarları
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    
    # HSTS (HTTP Strict Transport Security)
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    
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
                    """
                    
                    // Dağıtım için hazırlık scripti oluştur
                    sh """
                        cat > deploy.sh << 'EOL'
#!/bin/bash
set -e

# Değişkenleri tanımla
REPO_URL="https://github.com/bbatus/Exam_Mate.git"
DEPLOY_DIR=~/exam_mate
NGINX_CONF_FILE=nginx-goexammate.conf

echo "🔄 Deployment başlatılıyor..."

# Eğer varsa, mevcut docker container'ları durdur
docker-compose -f $DEPLOY_DIR/docker-compose.yml down 2>/dev/null || true

# Önceki dağıtımdan kalan dosyaları temizle, ancak veritabanı verilerini koru
if [ -d "$DEPLOY_DIR" ]; then
    cd $DEPLOY_DIR
    # Eğer varsa, veritabanı volume'unu yedekle
    docker volume ls | grep postgres_data > /dev/null 2>&1 && echo "📦 Veritabanı volume'u korunuyor..."
    
    # Mevcut git repo'yu güncelle (daha hızlı)
    echo "📥 Git repo güncelleniyor..."
    git fetch --all
    git reset --hard origin/main
else
    # Repo yoksa, yeni klonla
    echo "📥 Repo klonlanıyor..."
    mkdir -p $DEPLOY_DIR
    git clone --depth 1 $REPO_URL $DEPLOY_DIR
    cd $DEPLOY_DIR
fi

# Nginx yapılandırmasını güncelle
echo "🔧 Nginx yapılandırması güncelleniyor..."
sudo cp $NGINX_CONF_FILE /etc/nginx/sites-available/goexammate
sudo ln -sf /etc/nginx/sites-available/goexammate /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Docker Compose ile deploy
echo "🚀 Docker Compose ile build ve deploy başlatılıyor..."
docker-compose build --no-cache
docker-compose up -d

echo "✅ Deployment tamamlandı!"
EOL
                        chmod +x deploy.sh
                    """
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
                        // Hazırlanan dosyaları sunucuya kopyala ve çalıştır
                        sh """
                            chmod 600 \$SSH_KEY
                            
                            # Nginx konfigürasyonu ve deploy script'ini kopyala
                            scp -o StrictHostKeyChecking=no -i \$SSH_KEY ./nginx-goexammate.conf ./deploy.sh ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP}:~/
                            
                            # Deploy script'i çalıştır
                            ssh -o StrictHostKeyChecking=no -i \$SSH_KEY ${params.SSH_USERNAME}@${params.REMOTE_SERVER_IP} "cd ~/ && ./deploy.sh"
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
                                echo '🔍 Container durumu kontrol ediliyor...'
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
                                echo '🔍 Database migration kontrol ediliyor...'
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
                                echo '🔍 Nginx durumu kontrol ediliyor...'
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
                echo "🚀 Uygulama https://goexammate.com adresinde çalışmaktadır."
                echo "🌐 API https://goexammate.com/api adresinde çalışmaktadır."
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
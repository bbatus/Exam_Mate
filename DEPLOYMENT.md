# Exam_Mate Canlıya Alma Rehberi

Bu belge, Exam_Mate projesinin canlı ortama nasıl deploy edileceğini adım adım anlatmaktadır.

## İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Manuel Deployment](#manuel-deployment)
3. [CI/CD ile Otomatik Deployment](#cicd-ile-otomatik-deployment)
4. [Veritabanı Kurulumu](#veritabanı-kurulumu)
5. [Ortam Değişkenleri](#ortam-değişkenleri)
6. [Nginx ve SSL Yapılandırması](#nginx-ve-ssl-yapılandırması)
7. [Güvenlik Önlemleri](#güvenlik-önlemleri)
8. [Sorun Giderme](#sorun-giderme)
9. [Bakım ve İzleme](#bakım-ve-izleme)

## Gereksinimler

Canlı ortamda aşağıdaki yazılımların kurulu olması gerekmektedir:

- Docker ve Docker Compose (en güncel sürüm)
- Git
- Nginx (web sunucusu ve reverse proxy için)
- Certbot (SSL sertifikaları için)
- Jenkins (CI/CD için)

## Manuel Deployment

### 1. Sunucu Hazırlığı

```bash
# Gerekli paketleri yükleyin
sudo apt update
sudo apt install -y docker.io docker-compose git nginx certbot python3-certbot-nginx

# Docker servisini başlatın
sudo systemctl enable docker
sudo systemctl start docker

# Nginx servisini başlatın
sudo systemctl enable nginx
sudo systemctl start nginx

# Kullanıcınızı docker grubuna ekleyin
sudo usermod -aG docker $USER

# Değişikliklerin etkili olması için oturumu kapatıp açın
# veya şu komutu çalıştırın:
newgrp docker
```

### 2. Projeyi Klonlama

```bash
# Projeyi klonlayın
git clone https://github.com/bbatus/Exam_Mate.git
cd Exam_Mate

# İstediğiniz branch'e geçin (genellikle main)
git checkout main
```

### 3. Ortam Değişkenlerini Ayarlama

```bash
# Backend için .env dosyası oluşturun
cat > backend/.env << EOL
DATABASE_URL=postgresql://user:password@db:5432/exam_mate_db?schema=public
PORT=5000
EOL

# Frontend için .env dosyası oluşturun (gerekirse)
cat > frontend/.env << EOL
VITE_API_URL=http://localhost:5001
EOL
```

### 4. Docker Compose ile Çalıştırma

```bash
# Docker imajlarını oluşturun ve konteynerleri başlatın
docker-compose up -d

# Veritabanı migrasyonlarını çalıştırın
docker-compose exec backend npx prisma migrate deploy

# Seed verilerini ekleyin
docker-compose exec backend npx prisma db seed
```

### 5. Nginx Yapılandırması

```bash
# Nginx konfigürasyon dosyasını oluşturun
sudo nano /etc/nginx/sites-available/goexammate

# Aşağıdaki içeriği ekleyin:
server {
    listen 80;
    server_name goexammate.com www.goexammate.com;
    
    # Frontend için proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API için proxy
    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# Sembolik bağlantı oluşturun
sudo ln -s /etc/nginx/sites-available/goexammate /etc/nginx/sites-enabled/

# Varsayılan siteyi devre dışı bırakın
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx yapılandırmasını test edin
sudo nginx -t

# Nginx'i yeniden başlatın
sudo systemctl reload nginx
```

### 6. SSL Sertifikası Kurulumu

```bash
# Let's Encrypt SSL sertifikası alın
sudo certbot --nginx -d goexammate.com -d www.goexammate.com

# Otomatik yenileme işlemini test edin
sudo certbot renew --dry-run
```

### 7. Kontrol

```bash
# Konteynerlerin çalıştığını kontrol edin
docker-compose ps

# Backend loglarını kontrol edin
docker-compose logs backend

# Frontend loglarını kontrol edin
docker-compose logs frontend

# Nginx durumunu kontrol edin
sudo systemctl status nginx
```

## CI/CD ile Otomatik Deployment

### 1. Jenkins Kurulumu

Jenkins'i sunucunuza kurun ve yapılandırın. Detaylı bilgi için [Jenkins Resmi Dokümantasyonu](https://www.jenkins.io/doc/book/installing/)nu inceleyebilirsiniz.

### 2. Jenkins Credentials Ekleme

Jenkins'te aşağıdaki kimlik bilgilerini ekleyin:

1. **github-credentials**: GitHub repo'ya erişim için kullanıcı adı/şifre veya SSH anahtarı
2. **dockerhub-cred**: Docker Hub'a imaj push etmek için kullanıcı adı/şifre
3. **exam-mate-key**: Canlı sunucuya SSH ile bağlanmak için özel anahtar

### 3. Jenkins Pipeline Oluşturma

1. Jenkins'te yeni bir Pipeline job oluşturun
2. "Pipeline script from SCM" seçeneğini seçin
3. SCM olarak Git'i seçin
4. Repository URL'sini girin: `https://github.com/bbatus/Exam_Mate.git`
5. Credentials olarak github-credentials'ı seçin
6. Branch olarak `*/main` girin
7. Script Path olarak `Jenkinsfile` girin
8. Kaydedin

### 4. Pipeline Çalıştırma

Pipeline'ı manuel olarak çalıştırın veya webhook ile otomatik tetiklenmesini sağlayın.

### 5. Optimize Edilmiş Deployment Süreci

Mevcut Jenkins pipeline'ı şu adımları içerir:

1. **Checkout**: GitHub'dan projeyi çeker
2. **Docker Login**: Docker Hub'a giriş yapar
3. **SSH Connection Test**: Sunucu bağlantısını test eder
4. **Prepare Deployment Files**: Nginx konfigürasyonu ve deploy script'i hazırlar
5. **Deploy to Remote Server**: Hazırlanan dosyaları sunucuya kopyalar ve deploy script'i çalıştırır
6. **Health Check**: Konteynerların çalıştığını kontrol eder
7. **Database Migration Check**: Veritabanı migrasyonlarını kontrol eder
8. **Nginx Check**: Nginx'in çalıştığını kontrol eder

Deploy script'i, veritabanı verilerini koruyarak hızlı bir şekilde güncelleme yapar:
- Eğer repo zaten varsa, sadece git pull ile günceller (tam klonlama yapmaz)
- Docker volume'larını korur
- Nginx yapılandırmasını günceller
- Docker Compose ile uygulamayı yeniden oluşturur ve başlatır

## Veritabanı Kurulumu

Veritabanı, Docker Compose ile otomatik olarak kurulur, ancak manuel işlemler için:

```bash
# Veritabanı konteynerine bağlanın
docker-compose exec db psql -U user -d exam_mate_db

# Veritabanı durumunu kontrol edin
docker-compose exec backend npx prisma migrate status

# Veritabanını sıfırlayın (tüm veriler silinir!)
docker-compose exec backend npx prisma migrate reset --force

# Veritabanı yedeği alın
docker-compose exec db pg_dump -U user exam_mate_db > backup_$(date +%Y%m%d).sql

# Veritabanı yedeğini geri yükleyin
cat backup_20240715.sql | docker-compose exec -T db psql -U user -d exam_mate_db
```

## Ortam Değişkenleri

### Backend (.env)

```
DATABASE_URL=postgresql://user:password@db:5432/exam_mate_db?schema=public
PORT=5000
NODE_ENV=production
```

### Frontend (.env)

```
VITE_API_URL=/api
```

## Nginx ve SSL Yapılandırması

### Temel Nginx Yapılandırması

```nginx
server {
    listen 80;
    server_name goexammate.com www.goexammate.com;
    
    # HTTP'den HTTPS'e yönlendirme
    location / {
        return 301 https://$host$request_uri;
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
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_session_timeout 1d;
    ssl_session_cache shared:SSL:10m;
    ssl_session_tickets off;
    
    # HSTS (HTTP Strict Transport Security)
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    
    # Frontend için proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Backend API için proxy
    location /api/ {
        proxy_pass http://localhost:5001/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### SSL Sertifikası Yenileme

Let's Encrypt sertifikaları 90 gün geçerlidir ve otomatik olarak yenilenir. Manuel yenileme için:

```bash
sudo certbot renew
```

## Güvenlik Önlemleri

1. **HTTPS Kullanımı**: Tüm HTTP trafiği HTTPS'e yönlendirilir.

2. **Firewall Yapılandırması**: Sadece gerekli portları açın (80, 443, SSH).
   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw allow ssh
   sudo ufw enable
   sudo ufw status
   ```

3. **Docker Güvenliği**: Konteynerler sadece localhost'a bağlanır.
   ```yaml
   ports:
     - "127.0.0.1:3000:5173"  # Sadece localhost
   ```

4. **Rate Limiting**: API isteklerine rate limiting uygulayın.
   ```nginx
   limit_req_zone $binary_remote_addr zone=api:10m rate=5r/s;
   
   location /api/ {
       limit_req zone=api burst=10 nodelay;
       # ... diğer ayarlar
   }
   ```

5. **Düzenli Yedekleme**: Veritabanını düzenli olarak yedekleyin.
   ```bash
   # Cron job ekleyin
   (crontab -l ; echo "0 2 * * * docker-compose -f /home/batuhansarihan/exam_mate/docker-compose.yml exec -T db pg_dump -U user exam_mate_db > /home/batuhansarihan/backups/backup_$(date +\%Y\%m\%d).sql") | crontab -
   ```

## Sorun Giderme

### Konteynerler Başlamıyor

```bash
# Konteyner loglarını kontrol edin
docker-compose logs

# Spesifik bir konteynerin loglarını kontrol edin
docker-compose logs backend
```

### Veritabanı Bağlantı Hatası

```bash
# Veritabanı konteynerinin çalıştığını kontrol edin
docker-compose ps db

# Veritabanı bağlantısını test edin
docker-compose exec backend npx prisma db pull
```

### Frontend API'ye Bağlanamıyor

1. Backend'in çalıştığını kontrol edin
2. CORS ayarlarını kontrol edin
3. Frontend'in doğru API URL'sini kullandığını kontrol edin
4. Nginx proxy ayarlarını kontrol edin

### Nginx veya SSL Sorunları

```bash
# Nginx yapılandırmasını test edin
sudo nginx -t

# Nginx error loglarını kontrol edin
sudo tail -f /var/log/nginx/error.log

# SSL sertifikalarını kontrol edin
sudo certbot certificates
```

## Bakım ve İzleme

### Günlük Bakım Görevleri

1. **Log Rotasyonu**: Logların disk alanını doldurmamasını sağlayın
   ```bash
   sudo logrotate -f /etc/logrotate.d/nginx
   ```

2. **Disk Kullanımı Kontrolü**: Disk alanının dolmadığından emin olun
   ```bash
   df -h
   ```

3. **Konteyner Sağlık Kontrolü**: Konteynerların sağlıklı çalıştığını doğrulayın
   ```bash
   docker-compose ps
   ```

### Sistem Güncellemeleri

```bash
# Sistem güncellemelerini kontrol edin
sudo apt update
sudo apt list --upgradable

# Güvenli güncellemeleri yükleyin
sudo apt upgrade -y

# Docker ve Docker Compose güncellemeleri
sudo apt update
sudo apt install -y docker.io docker-compose
```

### Performans İzleme

```bash
# Sistem kaynak kullanımını izleyin
htop

# Docker konteyner kaynak kullanımını izleyin
docker stats
```

---

Bu rehber, Exam_Mate projesinin canlıya alınması ve bakımı için temel adımları içermektedir. Projenin özel gereksinimlerine göre ek adımlar gerekebilir. 
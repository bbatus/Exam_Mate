# Exam_Mate Canlıya Alma Rehberi

Bu belge, Exam_Mate projesinin canlı ortama nasıl deploy edileceğini adım adım anlatmaktadır.

## İçindekiler

1. [Gereksinimler](#gereksinimler)
2. [Manuel Deployment](#manuel-deployment)
3. [CI/CD ile Otomatik Deployment](#cicd-ile-otomatik-deployment)
4. [Veritabanı Kurulumu](#veritabanı-kurulumu)
5. [Ortam Değişkenleri](#ortam-değişkenleri)
6. [Güvenlik Önlemleri](#güvenlik-önlemleri)
7. [Sorun Giderme](#sorun-giderme)

## Gereksinimler

Canlı ortamda aşağıdaki yazılımların kurulu olması gerekmektedir:

- Docker ve Docker Compose (en güncel sürüm)
- Git
- Node.js (opsiyonel, sadece doğrudan sunucuda geliştirme yapılacaksa)
- Jenkins (CI/CD için)

## Manuel Deployment

### 1. Sunucu Hazırlığı

```bash
# Gerekli paketleri yükleyin
sudo apt update
sudo apt install -y docker.io docker-compose git

# Docker servisini başlatın
sudo systemctl enable docker
sudo systemctl start docker

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

# İstediğiniz branch'e geçin (genellikle main veya master)
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

### 5. Kontrol

```bash
# Konteynerlerin çalıştığını kontrol edin
docker-compose ps

# Backend loglarını kontrol edin
docker-compose logs backend

# Frontend loglarını kontrol edin
docker-compose logs frontend
```

## CI/CD ile Otomatik Deployment

### 1. Jenkins Kurulumu

Jenkins'i sunucunuza kurun ve yapılandırın. Detaylı bilgi için [Jenkins Resmi Dokümantasyonu](https://www.jenkins.io/doc/book/installing/)nu inceleyebilirsiniz.

### 2. Jenkins Credentials Ekleme

Jenkins'te aşağıdaki kimlik bilgilerini ekleyin:

1. **github-credentials**: GitHub repo'ya erişim için kullanıcı adı/şifre veya SSH anahtarı
2. **dockerhub-cred**: Docker Hub'a imaj push etmek için kullanıcı adı/şifre
3. **server-ssh-key**: Canlı sunucuya SSH ile bağlanmak için özel anahtar

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

## Veritabanı Kurulumu

Veritabanı, Docker Compose ile otomatik olarak kurulur, ancak manuel işlemler için:

```bash
# Veritabanı konteynerine bağlanın
docker-compose exec db psql -U user -d exam_mate_db

# Veritabanı durumunu kontrol edin
docker-compose exec backend npx prisma migrate status

# Veritabanını sıfırlayın (tüm veriler silinir!)
docker-compose exec backend npx prisma migrate reset --force
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
VITE_API_URL=https://api.exammate.com
```

## Güvenlik Önlemleri

1. **HTTPS Yapılandırması**: Canlı ortamda HTTPS kullanın. Nginx veya Traefik ile SSL terminasyonu yapabilirsiniz.

2. **Firewall Yapılandırması**: Sadece gerekli portları açın (80, 443, SSH).

3. **Rate Limiting**: API isteklerine rate limiting uygulayın.

4. **Düzenli Yedekleme**: Veritabanını düzenli olarak yedekleyin.

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

---

Bu rehber, Exam_Mate projesinin canlıya alınması için temel adımları içermektedir. Projenin özel gereksinimlerine göre ek adımlar gerekebilir. 
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
    
    # Problematik dosyaları temizle
    echo "🧹 Problematik dosyaları temizleniyor..."
    sudo rm -rf backend/dist/ || true
    sudo rm -rf node_modules/ || true
    
    # Sahiplik sorunlarını çöz
    sudo chown -R $(whoami):$(whoami) . || true
    
    # Git reset işlemini gerçekleştir
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
sudo cp ~/$NGINX_CONF_FILE /etc/nginx/sites-available/goexammate
sudo ln -sf /etc/nginx/sites-available/goexammate /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx

# Docker Compose ile deploy
echo "🚀 Docker Compose ile build ve deploy başlatılıyor..."
docker-compose build --no-cache
docker-compose up -d

# Veritabanı migrasyonlarını uygula
echo "🔄 Veritabanı migrasyonları uygulanıyor..."
sleep 10  # Veritabanı ve backend'in başlaması için bekle
docker exec exam_mate_backend npx prisma migrate deploy
docker exec exam_mate_backend npx prisma generate

echo "✅ Deployment tamamlandı!" 
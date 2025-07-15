# Nginx ve Domain Yapılandırma Rehberi

Bu rehber, Exam_Mate uygulamasını `goexammate.com` domain adı ile yayınlamak için gerekli adımları içerir.

## 1. Nginx Kurulumu

Sunucunuzda Nginx'in kurulu olup olmadığını kontrol edin:

```bash
nginx -v
```

Eğer kurulu değilse, aşağıdaki komutları çalıştırarak Nginx'i kurun:

```bash
sudo apt update
sudo apt install nginx -y
```

## 2. Nginx Servisini Başlatma ve Etkinleştirme

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
sudo systemctl status nginx
```

## 3. Güvenlik Duvarı Ayarları

Eğer sunucunuzda UFW (Uncomplicated Firewall) kullanıyorsanız, aşağıdaki komutları çalıştırarak gerekli portları açın:

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow ssh
sudo ufw enable
```

## 4. Domain DNS Ayarları

Domain sağlayıcınızın yönetim panelinde, `goexammate.com` ve `www.goexammate.com` için A kaydı oluşturun ve sunucu IP adresinize yönlendirin:

| Tür | Ad | Değer |
|-----|-----|-------|
| A | goexammate.com | SUNUCU_IP_ADRESI |
| A | www.goexammate.com | SUNUCU_IP_ADRESI |

## 5. Nginx Konfigürasyonu

Nginx konfigürasyon dosyası (`nginx-goexammate.conf`) Jenkins pipeline'ı tarafından sunucunuza kopyalanacak ve otomatik olarak yapılandırılacaktır. Manuel olarak yapılandırmak isterseniz:

```bash
# Konfigürasyon dosyasını oluşturun
sudo nano /etc/nginx/sites-available/goexammate

# Dosyaya nginx-goexammate.conf içeriğini ekleyin

# Sembolik bağlantı oluşturun
sudo ln -s /etc/nginx/sites-available/goexammate /etc/nginx/sites-enabled/

# Varsayılan siteyi devre dışı bırakın (isteğe bağlı)
sudo rm /etc/nginx/sites-enabled/default

# Konfigürasyonu test edin
sudo nginx -t

# Nginx'i yeniden başlatın
sudo systemctl reload nginx
```

## 6. SSL Sertifikası (HTTPS) Kurulumu

Ücretsiz SSL sertifikası için Let's Encrypt kullanabilirsiniz:

```bash
# Certbot kurulumu
sudo apt install certbot python3-certbot-nginx -y

# SSL sertifikası alınması
sudo certbot --nginx -d goexammate.com -d www.goexammate.com

# Otomatik yenileme için test
sudo certbot renew --dry-run
```

SSL kurulumu tamamlandıktan sonra, Nginx konfigürasyon dosyasındaki ilgili satırları aktifleştirin.

## 7. Docker Compose Güvenlik Ayarları

Docker Compose dosyasında (`docker-compose.yml`), servislerin sadece localhost üzerinden erişilebilir olduğundan emin olun:

```yaml
services:
  frontend:
    ports:
      - "127.0.0.1:3000:5173"  # Sadece localhost
    
  backend:
    ports:
      - "127.0.0.1:5001:5000"  # Sadece localhost
    
  db:
    ports:
      - "127.0.0.1:5433:5432"  # Sadece localhost
```

## 8. Vite Yapılandırması

Frontend projesinin Vite yapılandırmasında, domain adınızın izin verilen hostlar listesinde olduğundan emin olun:

```javascript
server: {
  host: '0.0.0.0',
  port: 5173,
  allowedHosts: [
    'localhost',
    'goexammate.com',
    'www.goexammate.com'
  ]
}
```

## 9. Sorun Giderme

### Nginx Logları

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Nginx Durumu

```bash
sudo systemctl status nginx
```

### DNS Kontrolü

```bash
nslookup goexammate.com
dig goexammate.com
```

### SSL Sertifikası Kontrolü

```bash
sudo certbot certificates
```

## 10. Bakım ve Güncelleme

### Nginx Güncelleme

```bash
sudo apt update
sudo apt upgrade nginx
sudo systemctl restart nginx
```

### SSL Sertifikası Yenileme

```bash
sudo certbot renew
```

Bu rehber, Exam_Mate uygulamasını `goexammate.com` domain adı ile yayınlamak için gerekli tüm adımları içermektedir. Herhangi bir sorunla karşılaşırsanız, yukarıdaki sorun giderme adımlarını takip edebilirsiniz. 
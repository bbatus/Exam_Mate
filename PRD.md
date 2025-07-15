# Exam_Mate - Ürün Gereksinimleri Dokümanı (PRD)

**Versiyon:** 3.0
**Tarih:** 20 Temmuz 2024
**Yazar:** Proje Ekibi

---

## 1. Amaç (Purpose)

Bu projenin temel amacı, teknoloji alanındaki profesyonel sertifika sınavlarına (örneğin: Google Cloud Digital Leader, AWS Certified Cloud Practitioner, Microsoft Azure Fundamentals vb.) hazırlanan bireyler için modern, interaktif ve **kayıt gerektirmeyen** bir web platformu geliştirmektir. Platform, kullanıcıların güncel çalışma sorularını üyelik oluşturmadan hızlıca çözerek sınavlara etkin bir şekilde hazırlanmalarını, bilgi seviyelerini ölçmelerini ve başarı oranlarını artırmalarını hedeflemektedir.

## 2. Hedef Kitle (Target Audience)

- **Kariyer Değişikliği Yapmak İsteyenler:** Farklı bir sektörden gelip teknoloji alanında kariyer hedefleyen ve temel düzey sertifikalarla başlangıç yapmak isteyen bireyler.
- **Öğrenciler:** Üniversitelerin ilgili bölümlerinde okuyan ve mezun olmadan önce portfolyolarını güçlendirmek isteyen öğrenciler.
- **IT Profesyonelleri:** Mevcut bilgi ve becerilerini yeni sertifikalarla belgelemek veya kariyerlerinde bir üst seviyeye çıkmak isteyen yazılım geliştiriciler, sistem yöneticileri ve bulut mühendisleri.
- **Hızlı Bilgi Arayanlar:** Belirli bir konu hakkında anlık olarak pratik yapmak isteyen ve üyelik süreçleriyle vakit kaybetmek istemeyen herkes.

## 3. Mevcut Özellikler (Current Features)

### 3.1. Temel Özellikler

#### 3.1.1. Sınav ve Sorular
- **Sınav Listeleme:** Platformda mevcut olan tüm sertifika sınavlarının listelendiği ana sayfa
- **Sınava Göre Filtreleme:** Kullanıcıların belirli bir sınava ait soruları kolayca bulabilmesi
- **İnteraktif Soru Çözme Arayüzü:**
  - Çoktan seçmeli soruların sunulması
  - Zamanlı veya zamansız pratik modları
  - Cevap gönderildikten sonra doğru cevabın ve detaylı açıklamanın gösterilmesi

#### 3.1.2. Oturum Bazlı İstatistikler
- **Anlık İstatistikler:** Kullanıcının aktif oturum içinde çözdüğü teste özel istatistikler
- **Çözülen Soru Sayısı ve Doğru/Yanlış Oranı:** Kullanıcının performansını gösteren metrikler
- **Detaylı Sınav Analizi:** Sekmeli arayüz ile sunulan kapsamlı analiz ve görselleştirmeler

#### 3.1.3. Öğrenme ve Kariyer Yolu
- **Öğrenme Yolu (Learning Path):** Kullanıcıların öğrenme sürecini adım adım gösteren interaktif harita
- **Kariyer Yolu (Career Path):** Teknoloji alanında kariyer ilerlemesini gösteren görsel harita
- **Sertifika Bağlantıları:** Kariyer yolundaki her sertifika için detaylı bilgiler

#### 3.1.4. Kullanıcı Deneyimi Özellikleri
- **Çoklu Dil Desteği:** İngilizce ve Türkçe dil seçenekleri ve kolay dil değiştirme arayüzü
- **Tema Seçenekleri:** Açık/koyu tema tercihi
- **Sınav Modu Seçenekleri:** Pratik modu ve gerçek sınav modu
- **Analitikler (Analytics):** Kullanıcının performansını detaylı analiz eden grafikler ve öneriler

### 3.2. İçerik Yönetimi (Admin Paneli)
- **Sınav Yönetimi:** Sınav (kategori) ekleme, düzenleme ve silme işlemleri
- **Soru Yönetimi:** Soru, cevap seçenekleri ve açıklamaları ekleme, düzenleme ve silme
- **Toplu İçe Aktarma:** Markdown formatında hazırlanmış soruları otomatik olarak sisteme yükleme
- **Yönetici Kimlik Doğrulama:** Güvenli admin erişimi için JWT tabanlı kimlik doğrulama

## 4. Teknik Altyapı (Technical Infrastructure)

### 4.1. Teknoloji Yığını
- **Frontend:** TypeScript, React, TailwindCSS
- **Backend:** TypeScript, Nest.js
- **Veritabanı:** PostgreSQL
- **ORM:** Prisma
- **API Mimarisi:** RESTful API
- **State Management:** Redux Toolkit

### 4.2. Dağıtım ve DevOps
- **Konteynerleştirme:** Docker ve Docker Compose
- **CI/CD:** Jenkins pipeline ile otomatik dağıtım
- **Hosting:** Google Cloud Platform (Compute Engine)
- **Web Sunucusu:** Nginx (reverse proxy)
- **SSL:** Let's Encrypt ile HTTPS desteği

### 4.3. Yazılım Mimarisi
- **Backend Mimarisi:** Modüler monolit yapıda, Clean Architecture prensiplerine uygun
- **Frontend Mimarisi:** Bileşen tabanlı (Component-Based), SPA
- **UI Kütüphaneleri:** Material-UI (MUI) ve TailwindCSS

## 5. Gelir Modeli (Revenue Model)
- **Reklam Alanları:** Kullanıcı deneyimini aksatmayacak şekilde yerleştirilmiş reklam bölümleri
- **Reklam Entegrasyonu:** Detaylı entegrasyon rehberi ile Google AdSense ve diğer reklam ağları desteği

## 6. Yasal Gereksinimler (Legal Requirements)
- **Gizlilik Politikası:** Kullanıcı verilerinin nasıl toplandığı ve işlendiği hakkında bilgi
- **Çerez Politikası:** Sitede kullanılan çerezler hakkında bilgi
- **Kullanım Koşulları:** Platformun kullanım şartları ve sınırlamalar
- **KVKK ve GDPR Uyumluluğu:** Veri koruma düzenlemelerine uygun önlemler

## 7. Gelecek Geliştirmeler (Future Enhancements)

### 7.1. Kısa Vadeli Planlar
- **Kullanıcı Geri Bildirimi:** Sorular için hata bildirimi mekanizması
- **Erişilebilirlik İyileştirmeleri:** Ekran okuyucu uyumluluğu ve klavye navigasyonu
- **Performans Optimizasyonları:** Sayfa yükleme sürelerinin iyileştirilmesi

### 7.2. Orta Vadeli Planlar
- **Soru İşaretleme ve Not Alma:** Kullanıcıların soruları işaretleyebilmesi ve notlar alabilmesi
- **Sosyal Medya Paylaşımı:** Kullanıcıların sınav sonuçlarını sosyal medyada paylaşabilmesi
- **İçerik Zenginleştirme:** Daha fazla sınav içeriğinin platforma eklenmesi

### 7.3. Uzun Vadeli Planlar
- **Kullanıcı Hesapları (Opsiyonel):** İsteğe bağlı hesap oluşturma ve ilerleme takibi
- **Oyunlaştırma (Gamification):** Rozetler, puanlar ve liderlik tablosu
- **Yapay Zeka Destekli Öneriler:** Kullanıcının zayıf olduğu konuları tespit edip öneriler sunan sistem

## 8. Kapsam Dışı (Out of Scope)
- **Zorunlu Kullanıcı Hesapları:** Platformu kullanmak için kayıt zorunluluğu
- **Video Ders İçerikleri:** Platform sadece interaktif soru bankası olarak hizmet verecektir
- **Canlı Eğitmen Oturumları:** Webinarlar veya canlı dersler
- **Kullanıcılar Arası Etkileşim:** Forum veya özel mesajlaşma özellikleri
- **Native Mobil Uygulama:** Sadece web platformu (mobil uyumlu) sunulacaktır

## 9. Başarı Ölçütleri (Success Metrics)
- **Kullanıcı Etkileşimi:** Aylık benzersiz ziyaretçi sayısı ve ortalama oturum süresi
- **Büyüme:** Aylık ziyaretçi sayısındaki artış oranı
- **Gelir:** Reklamlardan elde edilen aylık gelir
- **Teknik Performans:** Sayfa yükleme süreleri ve hizmet kesintisi oranı

## 10. Proje Yönetimi (Project Management)
- **Geliştirme Metodolojisi:** Agile/Scrum
- **Versiyon Kontrolü:** Git ve GitHub
- **Proje Dokümantasyonu:** Markdown formatında kapsamlı teknik ve kullanıcı belgeleri
- **Dağıtım Süreci:** Jenkins ile otomatik CI/CD pipeline
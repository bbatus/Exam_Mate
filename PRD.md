# Exam_Mate - Ürün Gereksinimleri Dokümanı (PRD)

**Versiyon:** 1.5
**Tarih:** 26 Haziran 2024
**Yazar:** Proje Ekibi

---

## 1. Amaç (Purpose)

Bu projenin temel amacı, teknoloji alanındaki profesyonel sertifika sınavlarına (örneğin: Google Cloud Digital Leader, AWS Certified Cloud Practitioner, Microsoft Azure Fundamentals vb.) hazırlanan bireyler için modern, interaktif ve **kayıt gerektirmeyen** bir web platformu geliştirmektir. Platform, kullanıcıların güncel çalışma sorularını üyelik oluşturmadan hızlıca çözerek sınavlara etkin bir şekilde hazırlanmalarını, bilgi seviyelerini ölçmelerini ve başarı oranlarını artırmalarını hedeflemektedir.

## 2. Hedef Kitle (Target Audience)

- **Kariyer Değişikliği Yapmak İsteyenler:** Farklı bir sektörden gelip teknoloji alanında kariyer hedefleyen ve temel düzey sertifikalarla başlangıç yapmak isteyen bireyler.
- **Öğrenciler:** Üniversitelerin ilgili bölümlerinde okuyan ve mezun olmadan önce portfolyolarını güçlendirmek isteyen öğrenciler.
- **IT Profesyonelleri:** Mevcut bilgi ve becerilerini yeni sertifikalarla belgelemek veya kariyerlerinde bir üst seviyeye çıkmak isteyen yazılım geliştiriciler, sistem yöneticileri ve bulut mühendisleri.
- **Hızlı Bilgi Arayanlar:** Belirli bir konu hakkında anlık olarak pratik yapmak isteyen ve üyelik süreçleriyle vakit kaybetmek istemeyen herkes.

## 3. Proje Durumu (Project Status)

### 3.1. Tamamlanan Özellikler (Completed Features)

#### 3.1.1. Temel Özellikler
- **Sınav ve Sorular:**
  - Sınav listeleme: Platformda mevcut olan tüm sertifika sınavlarının listelendiği ana sayfa
  - Sınava göre filtreleme: Kullanıcıların belirli bir sınava ait soruları kolayca bulabilmesi
  - İnteraktif soru çözme arayüzü:
    - Çoktan seçmeli soruların sunulması
    - Zamanlı veya zamansız pratik modları
    - Cevap gönderildikten sonra doğru cevabın ve detaylı açıklamanın gösterilmesi

- **Oturum Bazlı İstatistikler:**
  - Kullanıcının aktif oturum (session) içinde çözdüğü teste özel anlık istatistikler
  - Çözülen soru sayısı
  - Doğru/yanlış cevap oranı
  - Detaylı sınav analizi ve görselleştirmeler

- **İçerik Yönetimi (Admin Paneli):**
  - Sınav (kategori) ekleme, düzenleme ve silme
  - Soru, cevap seçenekleri ve açıklamaları ekleme, düzenleme ve silme
  - Yönetici kimlik doğrulama sisteminin kurulması

- **Gelir Modeli:**
  - Reklam alanları: Sitenin belirli bölgelerinde kullanıcı deneyimini aksatmayacak şekilde reklamlar

#### 3.1.2. Kullanıcı Rolleri
- **Ziyaretçi (Visitor):** Platformu kullanan herkestir. Herhangi bir kayıt işlemi yapmadan sınav seçebilir, soruları çözebilir ve oturum bazlı istatistiklerini görebilir.
- **Yönetici (Admin):** İçerik yönetiminden sorumlu olan yetkili roldür. Admin paneli üzerinden sınav ve soru yönetimi gibi işlemleri gerçekleştirebilir.

#### 3.1.3. Teknik Altyapı
- **Teknoloji Yığını:**
  - Backend: TypeScript, Nest.js
  - Frontend: TypeScript, React
  - Veritabanı: PostgreSQL (Sorular ve sınavlar için)
  - ORM: Prisma
  - API Mimarisi: RESTful API

- **Yazılım Mimarisi:**
  - Backend Mimarisi: Modüler monolit yapıda, Clean Architecture prensiplerine uygun
  - Frontend Mimarisi: Bileşen tabanlı (Component-Based), SPA
  - State Management: Redux Toolkit veya React Context API
  - UI Kütüphanesi: Material-UI (MUI)

- **Altyapı ve Dağıtım:**
  - Konteynerleştirme: Docker ve Docker Compose ile yerel geliştirme ortamı

#### 3.1.4. Geliştirme Aşamaları
- **Planlama ve Kurulum:**
  - Proje iskeletlerinin (backend, frontend) oluşturulması
  - Docker altyapısının docker-compose.yml ile kurulması
  - Detaylı UI/UX tasarımlarının (wireframe, mockup) yapılması

- **Temel Geliştirme:**
  - Veritabanı şemasının (Prisma) tasarlanması ve oluşturulması
  - Veritabanına başlangıç verilerinin (seed) eklenmesi
  - Temel API endpoint'lerinin oluşturulması (GET /exams, GET /exams/:id)
  - Admin panelinin temel CRUD işlevlerinin geliştirilmesi

- **Ana Özellik Geliştirme:**
  - Ana sayfanın sınavları listeleyecek şekilde geliştirilmesi
  - İnteraktif soru çözme arayüzünün geliştirilmesi
  - Cevapları kontrol etme ve açıklama gösterme mantığının entegrasyonu
  - Oturum bazlı istatistiklerin geliştirilmesi
  - 90 dakikalık geri sayım sayacının eklenmesi
  - "Sınavı Bitir" düğmesi ve cevaplanmamış sorular için uyarıların eklenmesi
  - Detaylı sınav analizi için sekmeli arayüzün oluşturulması
  - Doğru, yanlış ve cevaplanmamış sorular için görselleştirmelerin eklenmesi
  - Sınav sonuçlarının backend'de saklanması için veritabanı modellerinin oluşturulması

#### 3.1.5. Kullanıcı Deneyimi İyileştirmeleri
- **Çoklu Dil Desteği:**
  - İngilizce ve Türkçe dil desteği
  - Dil değiştirme arayüzü
  - Tüm içeriğin çevirilmesi

- **Tema Seçenekleri:**
  - Açık/koyu tema seçenekleri
  - Tema değiştirme arayüzü

- **Sınav Modu Seçenekleri:**
  - Pratik Modu: Zamansız, açıklamaları anında gösteren mod
  - Gerçek Sınav Modu: Tüm soruları bitirdikten sonra sonuçları gösteren mod
  - Konu Bazlı Çalışma: Belirli konulara odaklanarak çalışma imkanı

- **Gelişmiş İstatistikler ve Analiz:**
  - Kategori bazlı başarı analizleri
  - Zaman bazlı performans grafikleri
  - Yanlış cevaplanan sorulardaki eğilimleri gösteren analiz

- **Kullanıcı Geri Bildirimi:**
  - Sorular için hata bildirimi mekanizması
  - İyileştirme önerileri gönderme formu
  - Kullanıcı memnuniyet anketleri

- **Erişilebilirlik İyileştirmeleri:**
  - Ekran okuyucu uyumluluğu
  - Klavye navigasyonu
  - Renk kontrastı ve okunabilirlik ayarları
  - Yazı boyutu ve satır aralığı ayarları
  - Odak göstergeleri

- **Sınav Simülasyonu İyileştirmeleri:**
  - Süre uyarıları ve bildirimler
  - Gerçek sınav ortamına daha yakın deneyim için ekstra özellikler

- **Kullanıcı Arayüzü İyileştirmeleri:**
  - Animasyonlar ve geçişler
  - Mikro-etkileşimler
  - Daha modern ve çekici tasarım elementleri (Neumorfik UI, gradyan ve cam efektleri)
  - Responsive ve adaptif tasarım

- **Soru İşaretleme ve Not Alma:**
  - Kullanıcıların soruları işaretleyebilmesi ve notlar alabilmesi (oturum bazlı)

#### 3.1.6. Yasal Gereksinimler ve Uyumluluk
- **Gizlilik Politikası:** Kullanıcı verilerinin nasıl toplandığı, işlendiği ve korunduğu hakkında bilgi
- **Kullanım Koşulları:** Platformun kullanım şartları, kullanıcı sorumlulukları ve sınırlamalar
- **KVKK ve GDPR Uyumluluğu:** Veri koruma düzenlemelerine uygun önlemler
- **Çerez Politikası:** Sitede kullanılan çerezler hakkında bilgi
- **Telif Hakkı Bildirimi:** Telif hakkı ve içerik lisans bilgileri

### 3.2. Tamamlanmayan Özellikler (Incomplete Features)

#### 3.2.1. Teknik Altyapı
- **CI/CD:** GitHub Actions ile CI/CD kurulumu
- **Hosting:** AWS (EC2, RDS), Google Cloud (Compute Engine, Cloud SQL) veya benzeri bir bulut sağlayıcısı üzerinde barındırma

#### 3.2.2. Test ve Lansman
- **Kapsamlı Testler:** Birim ve entegrasyon testlerinin yazılması
- **Performans Optimizasyonları:** 
  - Sayfa yükleme sürelerinin optimizasyonu
  - Mobil uyumluluk iyileştirmeleri
  - Offline çalışma desteği (Progressive Web App)
- **Tarayıcı Uyumluluğu:** Farklı tarayıcılarda test edilmesi
- **İçerik Zenginleştirme:** Daha fazla sınav içeriğinin platforma eklenmesi

#### 3.2.3. İlave Özellikler
- **Sosyal Medya Paylaşımı:** Kullanıcıların sınav sonuçlarını sosyal medyada paylaşabilmesi
- **Analitik Entegrasyonu:** Google Analytics veya benzeri bir analitik aracı entegrasyonu

## 4. Kapsam Dışı (Out of Scope)

- **Kullanıcı Hesapları:** Kalıcı kullanıcı profilleri, kayıt ve giriş işlevleri
- **Kalıcı İlerleme Takibi:** Kullanıcıların geçmiş test sonuçlarını ve genel ilerlemelerini takip etme
- Video ders içerikleri
- Canlı eğitmen oturumları veya webinarlar
- Kullanıcılar arası etkileşim (forum, özel mesajlaşma vb.)
- Native mobil uygulama (Ancak web platformu mobil uyumlu olacaktır)
- Topluluk tarafından soru ekleme özelliği

## 5. Başarı Ölçütleri (Success Metrics)

- **Kullanıcı Etkileşimi:**
  - Aylık Benzersiz Ziyaretçi (Monthly Unique Visitors) sayısı
  - Ziyaretçi başına düşen ortalama oturum süresi
  - Başlatılan test sayısı
- **Büyüme:**
  - Aylık ziyaretçi sayısındaki artış oranı
- **Gelir:**
  - Reklamlardan elde edilen aylık gelir
- **Kullanıcı Memnuniyeti:**
  - Geri bildirim formları ve anketler aracılığıyla toplanan veriler

## 6. Rakip Analizi / Alternatifler (Competitive Analysis)

- **Udemy, A Cloud Guru, Whizlabs:** Genellikle video derslerle birlikte pratik testleri de sunan kapsamlı platformlardır. Bizim odak noktamız ise **kayıt zorunluluğu olmadan**, sadece interaktif soru bankası sunarak daha niş ve hızlı bir ihtiyacı karşılamaktır.
- **Ücretsiz Bloglar ve GitHub Repoları:** Sorular genellikle dağınık, güncel olmayan ve interaktif bir deneyim sunmayan yapıdadır. Platformumuz, merkezi, güncel ve kullanıcı dostu bir deneyim sunarak bu alternatiflerden ayrışacaktır.

## 7. Gelecekteki Geliştirme Fırsatları (Future Enhancements)

- **Kullanıcı Hesapları ve Kişiselleştirme:** Kullanıcıların isteğe bağlı olarak hesap oluşturarak ilerlemelerini kalıcı olarak takip edebilmeleri
- **Oyunlaştırma (Gamification):** Kullanıcı hesapları eklendikten sonra rozetler, puanlar ve liderlik tablosu gibi özellikler
- **Aralıklı Tekrar (Spaced Repetition):** Kullanıcının unuttuğu soruları akıllı bir algoritma ile belirli aralıklarla tekrar önüne getiren sistem
- **Premium Üyelik Modeli:** Reklamsız bir deneyim, daha fazla soru bankasına erişim gibi avantajlar sunan ücretli üyelik
- **Yapay Zeka Destekli Soru Önerileri:** Kullanıcının zayıf olduğu konuları tespit edip o konulara yönelik sorular öneren sistem
- **Native Mobil Uygulama:** iOS ve Android için özel mobil uygulamalar
- **Soru Havuzu Genişletme:** Daha fazla sertifika sınavı ve soru eklenmesi
- **Topluluk Katkıları:** Doğrulanmış kullanıcıların soru havuzuna katkıda bulunabilmesi

## 8. Yasal Gereksinimler ve Uyumluluk

### 8.1. Telif Hakkı ve Fikri Mülkiyet
- **Telif Hakkı Bildirimi:** Sitenin altbilgisinde "© 2024 Exam Mate. Tüm hakları saklıdır." şeklinde bir telif hakkı bildirimi
- **İçerik Lisansı:** Platform üzerindeki içeriklerin lisans bilgileri
- **Üçüncü Taraf İçerikler:** Platformda kullanılan üçüncü taraf içeriklerin lisans bilgileri ve atıfları

### 8.2. Kullanıcı Gizliliği ve Veri Koruma
- **Gizlilik Politikası:** Kullanıcı verilerinin nasıl toplandığı, işlendiği ve korunduğu hakkında bilgi
- **Çerez Politikası:** Sitede kullanılan çerezler hakkında bilgi ve kullanıcı onayı
- **GDPR Uyumluluğu:** Avrupa Birliği Genel Veri Koruma Yönetmeliği gereksinimleri
- **KVKK Uyumluluğu:** Türkiye'deki Kişisel Verilerin Korunması Kanunu gereksinimleri

### 8.3. Kullanım Koşulları
- **Kullanım Koşulları:** Platformun kullanım şartları, kullanıcı sorumlulukları ve sınırlamalar
- **Sorumluluk Reddi:** Platform içeriğinin doğruluğu ve güncelliği konusunda sorumluluk reddi
- **İçerik Politikası:** Platformda kabul edilebilir içerik türleri ve kısıtlamalar

### 8.4. Erişilebilirlik
- **WCAG Uyumluluğu:** Web İçeriği Erişilebilirlik Yönergeleri standartlarına uygun özellikler
- **Erişilebilirlik Bildirimi:** Platformun erişilebilirlik özellikleri ve kısıtlamaları hakkında bilgi

### 8.5. İletişim ve Yasal Bilgiler
- **İletişim Bilgileri:** Kullanıcıların site yöneticileriyle iletişim kurabilmesi için iletişim bilgileri
- **Şirket Bilgileri:** Platformu işleten tüzel kişiliğin yasal bilgileri (şirket adı, adresi, vergi numarası vb.)
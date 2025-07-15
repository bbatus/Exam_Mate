# Exam_Mate - UI/UX Tasarım Dokümanı

**Versiyon:** 1.0
**Tarih:** 24 Haziran 2024
**Hazırlayan:** Tasarım Ekibi

---

## 1. Giriş

Bu doküman, Exam_Mate platformunun kullanıcı arayüzü (UI) ve kullanıcı deneyimi (UX) tasarım prensiplerini, wireframe'lerini ve mockup'larını içermektedir. Tasarımlar, modern web tasarım trendlerini takip ederek, kullanıcı dostu, erişilebilir ve estetik bir deneyim sunmayı hedeflemektedir.

## 2. Tasarım Dili

### 2.1. Renk Paleti

- **Ana Renk:** `#3A0CA3` (Koyu Mavi) - Başlıklar, ana butonlar
- **İkincil Renk:** `#4361EE` (Mavi) - Vurgular, seçili öğeler
- **Vurgu Rengi:** `#4CC9F0` (Açık Mavi) - Hover durumları, bağlantılar
- **Başarı:** `#4CAF50` (Yeşil) - Doğru cevaplar, başarı mesajları
- **Uyarı:** `#FF9800` (Turuncu) - Uyarı mesajları
- **Hata:** `#F72585` (Pembe) - Yanlış cevaplar, hata mesajları
- **Arka Plan:** `#121212` (Koyu Gri) - Sayfa arka planı
- **Yüzey:** `#1E1E1E` (Gri) - Kartlar, paneller
- **Metin:** `#FFFFFF` (Beyaz) - Ana metin rengi

### 2.2. Tipografi

- **Başlık Fontu:** Montserrat (Sans-serif)
  - H1: 32px, Bold
  - H2: 24px, Bold
  - H3: 20px, Semi-bold
  - H4: 18px, Semi-bold

- **Gövde Metni:** Inter (Sans-serif)
  - Normal: 16px, Regular
  - Küçük: 14px, Regular
  - Mikro: 12px, Regular

- **Kod Bloğu:** JetBrains Mono (Monospace)
  - 14px, Regular

### 2.3. Bileşen Tasarımı

- **Köşe Yuvarlaklığı:** 8px (kartlar, butonlar), 4px (giriş alanları)
- **Gölgeler:** Hafif gölgeler (0px 4px 12px rgba(0, 0, 0, 0.15))
- **Gradyanlar:** Ana renk → İkincil renk (butonlar, vurgular)
- **Animasyonlar:** Yumuşak geçişler (300ms), hover efektleri
- **Cam Efekti (Glassmorphism):** Yarı saydam paneller, bulanık arka planlar

### 2.4. Responsive Tasarım

- **Mobil Öncelikli Yaklaşım**
- **Grid Sistemi:** 12 kolonlu esnek grid
- **Breakpoint'ler:**
  - Mobil: < 576px
  - Tablet: 576px - 768px
  - Dizüstü: 768px - 992px
  - Masaüstü: 992px - 1200px
  - Geniş Ekran: > 1200px

## 3. Sayfa Tasarımları

### 3.1. Ana Sayfa

Ana sayfa, kullanıcıların platform hakkında genel bilgi edinebileceği ve mevcut sınavlara hızlıca erişebileceği bir giriş noktasıdır.

#### Wireframe Bileşenleri:

1. **Header:**
   - Logo (sol)
   - Navigasyon menüsü (orta)
   - Arama butonu (sağ)

2. **Hero Bölümü:**
   - Çarpıcı başlık: "Sertifika Sınavlarına Hazırlanın"
   - Alt başlık: "Üyelik gerektirmeden, hemen pratik yapın"
   - CTA Butonu: "Sınavları Keşfet"
   - Arka planda gradyan ve animasyonlu şekiller

3. **Arama ve Filtreleme:**
   - Arama kutusu
   - Kategori filtreleri (Cloud, DevOps, Security, vb.)
   - Sıralama seçenekleri (Popülerlik, Yeni Eklenen)

4. **Sınav Kartları Bölümü:**
   - Grid düzeninde sınav kartları
   - Her kartta:
     - Sınav adı
     - Soru sayısı
     - Tahmini süre
     - Zorluk seviyesi (yıldız sistemi)
     - "Sınava Başla" butonu

5. **Özellikler Bölümü:**
   - Üç ana özellik kartı:
     - "Üyelik Gerektirmez" (İkon + Açıklama)
     - "Detaylı Analiz" (İkon + Açıklama)
     - "Güncel Sorular" (İkon + Açıklama)

6. **Footer:**
   - Telif hakkı bilgisi
   - Hızlı bağlantılar
   - Sosyal medya ikonları

### 3.2. Sınav Sayfası

Kullanıcının sınav sorularını çözdüğü ana sayfadır.

#### Wireframe Bileşenleri:

1. **Header:**
   - Logo (sol)
   - Sınav adı (orta)
   - Geri sayım sayacı (sağ): 90:00 formatında

2. **İlerleme Göstergesi:**
   - Mevcut soru / Toplam soru (örn. 1/30)
   - İlerleme çubuğu

3. **Soru Alanı:**
   - Soru numarası
   - Soru metni
   - Varsa ilgili görseller veya kod blokları

4. **Cevap Seçenekleri:**
   - Seçenekler listesi (A, B, C, D formatında)
   - Seçilen seçeneğin vurgulanması
   - Seçim yapıldıktan sonra doğru/yanlış göstergesi

5. **Navigasyon:**
   - "Önceki Soru" butonu
   - "Sonraki Soru" butonu
   - "Soruları Listele" butonu (soru numaralarına hızlı erişim)

6. **Sınavı Bitir:**
   - "Sınavı Bitir" butonu
   - Cevaplanmamış sorular için uyarı modalı

### 3.3. Sınav Sonuçları Sayfası

Kullanıcının sınav performansını detaylı olarak görebileceği sayfa.

#### Wireframe Bileşenleri:

1. **Header:**
   - Logo (sol)
   - "Ana Sayfa" butonu (sağ)

2. **Sonuç Özeti:**
   - Toplam puan (örn. 85/100)
   - Doğru/Yanlış/Boş soru sayıları
   - Geçme durumu (Başarılı/Başarısız)

3. **Görsel Analiz:**
   - Doğru/Yanlış/Boş dağılımını gösteren pasta grafiği
   - Kategori bazlı performans çubuk grafiği

4. **Sekmeler:**
   - "Özet" sekmesi
   - "Detaylı Analiz" sekmesi

5. **Soru Listesi:**
   - Tüm soruların listesi
   - Her soru için doğru/yanlış göstergesi
   - Seçilen cevap ve doğru cevap

6. **Detay Görünümü:**
   - Seçilen sorunun tam metni
   - Kullanıcının cevabı
   - Doğru cevap
   - Detaylı açıklama

7. **İşlem Butonları:**
   - "Yeni Sınav Başlat" butonu
   - "Sonuçları Paylaş" butonu

### 3.4. Admin Paneli

Yöneticilerin sınav ve soru içeriklerini yönetebileceği panel.

#### Wireframe Bileşenleri:

1. **Header:**
   - Logo (sol)
   - "Admin Paneli" başlığı (orta)
   - Kullanıcı menüsü (sağ)

2. **Kenar Çubuğu:**
   - Dashboard
   - Sınav Yönetimi
   - Soru Yönetimi
   - Ayarlar
   - Çıkış

3. **İçerik Alanı:**
   - Başlık
   - Filtreler/Arama
   - Veri tablosu veya form

4. **Sınavlar Tablosu:**
   - ID
   - Sınav Adı
   - Soru Sayısı
   - Oluşturma Tarihi
   - İşlemler (Düzenle, Sil, Görüntüle)

5. **İşlem Butonları:**
   - "Yeni Sınav Ekle" butonu
   - "Toplu İşlem" butonu

6. **Sayfalama:**
   - Sayfa numaraları
   - Önceki/Sonraki butonları

## 4. Kullanıcı Akışları

### 4.1. Sınav Çözme Akışı

1. Ana Sayfa → Sınav Kartı → "Sınava Başla" butonuna tıklama
2. Sınav Sayfası → Soruları yanıtlama → Navigasyon ile ilerleme
3. "Sınavı Bitir" butonuna tıklama → Onay modalı → Onaylama
4. Sınav Sonuçları Sayfası → Performans değerlendirme

### 4.2. Admin İçerik Yönetimi Akışı

1. Admin Girişi → Admin Paneli Ana Sayfa
2. Kenar Çubuğu → "Sınav Yönetimi" → Sınavlar Listesi
3. "Yeni Sınav Ekle" butonu → Sınav Oluşturma Formu → Kaydet
4. Sınav Detayı → "Soru Ekle" → Soru Oluşturma Formu → Kaydet

## 5. Erişilebilirlik Prensipleri

- **Renk Kontrastı:** WCAG AA standartlarına uygun kontrast oranları
- **Klavye Navigasyonu:** Tüm işlevlere klavye ile erişilebilirlik
- **Ekran Okuyucu Uyumluluğu:** Semantik HTML ve ARIA etiketleri
- **Metin Boyutu:** Minimum 14px gövde metni, ölçeklenebilir tipografi
- **Odaklanma Göstergeleri:** Belirgin odaklanma stilleri

## 6. Mobil Uyumluluk

- **Dokunmatik Hedefler:** Minimum 44x44px dokunmatik hedef alanları
- **Mobil Navigasyon:** Hamburger menü, alt navigasyon çubuğu
- **İçerik Önceliklendirme:** Mobil ekranlarda kritik içeriğin önceliklendirilmesi
- **Yatay Kaydırma:** Mobilde yatay kaydırma yerine dikey düzen
- **Performans:** Hızlı yükleme için optimize edilmiş görseller ve bileşenler

## 7. Animasyon ve Mikroetkileşimler

- **Sayfa Geçişleri:** Yumuşak fade ve slide animasyonları
- **Buton Etkileşimleri:** Hover, active ve focus durumları için mikroanimasyonlar
- **İlerleme Göstergeleri:** Animasyonlu ilerleme çubukları ve spinnerlar
- **Bildirimler:** Yukarıdan aşağı kayan toast bildirimleri
- **Form Validasyonu:** Anlık geri bildirim animasyonları

## 8. Çoklu Dil Desteği

- **Varsayılan Dil:** İngilizce (tüm içerik varsayılan olarak İngilizce)
- **Desteklenen Diller:** İngilizce, Türkçe (gelecekte genişletilebilir)
- **Dil Değiştirme Arayüzü:** Header'da dil seçim menüsü/butonları
- **Çeviri Stratejisi:** JSON dosyalarında anahtar-değer çiftleri
- **Dinamik İçerik:** Tüm metin içerikleri (sorular, açıklamalar, arayüz metinleri) dil değişiminde dinamik olarak güncellenir

### 8.1. Dil Değiştirme Tasarımı

- Header'da bayrak ikonları veya dil kısaltmaları (EN/TR)
- Seçili dil vurgulanmış şekilde gösterilir
- Dil değişimi anında uygulanır, sayfa yenilenmesi gerekmez
- Kullanıcı tercihi tarayıcı local storage'da saklanır

## 9. İleri Aşama Tasarım Geliştirmeleri

- **Tema Değiştirme:** Açık/koyu tema seçeneği
- **Kişiselleştirilmiş Dashboard:** Kullanıcı hesapları eklendiğinde
- **Gelişmiş Analitikler:** Performans trendleri ve öneriler
- **Sosyal Paylaşım:** Sonuçları sosyal medyada paylaşma özellikleri
- **Offline Modu:** PWA ile çevrimdışı erişim imkanı

---

Bu tasarım dokümanı, Exam_Mate platformunun UI/UX geliştirme sürecinde referans olarak kullanılacaktır. Tasarım süreci iteratif olup, kullanıcı geri bildirimleri ve test sonuçlarına göre güncellenecektir. 
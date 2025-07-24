# Exam_Mate Backend Mimarisi

## Genel Bakış

Exam_Mate backend'i, verimli ve ölçeklenebilir sunucu taraflı uygulamalar oluşturmak için tasarlanmış ilerici bir Node.js framework'ü olan NestJS ile geliştirilmiştir. Tip güvenliği için TypeScript kullanır ve modüler bir mimari desenini takip eder. Uygulama, Prisma ORM kullanarak PostgreSQL veritabanına bağlanır.

## Dizin Yapısı

```
backend/
├── prisma/                 # Prisma ORM yapılandırması ve şeması
│   ├── migrations/         # Veritabanı migrasyonları
│   ├── schema.prisma       # Veritabanı şema tanımı
│   └── seed*.ts            # Veritabanını doldurmak için seed scriptleri
├── src/                    # Kaynak kodu
│   ├── auth/               # Authentication modülü
│   │   ├── dto/            # Auth için Data Transfer Objects
│   │   ├── guards/         # JWT authentication guard'ları
│   │   ├── auth.controller.ts  # Auth endpoint'leri
│   │   ├── auth.module.ts      # Auth modül tanımı
│   │   ├── auth.service.ts     # Auth iş mantığı
│   │   └── jwt.strategy.ts     # Passport için JWT stratejisi
│   ├── exams/              # Sınavlar modülü (temel işlevsellik)
│   │   ├── dto/            # Sınavlar için Data Transfer Objects
│   │   ├── exams.controller.ts # Sınav endpoint'leri
│   │   ├── exams.module.ts     # Sınavlar modül tanımı
│   │   └── exams.service.ts    # Sınavlar iş mantığı
│   ├── prisma/             # Veritabanı bağlantısı için Prisma modülü
│   │   ├── prisma.module.ts    # Prisma modül tanımı
│   │   └── prisma.service.ts   # Veritabanı erişimi için Prisma servisi
│   ├── app.controller.ts   # Ana uygulama controller'ı
│   ├── app.module.ts       # Ana uygulama modülü
│   ├── app.service.ts      # Ana uygulama servisi
│   └── main.ts             # Uygulama giriş noktası
```

## Temel Bileşenler

### 1. Ana Uygulama

- **main.ts**: Uygulamanın giriş noktası. NestJS uygulamasını kurar, CORS'u etkinleştirir ve sunucuyu 5000 portunda başlatır.
- **app.module.ts**: Tüm diğer modülleri (PrismaModule, ExamsModule, AuthModule) içe aktaran kök modül.
- **app.controller.ts**: Kök endpoint için temel controller.
- **app.service.ts**: Kök endpoint için temel servis.

### 2. Veritabanı Katmanı (Prisma)

- **prisma/schema.prisma**: Aşağıdaki modellerle veritabanı şemasını tanımlar:
  - `Admin`: Sistem için admin kullanıcıları
  - `Exam`: Sertifikasyon sınavları
  - `Question`: Sınav soruları, seçenekleri ve cevapları
  - `ExamResult`: Sınav girişimlerinin sonuçları
  - `QuestionAnswer`: Bir sınav girişimindeki her bir soruya verilen cevaplar

- **prisma/prisma.service.ts**: Bağlantı yaşam döngüsünü yöneterek diğer servislere veritabanı erişimi sağlar.
- **prisma/prisma.module.ts**: PrismaService'i tüm uygulamada kullanılabilir hale getirir.

- **prisma/seed*.ts**: Veritabanını başlangıç verileriyle doldurmak için scriptler:
  - `seed.ts`: Genel seed scripti
  - `seed-gcp-digital-leader.ts`: Google Cloud Digital Leader sınav soruları
  - `seed-gcp-ace.ts`: Google Cloud Associate Cloud Engineer sınav soruları

### 3. Authentication Modülü

- **auth/auth.service.ts**: Admin kimlik doğrulaması, şifre doğrulama, JWT token oluşturma ve admin oluşturma işlemlerini yönetir.
- **auth/auth.controller.ts**: Login ve admin oluşturma için endpoint'leri sunar.
- **auth/jwt.strategy.ts**: Passport için JWT authentication stratejisini uygular.
- **auth/guards/jwt-auth.guard.ts**: Sadece admin'e özel route'ları korumak için guard.
- **auth/dto/**:
  - `login.dto.ts`: Login istekleri için veri yapısı
  - `create-admin.dto.ts`: Admin oluşturma için veri yapısı

### 4. Sınavlar Modülü (Temel İş Mantığı)

- **exams/exams.service.ts**: Şunlar için temel iş mantığı:
  - Sınavları yönetme (CRUD işlemleri)
  - Soruları yönetme (CRUD işlemleri)
  - Sınav sonuçlarını işleme
  - İstatistikler ve analizler oluşturma
  - Sorular için toplu işlemler

- **exams/exams.controller.ts**: Şunlar için endpoint'leri sunar:
  - Genel route'lar: Sınavları alma, soruları alma, sonuçları gönderme
  - Korumalı route'lar: Sınav ve soru oluşturma/güncelleme/silme

- **exams/dto/**:
  - `create-exam.dto.ts`: Sınav oluşturma için veri yapısı
  - `update-exam.dto.ts`: Sınav güncellemeleri için veri yapısı
  - `create-question.dto.ts`: Soru oluşturma için veri yapısı
  - `update-question.dto.ts`: Soru güncellemeleri için veri yapısı
  - `create-exam-result.dto.ts`: Sınav sonuçlarını gönderme için veri yapısı

## API Endpoint'leri

### Genel Endpoint'ler

- `GET /exams`: Tüm mevcut sınavları al
- `GET /exams/:id`: ID'ye göre belirli bir sınavı al
- `GET /exams/:examId/questions`: Belirli bir sınav için tüm soruları al
- `POST /exams/:id/results`: Bir sınav girişimi için sonuçları gönder
- `GET /exams/:id/results`: Belirli bir sınav için tüm sonuçları al
- `GET /exams/results/:resultId`: ID'ye göre belirli bir sınav sonucunu al
- `GET /exams/:id/statistics`: Belirli bir sınav için istatistikleri al

### Korumalı Endpoint'ler (Sadece Admin)

- `POST /auth/login`: Admin girişi
- `POST /auth/register`: Yeni bir admin oluştur (sadece hiç admin yoksa)

- `POST /exams`: Yeni bir sınav oluştur
- `PUT /exams/:id`: Mevcut bir sınavı güncelle
- `DELETE /exams/:id`: Bir sınavı sil

- `POST /exams/:examId/questions`: Bir sınav için yeni bir soru oluştur
- `PUT /exams/questions/:id`: Mevcut bir soruyu güncelle
- `DELETE /exams/questions/:id`: Bir soruyu sil
- `POST /exams/:examId/questions/bulk`: Bir sınav için toplu soru oluştur

## Authentication Akışı

1. Admin kullanıcıları `/auth/login` endpoint'i üzerinden kimlik doğrulama yapar
2. Başarılı kimlik doğrulama sonrasında bir JWT token verilir
3. Bu token, tüm korumalı endpoint'ler için Authorization header'ında bulunmalıdır
4. JwtAuthGuard, korumalı route'lar için token'ı doğrular

## Veritabanı Modelleri

### Admin
- Admin kullanıcı kimlik bilgilerini saklar
- Alanlar: id, username, password (hash'lenmiş), createdAt, updatedAt

### Exam
- Bir sertifikasyon sınavını temsil eder
- Alanlar: id, title, createdAt, updatedAt
- İlişkiler: questions (one-to-many), results (one-to-many)

### Question
- Bir sınav sorusunu temsil eder
- Alanlar: id, section, question, options, correct, explanation, category, examId, createdAt, updatedAt
- İlişkiler: exam (many-to-one), answers (one-to-many)

### ExamResult
- Tamamlanmış bir sınav girişimini temsil eder
- Alanlar: id, examId, score, totalQuestions, examMode, timeSpent, createdAt, updatedAt
- İlişkiler: exam (many-to-one), questionAnswers (one-to-many)

### QuestionAnswer
- Bir sınav girişiminde belirli bir soruya verilen cevabı temsil eder
- Alanlar: id, examResultId, questionId, selectedAnswer, isCorrect, timeSpent, createdAt, updatedAt
- İlişkiler: examResult (many-to-one), question (many-to-one)

## Veri Akışı

1. **Sınav Oluşturma**:
   - Admin, admin arayüzü üzerinden bir sınav oluşturur
   - Admin sınava sorular ekler (tek tek veya toplu olarak)

2. **Sınav Alma**:
   - Kullanıcı frontend'den bir sınav seçer
   - Frontend seçilen sınav için soruları getirir
   - Kullanıcı soruları cevaplar ve sınavı gönderir
   - Backend cevapları işler, puanı hesaplar ve sonucu kaydeder

3. **Sonuç Analizi**:
   - Frontend sınav sonuçlarını ve istatistiklerini getirir
   - Backend performans hakkında detaylı analiz sağlar

## Geliştirme Kılavuzu

### Yeni Bir Özellik Ekleme

1. Özelliğin hangi modüle ait olduğunu belirle (exams, auth, vb.)
2. İlgili dto/ dizininde gerekli DTO'ları oluştur
3. İlgili serviste iş mantığını ekle
4. İlgili controller'da endpoint'leri sun
5. Gerekirse yeni bağımlılıkları içe aktarmak için modül dosyasını güncelle

### Veritabanı Değişiklikleri

1. schema.prisma dosyasını değiştir
2. Bir migrasyon oluşturmak için `npx prisma migrate dev --name <migration-name>` komutunu çalıştır
3. Yeni şemayı kullanmak için etkilenen servisleri güncelle

### Güvenlik Önlemleri

- Tüm admin route'ları JWT authentication ile korunur
- Şifreler bcrypt kullanılarak hash'lenir
- Hassas bilgiler için environment variable'lar kullanılır
- Frontend erişimi için CORS etkinleştirilir 
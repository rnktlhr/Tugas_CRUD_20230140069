# Sistem Manajemen KTP

Aplikasi web CRUD untuk pengelolaan data KTP berbasis **Spring Boot** dengan tampilan frontend modern menggunakan HTML, CSS, dan JavaScript.

---

## Teknologi yang Digunakan

- **Java 25**
- **Spring Boot 4.0.3**
- **Spring Data JPA**
- **Spring Validation**
- **MySQL**
- **Lombok**
- **MapStruct 1.5.5**
- **Frontend:** HTML5, CSS3, Vanilla JS (jQuery + SweetAlert2)

---

## Struktur Package

```
src/main/java/com/example/demo/
├── controller/
│   └── KtpController.java
├── dto/
│   ├── KtpRequestDto.java
│   └── KtpResponseDto.java
├── entity/
│   └── Ktp.java
├── mapper/
│   └── KtpMapper.java
├── repository/
│   └── KtpRepository.java
├── service/
│   ├── KtpService.java
│   └── impl/
│       └── KtpServiceImpl.java
├── util/
│   └── ApiResponse.java
└── DemoApplication.java

src/main/resources/
├── static/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── application.properties
```

---

## Struktur Database

**Tabel: `KTP`**

| Kolom          | Tipe         | Keterangan              |
|----------------|--------------|-------------------------|
| id             | INT (PK, AI) | Primary key             |
| nomor_ktp      | VARCHAR      | NIK unik, not null      |
| nama_lengkap   | VARCHAR      | Not null                |
| alamat         | VARCHAR      | Not null                |
| tanggal_lahir  | DATE         | Not null                |
| jenis_kelamin  | VARCHAR      | Not null                |

---

## REST API Endpoints

| Method   | Endpoint     | Deskripsi                        |
|----------|--------------|----------------------------------|
| `GET`    | `/ktp`       | Mengambil seluruh data KTP       |
| `GET`    | `/ktp/{id}`  | Mengambil data KTP berdasarkan id|
| `POST`   | `/ktp`       | Menambah data KTP baru           |
| `PUT`    | `/ktp/{id}`  | Memperbarui data KTP             |
| `DELETE` | `/ktp/{id}`  | Menghapus data KTP               |

### Contoh Request Body (POST / PUT)

```json
{
  "nomorKtp": "3471010101900001",
  "namaLengkap": "Rinakit Luhur Pambudi",
  "alamat": "Jl. Malioboro No.12, Gedongtengen, Yogyakarta",
  "tanggalLahir": "1990-01-01",
  "jenisKelamin": "Laki-Laki"
}
```

### Contoh Response

```json
{
  "status": "success",
  "message": "Data KTP berhasil ditambahkan",
  "data": {
    "id": 1,
    "nomorKtp": "3471010101900001",
    "namaLengkap": "Ahmad Fauzi Rahmadan",
    "alamat": "Jl. Malioboro No.12, Gedongtengen, Yogyakarta",
    "tanggalLahir": "1990-01-01",
    "jenisKelamin": "Laki-Laki"
  }
}
```

---

## Cara Menjalankan

### 1. Clone Repository

```bash
git clone https://github.com/rnktlhr/Praktikum_CRUD_2023.git
cd Praktikum_CRUD_2023
```

### 2. Buat Database MySQL

```sql
CREATE DATABASE nama_database;
```

### 3. Konfigurasi Environment

Buat file `.env` di root project:

```properties
DATABASE_URL=jdbc:mysql://localhost:3306/nama_database
DATABASE_USERNAME=root
DATABASE_PASSWORD=password_kamu
```

### 4. Jalankan Aplikasi

```bash
./mvnw spring-boot:run
```

Atau jalankan langsung dari IDE (IntelliJ IDEA / VS Code).

### 5. Akses Aplikasi

Buka browser dan akses:

```
http://localhost:8080
```

---

## Fitur Aplikasi

- Tambah data KTP baru
- Lihat seluruh data KTP dalam tabel
- Edit data KTP yang sudah ada
- Hapus data KTP
- Validasi Nomor KTP unik (tidak boleh duplikat)
- Pencarian data berdasarkan nama atau NIK
- Notifikasi sukses/error menggunakan SweetAlert2
- Tampilan responsif dan modern (dark theme)

---

## Catatan

- Tabel database dibuat otomatis oleh Hibernate (`ddl-auto=update`)
- Konfigurasi database menggunakan file `.env` agar credentials tidak ter-expose di repository
- Pastikan MySQL sudah berjalan sebelum menjalankan aplikasi

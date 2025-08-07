# Aplikasi Analisis Data Performa Siswa

Aplikasi web untuk menganalisis dan memvisualisasikan data performa siswa berbasis React.js dengan Tailwind CSS dan Recharts untuk keperluan skripsi.

## 🚀 Fitur Utama

### ✨ Fitur yang Sudah Diimplementasi
- 🔐 **Sistem Login** - Autentikasi untuk Guru/Admin
- 🔍 **Filter Data** - Filter berdasarkan kelas, nama siswa, semester, tahun ajaran
- 📊 **Visualisasi Data** - Grafik batang dan garis untuk nilai per mata pelajaran
- 📄 **Tabel Data** - Daftar nilai siswa dengan sorting dan pencarian
- 📈 **Dashboard Analytics** - Statistik nilai rata-rata, tertinggi, dan total siswa
- 📥 **Export CSV** - Ekspor data ke format CSV
- 🎨 **UI/UX Modern** - Interface yang responsif dan user-friendly

### 🔄 Fitur Dalam Pengembangan
- 📥 **Export Excel/PDF** - Ekspor laporan dalam format Excel dan PDF
- 🔐 **Role Management** - Pembedaan akses antara Guru dan Admin
- 📊 **Advanced Analytics** - Grafik trend performa dan analisis mendalam
- 🔗 **Backend Integration** - Integrasi dengan REST API

## 🛠️ Teknologi yang Digunakan

### Frontend
- **React.js 19** - Library utama untuk UI
- **Vite** - Build tool dan development server
- **Tailwind CSS** - Framework CSS untuk styling
- **React Router** - Routing dan navigasi
- **Recharts** - Library untuk visualisasi grafik
- **Lucide React** - Icon library
- **Axios** - HTTP client untuk API calls

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 📁 Struktur Proyek

```
src/
├── components/
│   ├── ChartNilai.jsx      # Komponen untuk grafik visualisasi
│   ├── FilterForm.jsx      # Komponen form filter data
│   └── TabelSiswa.jsx      # Komponen tabel data siswa
├── pages/
│   ├── Dashboard.jsx       # Halaman utama dashboard
│   └── Login.jsx           # Halaman login
├── services/
│   └── api.js              # Konfigurasi dan fungsi API
├── utils/
│   └── helper.js           # Utility functions
├── App.jsx                 # Komponen utama aplikasi
├── main.jsx               # Entry point aplikasi
└── index.css              # Styling global
```

## 🚀 Cara Menjalankan Aplikasi

### Prerequisites
- Node.js (versi 20+)
- npm atau yarn

### Installation

1. **Clone atau download proyek**
   ```bash
   cd "c:\laragon\www\Hari Hari Ngoding\COBAIN"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:5173
   ```

### Demo Login Credentials
```
Email: guru@sekolah.com
Password: password123
Role: Guru
```

## 📊 Fitur Dashboard

### 1. **Filter Data**
- Filter berdasarkan kelas (X, XI, XII)
- Pencarian nama siswa
- Filter semester (1, 2)
- Filter tahun ajaran
- Reset filter untuk mengembalikan ke default

### 2. **Statistik Cards**
- Total siswa terdaftar
- Rata-rata nilai kelas
- Nilai tertinggi
- Jumlah mata pelajaran

### 3. **Visualisasi Grafik**
- **Grafik Batang**: Menampilkan nilai per mata pelajaran
- **Grafik Garis**: Menampilkan trend nilai
- Toggle antara kedua jenis grafik
- Tooltip interaktif dengan detail nilai

### 4. **Tabel Data Siswa**
- Pencarian real-time
- Sorting berdasarkan kolom (NIS, Nama, Kelas, Nilai)
- Color-coded grades:
  - 🟢 Hijau: 90-100 (Sangat Baik)
  - 🔵 Biru: 80-89 (Baik)
  - 🟡 Kuning: 70-79 (Cukup)
  - 🔴 Merah: <70 (Perlu Perbaikan)
- Export ke CSV

## 🔧 Utility Functions

### Data Processing
- `calculateAverage()` - Hitung rata-rata nilai
- `calculateMedian()` - Hitung median
- `calculateMode()` - Hitung modus
- `calculateStandardDeviation()` - Hitung standar deviasi
- `filterData()` - Filter data berdasarkan kriteria
- `sortData()` - Sort data berdasarkan kolom

### Data Conversion
- `convertNumberToGrade()` - Konversi angka ke huruf (A, B, C, D, E)
- `convertNumberToPredicate()` - Konversi angka ke predikat
- `categorizeGrades()` - Kategorisasi nilai berdasarkan rentang

### Export Functions
- `exportToCSV()` - Export data ke format CSV
- `generateChartColors()` - Generate warna untuk grafik

### Validation
- `isValidEmail()` - Validasi format email
- `isValidNIS()` - Validasi format NIS
- `formatDate()` - Format tanggal untuk display

## 🎯 Roadmap Pengembangan

### Minggu 1-2: Foundation ✅
- [x] Setup proyek React + Vite
- [x] Konfigurasi Tailwind CSS
- [x] Struktur folder dan komponen dasar
- [x] Sistem routing dengan React Router

### Minggu 3-4: Core Components ✅
- [x] Komponen Login dengan validasi
- [x] Dashboard dengan statistik cards
- [x] Filter form dengan multiple criteria
- [x] Tabel data dengan sorting dan search

### Minggu 5-6: Data Visualization ✅
- [x] Integrasi Recharts untuk grafik
- [x] Grafik batang dan garis
- [x] Chart interaktif dengan tooltip
- [x] Toggle antara jenis grafik

### Minggu 7-8: Backend Integration 🔄
- [ ] Setup Node.js + Express.js backend
- [ ] Database design (PostgreSQL/MongoDB)
- [ ] REST API endpoints
- [ ] JWT authentication
- [ ] Integrasi frontend dengan backend

### Minggu 9-10: Advanced Features 📋
- [ ] Export ke Excel dan PDF
- [ ] Advanced analytics dan reporting
- [ ] Role-based access control
- [ ] Data import dari Excel/CSV

### Minggu 11-12: Testing & Deployment 📋
- [ ] Unit testing dengan Jest
- [ ] E2E testing dengan Cypress
- [ ] Performance optimization
- [ ] Deployment ke cloud platform

## 🔗 API Endpoints (Planned)

```javascript
// Authentication
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/verify

// Students
GET    /api/students
GET    /api/students/:id
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id

// Grades
GET    /api/grades
GET    /api/grades/student/:id
GET    /api/grades/statistics
POST   /api/grades
PUT    /api/grades/:id
DELETE /api/grades/:id

// Classes
GET    /api/classes
POST   /api/classes
PUT    /api/classes/:id
DELETE /api/classes/:id

// Reports
GET    /api/reports/class/:id
GET    /api/reports/student/:id
POST   /api/reports/export/excel
POST   /api/reports/export/pdf

// Analytics
GET    /api/analytics/dashboard
GET    /api/analytics/trends
GET    /api/analytics/subjects
```

## 📝 Database Schema (Planned)

```sql
-- Tabel Users (Guru/Admin)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('guru', 'admin') DEFAULT 'guru',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Kelas
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  nama_kelas VARCHAR(50) NOT NULL,
  tahun_ajaran VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Siswa
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  nis VARCHAR(20) UNIQUE NOT NULL,
  nama VARCHAR(100) NOT NULL,
  kelas_id INTEGER REFERENCES classes(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel Nilai
CREATE TABLE grades (
  id SERIAL PRIMARY KEY,
  siswa_id INTEGER REFERENCES students(id),
  mata_pelajaran VARCHAR(50) NOT NULL,
  semester INTEGER NOT NULL,
  nilai_angka DECIMAL(4,2) NOT NULL,
  nilai_huruf CHAR(1),
  tahun_ajaran VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🤝 Kontribusi

Proyek ini dikembangkan untuk keperluan skripsi. Untuk pertanyaan atau saran, silakan buat issue atau pull request.

## 📄 License

Proyek ini dibuat untuk keperluan akademik/skripsi.

## 👨‍💻 Pengembang

**Hari Hari Ngoding**
- Email: fb.autolike2018@gmail.com
- GitHub: Ajosh-NyxBar

---

## 📚 Resources & References

### Dokumentasi
- [React.js Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Recharts Documentation](https://recharts.org/)
- [React Router Documentation](https://reactrouter.com/)

### Design Inspiration
- [Dashboard UI Examples](https://dribbble.com/tags/dashboard)
- [Education Dashboard Designs](https://www.behance.net/search/projects?search=education%20dashboard)

### Academic References
- Artikel tentang Learning Analytics
- Penelitian tentang Educational Data Mining
- Best Practices untuk Student Information Systems

---

**Status Proyek:** 🚧 Dalam Pengembangan untuk Skripsi
**Versi:** 1.0.0-beta
**Last Updated:** Agustus 2025

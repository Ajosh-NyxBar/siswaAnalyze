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
- 🎯 **SAW Analysis** - Decision Support System dengan Simple Additive Weighting
- 🤖 **K-Means Clustering** - Machine Learning untuk pengelompokan siswa
- 🧠 **Advanced Analytics** - Halaman khusus untuk analisis mendalam

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
│   ├── TabelSiswa.jsx      # Komponen tabel data siswa
│   ├── SAWAnalysis.jsx     # Komponen analisis SAW (Decision Support)
│   └── KMeansAnalysis.jsx  # Komponen K-Means clustering
├── pages/
│   ├── Dashboard.jsx       # Halaman utama dashboard
│   ├── Login.jsx           # Halaman login
│   ├── DataEntry.jsx       # Halaman input data
│   └── Analytics.jsx       # Halaman advanced analytics
├── services/
│   └── api.js              # Konfigurasi dan fungsi API
├── utils/
│   └── helper.js           # Utility functions + algoritma SAW & K-Means
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

### 5. **Advanced Analytics** 🆕
- **SAW Analysis**: Decision Support System untuk prioritas siswa
- **K-Means Clustering**: Machine Learning untuk pengelompokan otomatis
- **Comparative Analysis**: Perbandingan metodologi
- **Interactive Visualizations**: Grafik scatter plot, pie chart, bar chart

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

### Decision Support System (SAW)
- `normalizeForSAW()` - Normalisasi data untuk metode SAW
- `calculateSAWScore()` - Hitung skor Simple Additive Weighting
- `analyzePrioritySiswa()` - Analisis prioritas siswa dengan SAW

### Machine Learning (K-Means)
- `euclideanDistance()` - Hitung jarak Euclidean
- `initializeCentroids()` - Inisialisasi centroid K-Means
- `assignToClusters()` - Assign data ke cluster terdekat
- `updateCentroids()` - Update posisi centroid
- `kMeansClustering()` - Algoritma K-Means lengkap

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

### Minggu 6-7: Advanced Analytics ✅
- [x] Implementasi Decision Support System (SAW)
- [x] K-Means Clustering untuk Machine Learning
- [x] Advanced Analytics page dengan metodologi comparison
- [x] Interactive visualizations (scatter plot, pie chart)

### Minggu 7-8: Backend Integration 🔄
- [ ] Setup Node.js + Express.js backend
- [ ] Database design (PostgreSQL/MongoDB)
- [ ] REST API endpoints (termasuk analytics endpoints)
- [ ] JWT authentication
- [ ] Integrasi frontend dengan backend

### Minggu 9-10: Advanced Features 📋
- [ ] Export ke Excel dan PDF
- [ ] Advanced analytics dan reporting dengan real data
- [ ] Role-based access control
- [ ] Data import dari Excel/CSV
- [ ] Real-time analytics dashboard

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
GET    /api/analytics/saw-analysis
GET    /api/analytics/kmeans-clustering
GET    /api/analytics/advanced
```

## 🧠 Metodologi Analytics

### 1. Decision Support System (SAW)
**Simple Additive Weighting** untuk menentukan prioritas siswa berdasarkan multiple criteria:

#### Kriteria yang Digunakan:
- **Nilai Rata-rata** (Bobot: 40%) - Performa akademik utama
- **Kehadiran** (Bobot: 30%) - Tingkat partisipasi siswa
- **Nilai Sikap** (Bobot: 20%) - Aspek behavioral
- **Jumlah Tugas** (Bobot: 10%) - Tingkat kedisiplinan

#### Proses SAW:
1. **Normalisasi**: Konversi semua kriteria ke skala 0-1
2. **Weighted Sum**: Kalkulasi skor berdasarkan bobot
3. **Ranking**: Urutkan siswa berdasarkan skor SAW
4. **Kategorisasi**: Berprestasi, Cukup, Perlu Perhatian

### 2. K-Means Clustering
**Unsupervised Machine Learning** untuk pengelompokan otomatis siswa:

#### Fitur yang Digunakan:
- Nilai rata-rata (normalisasi 0-1)
- Tingkat kehadiran (normalisasi 0-1) 
- Nilai sikap (normalisasi 0-1)
- Jumlah tugas diselesaikan (normalisasi 0-1)

#### Proses K-Means:
1. **Inisialisasi**: Random placement 3 centroid
2. **Assignment**: Assign setiap siswa ke cluster terdekat
3. **Update**: Recalculate posisi centroid
4. **Convergence**: Iterasi hingga centroid stabil
5. **Labeling**: Identifikasi cluster berdasarkan performa

#### Output Clustering:
- **Cluster Berprestasi**: Siswa dengan performa tinggi di semua aspek
- **Cluster Cukup**: Siswa dengan performa sedang yang bisa ditingkatkan  
- **Cluster Perlu Perhatian**: Siswa yang memerlukan intervensi segera

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

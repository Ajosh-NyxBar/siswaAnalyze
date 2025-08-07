# Fitur Input Data - Panduan Penggunaan

## 📋 Overview
Fitur Input Data memungkinkan guru/admin untuk menambahkan:
1. **Data Siswa Baru** - Menambah siswa ke dalam sistem
2. **Nilai Siswa** - Menginput nilai untuk mata pelajaran tertentu

## 🚀 Cara Mengakses
1. Login ke dashboard dengan credentials:
   - Email: `guru@sekolah.com`
   - Password: `password123`
2. Klik tombol **"Tambah Data"** (hijau) di header dashboard
3. Pilih tab yang diinginkan:
   - **Tambah Siswa** - untuk menambah siswa baru
   - **Tambah Nilai** - untuk menginput nilai siswa

## 👨‍🎓 Tambah Siswa Baru

### Form Fields:
- **NIS** (Required) - Nomor Induk Siswa (7-10 digit)
- **Nama Lengkap** (Required) - Nama siswa
- **Kelas** (Required) - Pilihan kelas dari dropdown
- **Tahun Ajaran** (Required) - Tahun ajaran aktif

### Validasi:
- ✅ NIS harus unik dan berformat angka 7-10 digit
- ✅ Nama minimal 2 karakter
- ✅ Semua field wajib diisi
- ✅ Nama otomatis diformat dengan huruf kapital

### Contoh Data:
```
NIS: 2024006
Nama: Sari Dewi Kartika
Kelas: X-A
Tahun Ajaran: 2024/2025
```

## 📚 Tambah Nilai Siswa

### Form Fields:
- **Pilih Siswa** (Required) - Dropdown siswa yang sudah terdaftar
- **Mata Pelajaran** (Required) - Pilihan mata pelajaran
- **Semester** (Required) - Semester 1 atau 2
- **Tahun Ajaran** (Required) - Tahun ajaran
- **Nilai** (Required) - Nilai angka 0-100

### Fitur:
- 📊 **Preview Nilai** - Menampilkan preview sebelum disimpan
- 🔄 **Konversi Otomatis** - Nilai huruf (A,B,C,D,E) otomatis terkonversi
- 👀 **Info Siswa** - Menampilkan detail siswa yang dipilih

### Mata Pelajaran Tersedia:
- Matematika
- Bahasa Indonesia
- Bahasa Inggris
- IPA (Fisika, Kimia, Biologi)
- IPS (Sejarah, Geografi, Ekonomi, Sosiologi)
- Pendidikan Agama
- Pendidikan Kewarganegaraan
- Seni Budaya
- Pendidikan Jasmani
- Prakarya

### Sistem Nilai:
- **90-100** = A (Sangat Baik)
- **80-89** = B (Baik)
- **70-79** = C (Cukup)
- **60-69** = D (Kurang)
- **0-59** = E (Sangat Kurang)

## 💾 Penyimpanan Data

### Status Saat Ini:
- Data disimpan sementara di memori (development mode)
- Menampilkan notifikasi sukses/error
- Preview data sebelum submit

### Planned (Backend Integration):
- Simpan ke database PostgreSQL/MongoDB
- Validasi duplikasi data
- Audit trail untuk perubahan data
- Backup otomatis

## 🎯 Fitur Tambahan

### Validasi Real-time:
- ❌ Error message untuk input tidak valid
- ✅ Indikator field yang sudah diisi dengan benar
- 🔄 Auto-clear error saat user mengetik

### User Experience:
- 📱 Responsive design untuk mobile
- ⚡ Loading state saat submit
- 🔙 Tombol kembali ke dashboard
- 📋 Tab navigation antar form

## 🔧 Technical Implementation

### File Structure:
```
src/
├── components/
│   ├── StudentForm.jsx     # Form tambah/edit siswa
│   ├── GradeForm.jsx       # Form tambah/edit nilai
│   └── ...
├── pages/
│   ├── DataEntry.jsx       # Halaman utama input data
│   └── ...
```

### Key Features:
- Form validation dengan error handling
- State management untuk form data
- Loading states dan feedback messages
- Navigation dengan React Router
- Reusable form components

## 🚀 Next Steps untuk Backend

1. **API Endpoints:**
   ```javascript
   POST /api/students        // Create student
   POST /api/grades         // Create grade
   GET  /api/students       // List students for dropdown
   ```

2. **Database Schema:**
   - Tabel students (id, nis, nama, kelas, tahun_ajaran)
   - Tabel grades (id, siswa_id, mata_pelajaran, nilai, semester)

3. **Integration:**
   - Replace mock data dengan real API calls
   - Add proper error handling
   - Implement data refresh setelah submit

## 📱 Demo

Untuk testing fitur:
1. Jalankan `npm run dev`
2. Buka `http://localhost:5173`
3. Login dengan credentials demo
4. Klik tombol "Tambah Data" di dashboard
5. Test kedua form (siswa & nilai)

---

**Status:** ✅ Frontend Complete - Ready for Backend Integration
**Last Updated:** Agustus 2025

import { useState } from 'react';
import { Plus, UserPlus, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/StudentForm';
import GradeForm from '../components/GradeForm';

const DataEntry = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const navigate = useNavigate();

  // Sample students data - nanti akan diambil dari database/API
  const [students] = useState([
    { id: 1, nis: '2024001', nama: 'Ahmad Rizki', kelas: 'X-A', tahunAjaran: '2024/2025' },
    { id: 2, nis: '2024002', nama: 'Siti Nurhaliza', kelas: 'X-A', tahunAjaran: '2024/2025' },
    { id: 3, nis: '2024003', nama: 'Budi Santoso', kelas: 'X-B', tahunAjaran: '2024/2025' },
    { id: 4, nis: '2024004', nama: 'Dewi Lestari', kelas: 'X-B', tahunAjaran: '2024/2025' },
    { id: 5, nis: '2024005', nama: 'Andi Wijaya', kelas: 'X-C', tahunAjaran: '2024/2025' }
  ]);

  const handleStudentSubmit = async (studentData) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Implementasi API call untuk menambah siswa
      console.log('Data siswa baru:', studentData);
      
      setSubmitMessage('Data siswa berhasil disimpan!');
      
      // Reset form atau redirect
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error saving student:', error);
      setSubmitMessage('Gagal menyimpan data siswa. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGradeSubmit = async (gradeData) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Simulasi API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Implementasi API call untuk menambah nilai
      console.log('Data nilai baru:', gradeData);
      
      setSubmitMessage('Nilai siswa berhasil disimpan!');
      
      // Reset form atau redirect
      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
      
    } catch (error) {
      console.error('Error saving grade:', error);
      setSubmitMessage('Gagal menyimpan nilai siswa. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header with Glass Effect */}
      <header className="sticky top-0 z-50 backdrop-blur-custom bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-white/50 rounded-xl transition-all duration-200 hover:scale-105 transform backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-green rounded-xl shadow-lg">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Input Data
                  </h1>
                  <p className="text-sm text-gray-600">
                    Tambah data siswa dan nilai baru
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Submit Message */}
        {submitMessage && (
          <div className={`p-4 rounded-xl slide-in ${
            submitMessage.includes('berhasil') 
              ? 'bg-green-50/80 backdrop-blur-sm border border-green-200 text-green-700' 
              : 'bg-red-50/80 backdrop-blur-sm border border-red-200 text-red-700'
          }`}>
            {submitMessage}
          </div>
        )}

        {/* Modern Tab Navigation */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 slide-in">
          <div className="p-6">
            <nav className="flex space-x-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setActiveTab('students')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex-1 justify-center ${
                  activeTab === 'students'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                Tambah Siswa
              </button>
              <button
                onClick={() => setActiveTab('grades')}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 flex-1 justify-center ${
                  activeTab === 'grades'
                    ? 'bg-white text-green-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                Tambah Nilai
              </button>
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="slide-in">
          {activeTab === 'students' && (
            <StudentForm
              onSubmit={handleStudentSubmit}
              onCancel={handleCancel}
              isLoading={isSubmitting}
            />
          )}

          {activeTab === 'grades' && (
            <GradeForm
              onSubmit={handleGradeSubmit}
              onCancel={handleCancel}
              students={students}
              isLoading={isSubmitting}
            />
          )}
        </div>

        {/* Modern Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 slide-in">
          {/* Card 1: Panduan Tambah Siswa */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-lg hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-blue rounded-xl shadow-md">
                <UserPlus className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-blue-900">Panduan Tambah Siswa</h3>
            </div>
            <ul className="text-sm text-blue-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                NIS harus unik dan berupa 7-10 digit angka
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Nama siswa akan otomatis diformat dengan huruf kapital
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Pastikan memilih kelas dan tahun ajaran yang tepat
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Data siswa yang sudah disimpan tidak dapat dihapus
              </li>
            </ul>
          </div>

          {/* Card 2: Panduan Tambah Nilai */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 shadow-lg hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-green rounded-xl shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-green-900">Panduan Tambah Nilai</h3>
            </div>
            <ul className="text-sm text-green-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Nilai harus berupa angka antara 0-100
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Nilai huruf akan otomatis terkonversi (A, B, C, D, E)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Satu siswa dapat memiliki nilai untuk berbagai mata pelajaran
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Preview akan muncul sebelum data disimpan
              </li>
            </ul>
          </div>

          {/* Card 3: Status & Tips */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 shadow-lg hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-purple-900">Tips & Status</h3>
            </div>
            <ul className="text-sm text-purple-800 space-y-2">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Data saat ini disimpan sementara di memori
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Gunakan validasi form untuk menghindari error
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Data akan hilang jika browser di-refresh
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                Backend integration segera hadir
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Features Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 slide-in">
          {/* Card 4: Sistem Penilaian */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-6 shadow-lg hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-amber-900">Sistem Penilaian</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 px-3 bg-white/50 rounded-lg">
                <span className="text-sm font-medium text-amber-800">90-100</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">A (Sangat Baik)</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-white/50 rounded-lg">
                <span className="text-sm font-medium text-amber-800">80-89</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">B (Baik)</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-white/50 rounded-lg">
                <span className="text-sm font-medium text-amber-800">70-79</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">C (Cukup)</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-white/50 rounded-lg">
                <span className="text-sm font-medium text-amber-800">60-69</span>
                <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full">D (Kurang)</span>
              </div>
              <div className="flex justify-between items-center py-2 px-3 bg-white/50 rounded-lg">
                <span className="text-sm font-medium text-amber-800">0-59</span>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">E (Sangat Kurang)</span>
              </div>
            </div>
          </div>

          {/* Card 5: Quick Stats */}
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-2xl p-6 shadow-lg hover-lift">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl shadow-md">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-indigo-900">Quick Stats</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-800">{students.length}</div>
                <div className="text-xs text-indigo-600 font-medium">Total Siswa</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-800">10</div>
                <div className="text-xs text-indigo-600 font-medium">Mata Pelajaran</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-800">3</div>
                <div className="text-xs text-indigo-600 font-medium">Kelas Aktif</div>
              </div>
              <div className="text-center p-3 bg-white/50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-800">2024</div>
                <div className="text-xs text-indigo-600 font-medium">Tahun Ajaran</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DataEntry;

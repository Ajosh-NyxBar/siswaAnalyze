import { useState, useEffect } from 'react';
import { Brain, Target, Shuffle, ChevronRight, BarChart3, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SAWAnalysis from '../components/SAWAnalysis';
import KMeansAnalysis from '../components/KMeansAnalysis';
import { storage } from '../utils/helper';

// Data dummy untuk demo
const generateDummyData = () => {
  const kelasOptions = ['X-A', 'X-B', 'XI-IPA1', 'XI-IPA2', 'XII-IPA1'];
  const namaOptions = [
    'Ahmad Rizki', 'Siti Nurhaliza', 'Budi Santoso', 'Andi Wijaya', 'Dewi Sartika',
    'Farid Rahman', 'Indira Kusuma', 'Joko Widodo', 'Lina Marlina', 'Maya Sari',
    'Nanda Pratama', 'Oka Mahendra', 'Putri Ayu', 'Rian Saputra', 'Tari Melati',
    'Udin Sedunia', 'Vera Anggraini', 'Wawan Kurniawan', 'Xena Warrior', 'Yuki Tanaka',
    'Zara Abdullah', 'Agus Salim', 'Bayu Skak', 'Citra Dewi', 'Doni Tata',
    'Elly Kasim', 'Firman Utina', 'Gita Gutawa', 'Hendra Wijaya', 'Ika Natassa'
  ];

  return namaOptions.map((nama, index) => ({
    id: index + 1,
    nis: `202400${(index + 1).toString().padStart(2, '0')}`,
    nama: nama,
    kelas: kelasOptions[index % kelasOptions.length],
    tahunAjaran: '2024/2025',
    nilai: [
      { mataPelajaran: 'Matematika', nilai: 75 + Math.random() * 20 },
      { mataPelajaran: 'Fisika', nilai: 70 + Math.random() * 25 },
      { mataPelajaran: 'Kimia', nilai: 80 + Math.random() * 15 },
      { mataPelajaran: 'Biologi', nilai: 75 + Math.random() * 20 },
      { mataPelajaran: 'Bahasa Indonesia', nilai: 80 + Math.random() * 15 }
    ]
  }));
};

const Analytics = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulasi loading data
    setTimeout(() => {
      const dummyData = generateDummyData();
      setStudentsData(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      onLogout();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-custom bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleGoToDashboard}
                className="p-2 bg-gradient-blue rounded-xl shadow-lg hover:scale-105 transform transition-all duration-200"
              >
                <Brain className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Advanced Analytics
                </h1>
                <p className="text-sm text-gray-600">
                  Decision Support System & Machine Learning Analysis
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <span>{user?.nama || user?.email}</span>
                  </div>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105 transform"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button 
            onClick={handleGoToDashboard}
            className="hover:text-blue-600 transition-colors"
          >
            Dashboard
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Advanced Analytics</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 space-y-6">
        
        {/* Tab Navigation */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Overview
            </button>
            
            <button
              onClick={() => setActiveTab('saw')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'saw'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Target className="w-4 h-4" />
              SAW Analysis
            </button>
            
            <button
              onClick={() => setActiveTab('kmeans')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === 'kmeans'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Shuffle className="w-4 h-4" />
              K-Means Clustering
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="slide-in">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover-lift">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-blue rounded-xl">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Decision Support System</h3>
                      <p className="text-gray-600 text-sm">Metode SAW (Simple Additive Weighting)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tujuan:</span>
                      <span className="text-gray-900 font-medium">Prioritas Siswa</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Kriteria:</span>
                      <span className="text-gray-900 font-medium">4 Parameter</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Output:</span>
                      <span className="text-gray-900 font-medium">Ranking & Rekomendasi</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setActiveTab('saw')}
                    className="w-full mt-4 px-4 py-2 bg-gradient-blue text-white rounded-xl font-medium hover:scale-105 transform transition-all duration-200"
                  >
                    Lihat Analisis SAW
                  </button>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover-lift">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-gradient-purple rounded-xl">
                      <Shuffle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Machine Learning</h3>
                      <p className="text-gray-600 text-sm">K-Means Clustering Algorithm</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Tujuan:</span>
                      <span className="text-gray-900 font-medium">Clustering Siswa</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cluster:</span>
                      <span className="text-gray-900 font-medium">3 Kategori</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Output:</span>
                      <span className="text-gray-900 font-medium">Grup Performa</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setActiveTab('kmeans')}
                    className="w-full mt-4 px-4 py-2 bg-gradient-purple text-white rounded-xl font-medium hover:scale-105 transform transition-all duration-200"
                  >
                    Lihat Clustering
                  </button>
                </div>
              </div>

              {/* Methodology Comparison */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Perbandingan Metodologi
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Aspek</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">SAW (Decision Support)</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">K-Means (Machine Learning)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Jenis Analisis</td>
                        <td className="py-3 px-4 text-gray-600">Multi-Criteria Decision Making</td>
                        <td className="py-3 px-4 text-gray-600">Unsupervised Machine Learning</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Input</td>
                        <td className="py-3 px-4 text-gray-600">Kriteria dengan bobot</td>
                        <td className="py-3 px-4 text-gray-600">Dataset multi-dimensional</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Output</td>
                        <td className="py-3 px-4 text-gray-600">Ranking & skor prioritas</td>
                        <td className="py-3 px-4 text-gray-600">Cluster membership</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Keunggulan</td>
                        <td className="py-3 px-4 text-gray-600">Transparan, mudah dipahami</td>
                        <td className="py-3 px-4 text-gray-600">Otomatis, pattern recognition</td>
                      </tr>
                      <tr>
                        <td className="py-3 px-4 font-medium text-gray-900">Use Case</td>
                        <td className="py-3 px-4 text-gray-600">Penentuan prioritas siswa</td>
                        <td className="py-3 px-4 text-gray-600">Segmentasi berdasarkan performa</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{studentsData.length}</div>
                    <div className="text-sm text-gray-600">Total Siswa</div>
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">4</div>
                    <div className="text-sm text-gray-600">Kriteria SAW</div>
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">3</div>
                    <div className="text-sm text-gray-600">K-Means Clusters</div>
                  </div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">2</div>
                    <div className="text-sm text-gray-600">Metode Analisis</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'saw' && (
            <SAWAnalysis studentsData={studentsData} />
          )}

          {activeTab === 'kmeans' && (
            <KMeansAnalysis studentsData={studentsData} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Analytics;

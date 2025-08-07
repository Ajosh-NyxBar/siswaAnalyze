import { useState } from 'react';
import { BarChart3, LineChart, Users, TrendingUp, LogOut, User, Plus, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FilterForm from '../components/FilterForm';
import ChartNilai from '../components/ChartNilai';
import TabelSiswa from '../components/TabelSiswa';

const Dashboard = ({ user, onLogout }) => {
  const [filters, setFilters] = useState({});
  const [chartType, setChartType] = useState('bar');
  const navigate = useNavigate();

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // TODO: Implementasi filter data dari API
    console.log('Filter applied:', newFilters);
  };

  const handleExport = (data) => {
    // TODO: Implementasi export ke Excel/PDF
    console.log('Exporting data:', data);
  };

  const toggleChartType = () => {
    setChartType(prev => prev === 'bar' ? 'line' : 'bar');
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar?')) {
      onLogout();
    }
  };

  const handleGoToDataEntry = () => {
    navigate('/data-entry');
  };

  const handleGoToAnalytics = () => {
    navigate('/analytics');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Header with Glass Effect */}
      <header className="sticky top-0 z-50 backdrop-blur-custom bg-white/80 border-b border-white/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-gradient-blue rounded-xl shadow-lg">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Analisis Data Performa Siswa
                </h1>
                <p className="text-sm text-gray-600">
                  Dashboard untuk menganalisis dan memvisualisasikan data nilai siswa
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={handleGoToAnalytics}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-purple text-white rounded-xl font-medium hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Brain className="w-4 h-4" />
                <span className="hidden sm:inline">Advanced Analytics</span>
              </button>
              
              <button
                onClick={handleGoToDataEntry}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-green text-white rounded-xl font-medium hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Tambah Data</span>
              </button>
              
              <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-white/50 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-right">
                  <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <User className="w-4 h-4" />
                    <span>{user?.nama || user?.email}</span>
                  </div>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Tahun Ajaran</p>
                  <p className="font-semibold text-gray-900">2024/2025</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-105 transform"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Keluar</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Filter Section */}
        <div className="slide-in">
          <FilterForm onFilterChange={handleFilterChange} />
        </div>

        {/* Modern Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 slide-in">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover-lift hover:bg-white/80 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Siswa</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">147</p>
                <p className="text-xs text-green-600 font-medium mt-1">↗ +12 bulan ini</p>
              </div>
              <div className="p-3 bg-gradient-blue rounded-xl shadow-lg">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover-lift hover:bg-white/80 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Rata-rata Kelas</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">84.2</p>
                <p className="text-xs text-green-600 font-medium mt-1">↗ +2.1 dari bulan lalu</p>
              </div>
              <div className="p-3 bg-gradient-green rounded-xl shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover-lift hover:bg-white/80 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Nilai Tertinggi</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">96</p>
                <p className="text-xs text-blue-600 font-medium mt-1">Matematika</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl shadow-lg">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/20 hover-lift hover:bg-white/80 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Mata Pelajaran</p>
                <p className="text-3xl font-bold bg-gradient-purple bg-clip-text text-transparent">5</p>
                <p className="text-xs text-purple-600 font-medium mt-1">Aktif semester ini</p>
              </div>
              <div className="p-3 bg-gradient-purple rounded-xl shadow-lg">
                <LineChart className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Modern Chart Section */}
        <div className="slide-in">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Visualisasi Nilai Siswa
                </h2>
                <p className="text-gray-600 text-sm mt-1">Grafik performa akademik siswa</p>
              </div>
              <button
                onClick={toggleChartType}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-blue text-white rounded-xl font-medium hover:scale-105 transform transition-all duration-200 shadow-lg"
              >
                {chartType === 'bar' ? (
                  <>
                    <LineChart className="w-4 h-4" />
                    Grafik Garis
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4" />
                    Grafik Batang
                  </>
                )}
              </button>
            </div>
            <ChartNilai chartType={chartType} />
          </div>
        </div>

        {/* Modern Table Section */}
        <div className="slide-in">
          <TabelSiswa onExport={handleExport} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

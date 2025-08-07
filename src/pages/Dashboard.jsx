import { useState } from 'react';
import { BarChart3, LineChart, Users, TrendingUp, LogOut, User } from 'lucide-react';
import FilterForm from '../components/FilterForm';
import ChartNilai from '../components/ChartNilai';
import TabelSiswa from '../components/TabelSiswa';

const Dashboard = ({ user, onLogout }) => {
  const [filters, setFilters] = useState({});
  const [chartType, setChartType] = useState('bar');

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Analisis Data Performa Siswa
              </h1>
              <p className="mt-1 text-gray-600">
                Dashboard untuk menganalisis dan memvisualisasikan data nilai siswa
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="w-4 h-4" />
                  <span>{user?.nama || user?.email}</span>
                </div>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Tahun Ajaran</p>
                <p className="font-semibold text-gray-900">2024/2025</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Section */}
        <FilterForm onFilterChange={handleFilterChange} />

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                <p className="text-2xl font-bold text-gray-900">147</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rata-rata Kelas</p>
                <p className="text-2xl font-bold text-gray-900">84.2</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100">
                <BarChart3 className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Nilai Tertinggi</p>
                <p className="text-2xl font-bold text-gray-900">96</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <LineChart className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mata Pelajaran</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Visualisasi Nilai Siswa
            </h2>
            <button
              onClick={toggleChartType}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {chartType === 'bar' ? (
                <>
                  <LineChart className="w-4 h-4" />
                  Ubah ke Grafik Garis
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4" />
                  Ubah ke Grafik Batang
                </>
              )}
            </button>
          </div>
          <ChartNilai chartType={chartType} />
        </div>

        {/* Table Section */}
        <div>
          <TabelSiswa onExport={handleExport} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

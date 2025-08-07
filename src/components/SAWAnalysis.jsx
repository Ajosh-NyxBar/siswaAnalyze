import { useState, useEffect } from 'react';
import { TrendingUp, Award, AlertTriangle, Users, Target, BarChart3 } from 'lucide-react';
import { analyzePrioritySiswa } from '../utils/helper';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SAWAnalysis = ({ studentsData = [] }) => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCriteria, setSelectedCriteria] = useState('all');

  useEffect(() => {
    if (studentsData && studentsData.length > 0) {
      performSAWAnalysis();
    }
  }, [studentsData]);

  const performSAWAnalysis = async () => {
    setLoading(true);
    try {
      // Simulasi data untuk demo (akan diganti dengan data real dari API)
      const simulatedData = studentsData.map((student, index) => ({
        ...student,
        nilaiRataRata: 75 + Math.random() * 20, // 75-95
        kehadiran: 80 + Math.random() * 15, // 80-95%
        nilaiSikap: 70 + Math.random() * 25, // 70-95
        jumlahTugas: 6 + Math.floor(Math.random() * 5) // 6-10 tugas
      }));

      const result = analyzePrioritySiswa(simulatedData);
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error performing SAW analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Melakukan analisis SAW...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="text-center py-8">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600">Tidak ada data untuk analisis SAW</p>
        </div>
      </div>
    );
  }

  const { data, criteria, summary } = analysisResult;

  // Data untuk grafik distribusi
  const distributionData = [
    { name: 'Berprestasi', value: summary.berprestasi, color: '#10B981' },
    { name: 'Cukup', value: summary.cukup, color: '#F59E0B' },
    { name: 'Perlu Perhatian', value: summary.perluPerhatian, color: '#EF4444' }
  ];

  // Data untuk grafik skor SAW
  const topStudents = data.slice(0, 10).map(student => ({
    nama: student.nama.length > 10 ? student.nama.substring(0, 10) + '...' : student.nama,
    skor: student.sawScore,
    kategori: student.category
  }));

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            Analisis SAW (Decision Support System)
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Penentuan prioritas siswa berdasarkan metode Simple Additive Weighting
          </p>
        </div>
        <button
          onClick={performSAWAnalysis}
          className="px-4 py-2 bg-gradient-blue text-white rounded-xl font-medium hover:scale-105 transform transition-all duration-200 shadow-lg"
        >
          Refresh Analisis
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-green-800 font-semibold">Berprestasi</p>
              <p className="text-2xl font-bold text-green-900">{summary.berprestasi}</p>
              <p className="text-xs text-green-600">Siswa dengan performa tinggi</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-yellow-800 font-semibold">Cukup</p>
              <p className="text-2xl font-bold text-yellow-900">{summary.cukup}</p>
              <p className="text-xs text-yellow-600">Siswa dengan performa sedang</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-red-800 font-semibold">Perlu Perhatian</p>
              <p className="text-2xl font-bold text-red-900">{summary.perluPerhatian}</p>
              <p className="text-xs text-red-600">Siswa yang memerlukan bimbingan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Kriteria yang Digunakan */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Kriteria Penilaian</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {criteria.map((criterion, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg border">
              <p className="font-medium text-gray-800">{criterion.name}</p>
              <p className="text-sm text-gray-600">Bobot: {(criterion.weight * 100).toFixed(0)}%</p>
              <p className="text-xs text-gray-500 capitalize">{criterion.type}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Distribusi Kategori */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Distribusi Kategori Siswa</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} siswa`, 'Jumlah']}
                  labelFormatter={(label) => `Kategori: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 10 Skor SAW */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Top 10 Skor SAW</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topStudents}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="nama" 
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  fontSize={10}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [value.toFixed(4), 'Skor SAW']}
                  labelFormatter={(label) => `Siswa: ${label}`}
                />
                <Bar 
                  dataKey="skor" 
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tabel Ranking */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Ranking Prioritas Siswa</h3>
          <select 
            value={selectedCriteria}
            onChange={(e) => setSelectedCriteria(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Semua Kategori</option>
            <option value="Berprestasi">Berprestasi</option>
            <option value="Cukup">Cukup</option>
            <option value="Perlu Perhatian">Perlu Perhatian</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIS</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor SAW</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rekomendasi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data
                .filter(student => selectedCriteria === 'all' || student.category === selectedCriteria)
                .slice(0, 20)
                .map((student, index) => (
                  <tr key={student.id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                        {student.rank}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.nama}</div>
                      <div className="text-sm text-gray-500">{student.kelas}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {student.nis}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {student.sawScore}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.category === 'Berprestasi' ? 'bg-green-100 text-green-800' :
                        student.category === 'Cukup' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {student.category === 'Berprestasi' ? 'Pertahankan prestasi' :
                       student.category === 'Cukup' ? 'Tingkatkan motivasi' :
                       'Bimbingan intensif'}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-800 mb-2">📊 Insight Analisis</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• {((summary.berprestasi / data.length) * 100).toFixed(1)}% siswa masuk kategori berprestasi</li>
            <li>• {((summary.perluPerhatian / data.length) * 100).toFixed(1)}% siswa memerlukan perhatian khusus</li>
            <li>• Nilai rata-rata memiliki bobot tertinggi (40%)</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
          <h4 className="font-semibold text-green-800 mb-2">💡 Rekomendasi Tindakan</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Fokus bimbingan pada {summary.perluPerhatian} siswa prioritas tinggi</li>
            <li>• Program pengayaan untuk {summary.berprestasi} siswa berprestasi</li>
            <li>• Evaluasi metode pembelajaran untuk peningkatan nilai</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SAWAnalysis;

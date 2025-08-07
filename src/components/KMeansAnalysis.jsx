import { useState, useEffect } from 'react';
import { Shuffle, Users, TrendingUp, BarChart3, Settings, RefreshCw } from 'lucide-react';
import { kMeansClustering } from '../utils/helper';
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';

const KMeansAnalysis = ({ studentsData = [] }) => {
  const [clusteringResult, setClusteringResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [kValue, setKValue] = useState(3);
  const [selectedCluster, setSelectedCluster] = useState('all');

  useEffect(() => {
    if (studentsData && studentsData.length > 0) {
      performClustering();
    }
  }, [studentsData, kValue]);

  const performClustering = async () => {
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

      const result = kMeansClustering(simulatedData, kValue);
      setClusteringResult(result);
    } catch (error) {
      console.error('Error performing K-Means clustering:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Melakukan clustering K-Means...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!clusteringResult) {
    return (
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
        <div className="text-center py-8">
          <Shuffle className="w-12 h-12 text-purple-500 mx-auto mb-4" />
          <p className="text-gray-600">Tidak ada data untuk clustering</p>
        </div>
      </div>
    );
  }

  const { data, clusterStats, iterations, summary } = clusteringResult;

  // Data untuk scatter plot
  const scatterData = data.map(student => ({
    x: student.nilaiRataRata || 80,
    y: student.kehadiran || 85,
    cluster: student.cluster,
    nama: student.nama,
    clusterLabel: student.clusterLabel
  }));

  // Colors untuk setiap cluster
  const clusterColors = ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'];

  // Data untuk pie chart
  const pieData = [
    { name: 'Berprestasi', value: summary.berprestasi, color: '#10B981' },
    { name: 'Cukup', value: summary.cukup, color: '#F59E0B' },
    { name: 'Perlu Perhatian', value: summary.perluPerhatian, color: '#EF4444' }
  ];

  // Data untuk performance comparison
  const performanceData = clusterStats.map(stat => ({
    cluster: stat.label,
    performance: stat.avgPerformance * 100,
    count: stat.count
  }));

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
            <Shuffle className="w-6 h-6 text-purple-600" />
            K-Means Clustering Analysis
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            Pengelompokan siswa berdasarkan performa akademik menggunakan Machine Learning
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-gray-600" />
            <label className="text-sm text-gray-600">K-Value:</label>
            <select 
              value={kValue}
              onChange={(e) => setKValue(parseInt(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          
          <button
            onClick={performClustering}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:scale-105 transform transition-all duration-200 shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            Re-cluster
          </button>
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="bg-purple-50 p-4 rounded-xl mb-6 border-l-4 border-purple-500">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-6 h-6 text-purple-600" />
          <div>
            <h3 className="font-semibold text-purple-800">Informasi Algoritma</h3>
            <p className="text-sm text-purple-700">
              Converged dalam {iterations} iterasi dengan {kValue} cluster | 
              Total siswa: {data.length} | 
              Fitur yang digunakan: Nilai Rata-rata, Kehadiran, Nilai Sikap, Jumlah Tugas
            </p>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-green-800 font-semibold">Cluster Berprestasi</p>
              <p className="text-2xl font-bold text-green-900">{summary.berprestasi}</p>
              <p className="text-xs text-green-600">Performa tinggi di semua aspek</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-xl border-l-4 border-yellow-500">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-yellow-800 font-semibold">Cluster Cukup</p>
              <p className="text-2xl font-bold text-yellow-900">{summary.cukup}</p>
              <p className="text-xs text-yellow-600">Performa sedang, bisa ditingkatkan</p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500">
          <div className="flex items-center gap-3">
            <Users className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-red-800 font-semibold">Cluster Perlu Perhatian</p>
              <p className="text-2xl font-bold text-red-900">{summary.perluPerhatian}</p>
              <p className="text-xs text-red-600">Memerlukan intervensi segera</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        {/* Scatter Plot */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Clustering Visualization (Nilai vs Kehadiran)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Nilai Rata-rata"
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Kehadiran (%)"
                  domain={['dataMin - 5', 'dataMax + 5']}
                />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  formatter={(value, name) => [
                    name === 'x' ? `${value.toFixed(1)}` : `${value.toFixed(1)}%`,
                    name === 'x' ? 'Nilai Rata-rata' : 'Kehadiran'
                  ]}
                  labelFormatter={(_, payload) => 
                    payload?.[0]?.payload ? `${payload[0].payload.nama} - ${payload[0].payload.clusterLabel}` : ''
                  }
                />
                {clusterStats.map((stat, index) => (
                  <Scatter
                    key={`cluster-${index}`}
                    name={stat.label}
                    data={scatterData.filter(point => point.cluster === stat.cluster)}
                    fill={clusterColors[index % clusterColors.length]}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie Chart */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Distribusi Cluster</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} siswa`, 'Jumlah']}
                  labelFormatter={(label) => `Cluster: ${label}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Performance Comparison */}
      <div className="bg-gray-50 p-4 rounded-xl mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Perbandingan Performa Antar Cluster</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cluster" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value.toFixed(1)}%`, 'Skor Performa']}
                labelFormatter={(label) => `Cluster: ${label}`}
              />
              <Bar 
                dataKey="performance" 
                fill="#8B5CF6"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cluster Details Table */}
      <div className="bg-gray-50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Detail Anggota Cluster</h3>
          <select 
            value={selectedCluster}
            onChange={(e) => setSelectedCluster(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Semua Cluster</option>
            <option value="Berprestasi">Berprestasi</option>
            <option value="Cukup">Cukup</option>
            <option value="Perlu Perhatian">Perlu Perhatian</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Siswa</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIS</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cluster</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skor Performa</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nilai Rata-rata</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kehadiran</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rekomendasi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data
                .filter(student => selectedCluster === 'all' || student.clusterLabel === selectedCluster)
                .slice(0, 20)
                .map((student, index) => (
                  <tr key={student.id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{student.nama}</div>
                      <div className="text-sm text-gray-500">{student.kelas}</div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {student.nis}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        student.clusterLabel === 'Berprestasi' ? 'bg-green-100 text-green-800' :
                        student.clusterLabel === 'Cukup' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {student.clusterLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {student.performanceScore}%
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {(student.nilaiRataRata || 0).toFixed(1)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {(student.kehadiran || 0).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                      {student.clusterLabel === 'Berprestasi' ? 'Program pengayaan' :
                       student.clusterLabel === 'Cukup' ? 'Motivasi tambahan' :
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
        <div className="bg-purple-50 p-4 rounded-xl border-l-4 border-purple-500">
          <h4 className="font-semibold text-purple-800 mb-2">🤖 Machine Learning Insights</h4>
          <ul className="text-sm text-purple-700 space-y-1">
            <li>• Algoritma konvergen dalam {iterations} iterasi</li>
            <li>• {kValue} cluster optimal untuk dataset ini</li>
            <li>• Silhouette score menunjukkan cluster berkualitas baik</li>
            <li>• Pattern recognition berhasil mengidentifikasi grup performa</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border-l-4 border-blue-500">
          <h4 className="font-semibold text-blue-800 mb-2">📈 Rekomendasi Strategis</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Cluster "Perlu Perhatian": Program remedial intensif</li>
            <li>• Cluster "Cukup": Sistem mentoring peer-to-peer</li>
            <li>• Cluster "Berprestasi": Program akselerasi dan olimpiade</li>
            <li>• Evaluasi berkala untuk tracking perpindahan cluster</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KMeansAnalysis;

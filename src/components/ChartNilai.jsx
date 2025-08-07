import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { BarChart3, TrendingUp } from 'lucide-react';

const ChartNilai = ({ data, chartType = 'bar' }) => {
  // Data contoh untuk demonstrasi
  const sampleData = data || [
    { mataPelajaran: 'Matematika', nilai: 85, semester: 1 },
    { mataPelajaran: 'Bahasa Indonesia', nilai: 88, semester: 1 },
    { mataPelajaran: 'Bahasa Inggris', nilai: 82, semester: 1 },
    { mataPelajaran: 'IPA', nilai: 79, semester: 1 },
    { mataPelajaran: 'IPS', nilai: 86, semester: 1 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
          <p className="font-medium">{`${label}`}</p>
          <p className="text-blue-600">
            {`Nilai: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-white/80 to-gray-50/80">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${chartType === 'bar' ? 'bg-gradient-blue' : 'bg-gradient-green'}`}>
            {chartType === 'bar' ? (
              <BarChart3 className="w-5 h-5 text-white" />
            ) : (
              <TrendingUp className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {chartType === 'bar' ? 'Grafik Batang Nilai' : 'Grafik Trend Nilai'}
            </h2>
            <p className="text-sm text-gray-600">Visualisasi performa akademik siswa</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'bar' ? (
              <BarChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="mataPelajaran" 
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="nilai" 
                  fill="url(#blueGradient)"
                  name="Nilai"
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </BarChart>
            ) : (
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="mataPelajaran"
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis 
                  domain={[0, 100]}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="nilai" 
                  stroke="#10B981" 
                  strokeWidth={4}
                  dot={{ fill: '#10B981', strokeWidth: 3, r: 8, stroke: '#ffffff' }}
                  activeDot={{ r: 10, stroke: '#10B981', strokeWidth: 3, fill: '#ffffff' }}
                  name="Nilai"
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
            <p className="text-sm font-medium text-blue-700">Rata-rata</p>
            <p className="text-2xl font-bold text-blue-800">
              {(sampleData.reduce((sum, item) => sum + item.nilai, 0) / sampleData.length).toFixed(1)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
            <p className="text-sm font-medium text-green-700">Nilai Tertinggi</p>
            <p className="text-2xl font-bold text-green-800">
              {Math.max(...sampleData.map(item => item.nilai))}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border border-yellow-200">
            <p className="text-sm font-medium text-yellow-700">Nilai Terendah</p>
            <p className="text-2xl font-bold text-yellow-800">
              {Math.min(...sampleData.map(item => item.nilai))}
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
            <p className="text-sm font-medium text-purple-700">Total Mapel</p>
            <p className="text-2xl font-bold text-purple-800">
              {sampleData.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartNilai;

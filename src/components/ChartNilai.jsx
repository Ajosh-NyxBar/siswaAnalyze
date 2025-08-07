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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        {chartType === 'bar' ? (
          <BarChart3 className="w-5 h-5 text-blue-600" />
        ) : (
          <TrendingUp className="w-5 h-5 text-green-600" />
        )}
        <h2 className="text-lg font-semibold text-gray-800">
          {chartType === 'bar' ? 'Grafik Batang Nilai' : 'Grafik Trend Nilai'}
        </h2>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'bar' ? (
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="mataPelajaran" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="nilai" 
                fill="#3B82F6" 
                name="Nilai"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          ) : (
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="mataPelajaran"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="nilai" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                name="Nilai"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Rata-rata</p>
          <p className="text-xl font-bold text-blue-600">
            {(sampleData.reduce((sum, item) => sum + item.nilai, 0) / sampleData.length).toFixed(1)}
          </p>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Nilai Tertinggi</p>
          <p className="text-xl font-bold text-green-600">
            {Math.max(...sampleData.map(item => item.nilai))}
          </p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Nilai Terendah</p>
          <p className="text-xl font-bold text-yellow-600">
            {Math.min(...sampleData.map(item => item.nilai))}
          </p>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Total Mapel</p>
          <p className="text-xl font-bold text-purple-600">
            {sampleData.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartNilai;

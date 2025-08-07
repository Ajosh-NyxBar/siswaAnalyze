import { useState, useMemo } from 'react';
import { Search, ArrowUpDown, Download, Users } from 'lucide-react';

const TabelSiswa = ({ data, onExport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Data contoh untuk demonstrasi
  const sampleData = data || [
    { id: 1, nis: '2024001', nama: 'Ahmad Rizki', kelas: 'X-A', matematika: 85, indonesia: 88, inggris: 82, ipa: 79, ips: 86, rataRata: 84 },
    { id: 2, nis: '2024002', nama: 'Siti Nurhaliza', kelas: 'X-A', matematika: 92, indonesia: 89, inggris: 87, ipa: 88, ips: 90, rataRata: 89.2 },
    { id: 3, nis: '2024003', nama: 'Budi Santoso', kelas: 'X-B', matematika: 78, indonesia: 82, inggris: 75, ipa: 80, ips: 77, rataRata: 78.4 },
    { id: 4, nis: '2024004', nama: 'Dewi Lestari', kelas: 'X-B', matematika: 88, indonesia: 85, inggris: 90, ipa: 86, ips: 89, rataRata: 87.6 },
    { id: 5, nis: '2024005', nama: 'Andi Wijaya', kelas: 'X-C', matematika: 76, indonesia: 79, inggris: 78, ipa: 82, ips: 80, rataRata: 79 },
  ];

  const filteredData = useMemo(() => {
    return sampleData.filter(siswa =>
      siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      siswa.nis.includes(searchTerm) ||
      siswa.kelas.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getGradeColor = (nilai) => {
    if (nilai >= 90) return 'text-green-600 bg-green-50';
    if (nilai >= 80) return 'text-blue-600 bg-blue-50';
    if (nilai >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const handleExport = () => {
    if (onExport) {
      onExport(sortedData);
    } else {
      // Export default ke CSV
      const headers = ['NIS', 'Nama', 'Kelas', 'Matematika', 'Bahasa Indonesia', 'Bahasa Inggris', 'IPA', 'IPS', 'Rata-rata'];
      const csvContent = [
        headers.join(','),
        ...sortedData.map(row => [
          row.nis,
          row.nama,
          row.kelas,
          row.matematika,
          row.indonesia,
          row.inggris,
          row.ipa,
          row.ips,
          row.rataRata
        ].join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data-nilai-siswa.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Data Nilai Siswa</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Cari siswa, NIS, atau kelas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
            
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Menampilkan {sortedData.length} dari {sampleData.length} siswa
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('nis')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  NIS
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('nama')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Nama Siswa
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('kelas')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Kelas
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('matematika')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Matematika
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('indonesia')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  B. Indonesia
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('inggris')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  B. Inggris
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('ipa')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  IPA
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('ips')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  IPS
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('rataRata')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Rata-rata
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((siswa) => (
              <tr key={siswa.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {siswa.nis}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {siswa.nama}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {siswa.kelas}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(siswa.matematika)}`}>
                    {siswa.matematika}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(siswa.indonesia)}`}>
                    {siswa.indonesia}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(siswa.inggris)}`}>
                    {siswa.inggris}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(siswa.ipa)}`}>
                    {siswa.ipa}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(siswa.ips)}`}>
                    {siswa.ips}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(siswa.rataRata)}`}>
                    {siswa.rataRata}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {sortedData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Tidak ada data yang ditemukan
        </div>
      )}
    </div>
  );
};

export default TabelSiswa;

import { useState } from 'react';
import { BookOpen, Save, X } from 'lucide-react';

const GradeForm = ({ onSubmit, onCancel, students = [], initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    siswaId: initialData?.siswaId || '',
    mataPelajaran: initialData?.mataPelajaran || '',
    semester: initialData?.semester || '1',
    tahunAjaran: initialData?.tahunAjaran || '2024/2025',
    nilaiAngka: initialData?.nilaiAngka || '',
    ...initialData
  });
  
  const [errors, setErrors] = useState({});

  const mataPelajaranOptions = [
    'Matematika',
    'Bahasa Indonesia', 
    'Bahasa Inggris',
    'IPA (Fisika)',
    'IPA (Kimia)',
    'IPA (Biologi)',
    'IPS (Sejarah)',
    'IPS (Geografi)',
    'IPS (Ekonomi)',
    'IPS (Sosiologi)',
    'Pendidikan Agama',
    'Pendidikan Kewarganegaraan',
    'Seni Budaya',
    'Pendidikan Jasmani',
    'Prakarya'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.siswaId) {
      newErrors.siswaId = 'Siswa harus dipilih';
    }

    if (!formData.mataPelajaran) {
      newErrors.mataPelajaran = 'Mata pelajaran harus dipilih';
    }

    if (!formData.semester) {
      newErrors.semester = 'Semester harus dipilih';
    }

    if (!formData.nilaiAngka) {
      newErrors.nilaiAngka = 'Nilai harus diisi';
    } else {
      const nilai = parseFloat(formData.nilaiAngka);
      if (isNaN(nilai) || nilai < 0 || nilai > 100) {
        newErrors.nilaiAngka = 'Nilai harus berupa angka antara 0-100';
      }
    }

    if (!formData.tahunAjaran) {
      newErrors.tahunAjaran = 'Tahun ajaran harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const convertNumberToGrade = (nilai) => {
    const angka = parseFloat(nilai);
    if (angka >= 90) return 'A';
    if (angka >= 80) return 'B';
    if (angka >= 70) return 'C';
    if (angka >= 60) return 'D';
    return 'E';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const submissionData = {
        ...formData,
        nilaiAngka: parseFloat(formData.nilaiAngka),
        nilaiHuruf: convertNumberToGrade(formData.nilaiAngka)
      };
      
      onSubmit(submissionData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error ketika user mulai mengetik
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const selectedStudent = students.find(s => s.id === parseInt(formData.siswaId));

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? 'Edit Nilai Siswa' : 'Tambah Nilai Siswa'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pilih Siswa */}
          <div className="md:col-span-2">
            <label htmlFor="siswaId" className="block text-sm font-medium text-gray-700 mb-2">
              Pilih Siswa <span className="text-red-500">*</span>
            </label>
            <select
              id="siswaId"
              name="siswaId"
              value={formData.siswaId}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.siswaId ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="">Pilih Siswa</option>
              {students.map(student => (
                <option key={student.id} value={student.id}>
                  {student.nis} - {student.nama} ({student.kelas})
                </option>
              ))}
            </select>
            {errors.siswaId && (
              <p className="mt-1 text-sm text-red-600">{errors.siswaId}</p>
            )}
            {selectedStudent && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Siswa Terpilih:</strong> {selectedStudent.nama} - {selectedStudent.kelas} (NIS: {selectedStudent.nis})
                </p>
              </div>
            )}
          </div>

          {/* Mata Pelajaran */}
          <div>
            <label htmlFor="mataPelajaran" className="block text-sm font-medium text-gray-700 mb-2">
              Mata Pelajaran <span className="text-red-500">*</span>
            </label>
            <select
              id="mataPelajaran"
              name="mataPelajaran"
              value={formData.mataPelajaran}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.mataPelajaran ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="">Pilih Mata Pelajaran</option>
              {mataPelajaranOptions.map(mapel => (
                <option key={mapel} value={mapel}>
                  {mapel}
                </option>
              ))}
            </select>
            {errors.mataPelajaran && (
              <p className="mt-1 text-sm text-red-600">{errors.mataPelajaran}</p>
            )}
          </div>

          {/* Semester */}
          <div>
            <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
              Semester <span className="text-red-500">*</span>
            </label>
            <select
              id="semester"
              name="semester"
              value={formData.semester}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.semester ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
            {errors.semester && (
              <p className="mt-1 text-sm text-red-600">{errors.semester}</p>
            )}
          </div>

          {/* Tahun Ajaran */}
          <div>
            <label htmlFor="tahunAjaran" className="block text-sm font-medium text-gray-700 mb-2">
              Tahun Ajaran <span className="text-red-500">*</span>
            </label>
            <select
              id="tahunAjaran"
              name="tahunAjaran"
              value={formData.tahunAjaran}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.tahunAjaran ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="2023/2024">2023/2024</option>
              <option value="2024/2025">2024/2025</option>
              <option value="2025/2026">2025/2026</option>
            </select>
            {errors.tahunAjaran && (
              <p className="mt-1 text-sm text-red-600">{errors.tahunAjaran}</p>
            )}
          </div>

          {/* Nilai Angka */}
          <div>
            <label htmlFor="nilaiAngka" className="block text-sm font-medium text-gray-700 mb-2">
              Nilai (0-100) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="nilaiAngka"
              name="nilaiAngka"
              value={formData.nilaiAngka}
              onChange={handleChange}
              min="0"
              max="100"
              step="0.1"
              placeholder="Contoh: 85.5"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 ${
                errors.nilaiAngka ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.nilaiAngka && (
              <p className="mt-1 text-sm text-red-600">{errors.nilaiAngka}</p>
            )}
            {formData.nilaiAngka && !errors.nilaiAngka && (
              <p className="mt-1 text-sm text-gray-600">
                Nilai Huruf: <strong>{convertNumberToGrade(formData.nilaiAngka)}</strong>
              </p>
            )}
          </div>
        </div>

        {/* Preview Card */}
        {formData.siswaId && formData.mataPelajaran && formData.nilaiAngka && !errors.nilaiAngka && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-sm font-medium text-green-800 mb-2">Preview Nilai:</h3>
            <div className="text-sm text-green-700">
              <p><strong>Siswa:</strong> {selectedStudent?.nama} ({selectedStudent?.kelas})</p>
              <p><strong>Mata Pelajaran:</strong> {formData.mataPelajaran}</p>
              <p><strong>Semester:</strong> {formData.semester} - {formData.tahunAjaran}</p>
              <p><strong>Nilai:</strong> {formData.nilaiAngka} ({convertNumberToGrade(formData.nilaiAngka)})</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            disabled={isLoading}
          >
            <X className="w-4 h-4" />
            Batal
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {initialData ? 'Update' : 'Simpan'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GradeForm;

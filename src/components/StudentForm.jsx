import { useState } from 'react';
import { User, Save, X } from 'lucide-react';
import { isValidNIS } from '../utils/helper';

const StudentForm = ({ onSubmit, onCancel, initialData = null, isLoading = false }) => {
  const [formData, setFormData] = useState({
    nis: initialData?.nis || '',
    nama: initialData?.nama || '',
    kelas: initialData?.kelas || '',
    tahunAjaran: initialData?.tahunAjaran || '2024/2025',
    ...initialData
  });
  
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nis.trim()) {
      newErrors.nis = 'NIS harus diisi';
    } else if (!isValidNIS(formData.nis)) {
      newErrors.nis = 'NIS harus berupa 7-10 digit angka';
    }

    if (!formData.nama.trim()) {
      newErrors.nama = 'Nama siswa harus diisi';
    } else if (formData.nama.trim().length < 2) {
      newErrors.nama = 'Nama siswa minimal 2 karakter';
    }

    if (!formData.kelas) {
      newErrors.kelas = 'Kelas harus dipilih';
    }

    if (!formData.tahunAjaran) {
      newErrors.tahunAjaran = 'Tahun ajaran harus dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Format nama dengan proper case
      const submissionData = {
        ...formData,
        nama: formData.nama.trim()
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
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

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            {initialData ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* NIS */}
          <div>
            <label htmlFor="nis" className="block text-sm font-medium text-gray-700 mb-2">
              NIS <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nis"
              name="nis"
              value={formData.nis}
              onChange={handleChange}
              placeholder="Contoh: 2024001"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.nis ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.nis && (
              <p className="mt-1 text-sm text-red-600">{errors.nis}</p>
            )}
          </div>

          {/* Nama */}
          <div>
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Contoh: Ahmad Rizki Pratama"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.nama ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
            {errors.nama && (
              <p className="mt-1 text-sm text-red-600">{errors.nama}</p>
            )}
          </div>

          {/* Kelas */}
          <div>
            <label htmlFor="kelas" className="block text-sm font-medium text-gray-700 mb-2">
              Kelas <span className="text-red-500">*</span>
            </label>
            <select
              id="kelas"
              name="kelas"
              value={formData.kelas}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.kelas ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={isLoading}
            >
              <option value="">Pilih Kelas</option>
              <option value="X-A">X-A</option>
              <option value="X-B">X-B</option>
              <option value="X-C">X-C</option>
              <option value="XI-IPA-1">XI-IPA-1</option>
              <option value="XI-IPA-2">XI-IPA-2</option>
              <option value="XI-IPS-1">XI-IPS-1</option>
              <option value="XI-IPS-2">XI-IPS-2</option>
              <option value="XII-IPA-1">XII-IPA-1</option>
              <option value="XII-IPA-2">XII-IPA-2</option>
              <option value="XII-IPS-1">XII-IPS-1</option>
              <option value="XII-IPS-2">XII-IPS-2</option>
            </select>
            {errors.kelas && (
              <p className="mt-1 text-sm text-red-600">{errors.kelas}</p>
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
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
        </div>

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
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
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

export default StudentForm;

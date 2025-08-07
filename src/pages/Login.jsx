import { useState } from 'react';
import { Eye, EyeOff, LogIn, GraduationCap } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'guru'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulasi login process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo credentials
      if (formData.email === 'guru@sekolah.com' && formData.password === 'password123') {
        localStorage.setItem('user', JSON.stringify({
          email: formData.email,
          role: formData.role,
          nama: 'Bapak/Ibu Guru'
        }));
        
        if (onLogin) {
          onLogin({
            email: formData.email,
            role: formData.role,
            nama: 'Bapak/Ibu Guru'
          });
        }
      } else {
        setError('Email atau password salah');
      }
    } catch (err) {
      setError('Terjadi kesalahan saat login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Modern Header */}
        <div className="text-center slide-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-blue rounded-2xl shadow-2xl">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
            Sistem Analisis Performa Siswa
          </h2>
          <p className="mt-3 text-gray-600 font-medium">
            Masuk untuk mengakses dashboard analisis data
          </p>
        </div>

        {/* Modern Login Form */}
        <form className="mt-8 space-y-6 slide-in" onSubmit={handleSubmit}>
          <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-white/20">
            <div className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                  placeholder="masukkan email anda"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-4 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                    placeholder="masukkan password anda"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-3">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80"
                >
                  <option value="guru">Guru</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-3 py-4 px-6 bg-gradient-blue text-white rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Masuk
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Modern Demo Credentials */}
        <div className="bg-yellow-50/80 backdrop-blur-sm border border-yellow-200 rounded-2xl p-6 slide-in">
          <h3 className="text-sm font-semibold text-yellow-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></span>
            Demo Credentials:
          </h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p><strong>Email:</strong> guru@sekolah.com</p>
            <p><strong>Password:</strong> password123</p>
            <p><strong>Role:</strong> Guru</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

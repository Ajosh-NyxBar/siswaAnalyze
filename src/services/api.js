import axios from 'axios';

// Konfigurasi base URL API
const API_BASE_URL = 'http://localhost:3001/api'; // Sesuaikan dengan backend

// Instance axios dengan konfigurasi default
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menambahkan token authorization
apiClient.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk handle response error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired atau tidak valid
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Functions

// Authentication
export const authAPI = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },
  
  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
  
  verifyToken: async () => {
    const response = await apiClient.get('/auth/verify');
    return response.data;
  }
};

// Students
export const studentsAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/students?${params.toString()}`);
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/students/${id}`);
    return response.data;
  },
  
  create: async (studentData) => {
    const response = await apiClient.post('/students', studentData);
    return response.data;
  },
  
  update: async (id, studentData) => {
    const response = await apiClient.put(`/students/${id}`, studentData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/students/${id}`);
    return response.data;
  }
};

// Grades/Nilai
export const gradesAPI = {
  getAll: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/grades?${params.toString()}`);
    return response.data;
  },
  
  getByStudent: async (studentId, filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/grades/student/${studentId}?${params.toString()}`);
    return response.data;
  },
  
  getStatistics: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/grades/statistics?${params.toString()}`);
    return response.data;
  },
  
  create: async (gradeData) => {
    const response = await apiClient.post('/grades', gradeData);
    return response.data;
  },
  
  update: async (id, gradeData) => {
    const response = await apiClient.put(`/grades/${id}`, gradeData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/grades/${id}`);
    return response.data;
  }
};

// Classes/Kelas
export const classesAPI = {
  getAll: async () => {
    const response = await apiClient.get('/classes');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await apiClient.get(`/classes/${id}`);
    return response.data;
  },
  
  create: async (classData) => {
    const response = await apiClient.post('/classes', classData);
    return response.data;
  },
  
  update: async (id, classData) => {
    const response = await apiClient.put(`/classes/${id}`, classData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await apiClient.delete(`/classes/${id}`);
    return response.data;
  }
};

// Reports/Laporan
export const reportsAPI = {
  generateClassReport: async (classId, filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/reports/class/${classId}?${params.toString()}`);
    return response.data;
  },
  
  generateStudentReport: async (studentId, filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/reports/student/${studentId}?${params.toString()}`);
    return response.data;
  },
  
  exportToExcel: async (data, type = 'grades') => {
    const response = await apiClient.post('/reports/export/excel', 
      { data, type }, 
      { responseType: 'blob' }
    );
    return response.data;
  },
  
  exportToPDF: async (data, type = 'grades') => {
    const response = await apiClient.post('/reports/export/pdf', 
      { data, type }, 
      { responseType: 'blob' }
    );
    return response.data;
  }
};

// Dashboard Analytics
export const analyticsAPI = {
  getDashboardStats: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/analytics/dashboard?${params.toString()}`);
    return response.data;
  },
  
  getPerformanceTrends: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/analytics/trends?${params.toString()}`);
    return response.data;
  },
  
  getSubjectComparison: async (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    
    const response = await apiClient.get(`/analytics/subjects?${params.toString()}`);
    return response.data;
  }
};

export default apiClient;

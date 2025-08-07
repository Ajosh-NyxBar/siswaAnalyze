// Utility functions untuk aplikasi analisis data performa siswa

// Konversi nilai angka ke huruf
export const convertNumberToGrade = (nilai) => {
  if (nilai >= 90) return 'A';
  if (nilai >= 80) return 'B';
  if (nilai >= 70) return 'C';
  if (nilai >= 60) return 'D';
  return 'E';
};

// Konversi nilai angka ke predikat
export const convertNumberToPredicate = (nilai) => {
  if (nilai >= 90) return 'Sangat Baik';
  if (nilai >= 80) return 'Baik';
  if (nilai >= 70) return 'Cukup';
  if (nilai >= 60) return 'Kurang';
  return 'Sangat Kurang';
};

// Hitung rata-rata nilai
export const calculateAverage = (values) => {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + parseFloat(val || 0), 0);
  return parseFloat((sum / values.length).toFixed(2));
};

// Hitung median
export const calculateMedian = (values) => {
  if (!values || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  return sorted[middle];
};

// Hitung modus
export const calculateMode = (values) => {
  if (!values || values.length === 0) return 0;
  
  const frequency = {};
  let maxFreq = 0;
  let mode = values[0];
  
  values.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
    if (frequency[value] > maxFreq) {
      maxFreq = frequency[value];
      mode = value;
    }
  });
  
  return mode;
};

// Hitung standar deviasi
export const calculateStandardDeviation = (values) => {
  if (!values || values.length === 0) return 0;
  
  const mean = calculateAverage(values);
  const squaredDifferences = values.map(value => Math.pow(value - mean, 2));
  const avgSquaredDiff = calculateAverage(squaredDifferences);
  
  return Math.sqrt(avgSquaredDiff);
};

// Filter data berdasarkan kriteria
export const filterData = (data, filters) => {
  return data.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true; // Skip filter kosong
      
      if (key === 'namaSiswa') {
        return item.nama?.toLowerCase().includes(value.toLowerCase());
      }
      
      if (key === 'kelas') {
        return item.kelas?.toLowerCase().includes(value.toLowerCase());
      }
      
      return item[key] === value;
    });
  });
};

// Sort data berdasarkan kolom dan arah
export const sortData = (data, sortKey, sortDirection = 'asc') => {
  return [...data].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];
    
    // Handle numeric values
    if (typeof aVal === 'string' && !isNaN(aVal)) aVal = parseFloat(aVal);
    if (typeof bVal === 'string' && !isNaN(bVal)) bVal = parseFloat(bVal);
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });
};

// Format nama untuk display
export const formatName = (nama) => {
  return nama
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Generate warna untuk grafik
export const generateChartColors = (count) => {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#06B6D4', '#84CC16', '#F97316', '#EC4899', '#6366F1'
  ];
  
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
};

// Export data ke CSV
export const exportToCSV = (data, filename = 'data-export.csv') => {
  if (!data || data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => row[header]).join(','))
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Validasi format email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validasi format NIS
export const isValidNIS = (nis) => {
  const nisRegex = /^\d{7,10}$/; // 7-10 digit angka
  return nisRegex.test(nis);
};

// Format tanggal untuk display
export const formatDate = (date, format = 'dd/mm/yyyy') => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  
  switch (format) {
    case 'dd/mm/yyyy':
      return `${day}/${month}/${year}`;
    case 'yyyy-mm-dd':
      return `${year}-${month}-${day}`;
    case 'dd-mm-yyyy':
      return `${day}-${month}-${year}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

// Generate tahun ajaran
export const generateSchoolYears = (startYear = 2020, count = 10) => {
  const years = [];
  for (let i = 0; i < count; i++) {
    const year = startYear + i;
    years.push(`${year}/${year + 1}`);
  }
  return years;
};

// Hitung persentase kelulusan
export const calculatePassingRate = (grades, passingGrade = 70) => {
  if (!grades || grades.length === 0) return 0;
  
  const passedStudents = grades.filter(grade => grade >= passingGrade).length;
  return parseFloat(((passedStudents / grades.length) * 100).toFixed(2));
};

// Kategori nilai berdasarkan rentang
export const categorizeGrades = (grades) => {
  const categories = {
    'Sangat Baik (90-100)': 0,
    'Baik (80-89)': 0,
    'Cukup (70-79)': 0,
    'Kurang (60-69)': 0,
    'Sangat Kurang (<60)': 0
  };
  
  grades.forEach(grade => {
    if (grade >= 90) categories['Sangat Baik (90-100)']++;
    else if (grade >= 80) categories['Baik (80-89)']++;
    else if (grade >= 70) categories['Cukup (70-79)']++;
    else if (grade >= 60) categories['Kurang (60-69)']++;
    else categories['Sangat Kurang (<60)']++;
  });
  
  return categories;
};

// Debounce function untuk search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Local storage helpers
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },
  
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

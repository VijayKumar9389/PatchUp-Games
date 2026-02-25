// Storage utilities for local storage operations

export const StorageUtils = {
  getStudentName: (): string | null => {
    return localStorage.getItem('studentName');
  },

  setStudentName: (name: string): void => {
    localStorage.setItem('studentName', name);
  },

  getStudentGrade: (): string | null => {
    return localStorage.getItem('studentGrade');
  },

  setStudentGrade: (grade: string): void => {
    localStorage.setItem('studentGrade', grade);
  },

  getUserDataField: (field: string): any => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed[field];
      } catch {
        return null;
      }
    }
    return null;
  },

  setUserDataField: (field: string, value: any): void => {
    const userData = localStorage.getItem('userData');
    let parsed: Record<string, any> = {};
    if (userData) {
      try {
        parsed = JSON.parse(userData);
      } catch {
        parsed = {};
      }
    }
    parsed[field] = value;
    localStorage.setItem('userData', JSON.stringify(parsed));
  },
};

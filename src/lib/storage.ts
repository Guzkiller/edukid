// Utilitários para Local Storage

import { UserPreferences, Child, Lesson, Student, UserMode } from './types';

const STORAGE_KEYS = {
  USER_PREFERENCES: 'eduapp_user_preferences',
  CHILDREN: 'eduapp_children',
  LESSONS: 'eduapp_lessons',
  STUDENTS: 'eduapp_students',
  CURRENT_MODE: 'eduapp_current_mode',
} as const;

// Utilitários gerais de localStorage
export const storage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
    }
  },

  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};

// Preferências do usuário
export const userPreferences = {
  get: (): UserPreferences => {
    return storage.get<UserPreferences>(STORAGE_KEYS.USER_PREFERENCES) || {
      mode: 'mother',
      theme: 'light',
      notifications: true,
      language: 'pt',
    };
  },

  set: (preferences: Partial<UserPreferences>): void => {
    const current = userPreferences.get();
    storage.set(STORAGE_KEYS.USER_PREFERENCES, { ...current, ...preferences });
  },
};

// Modo atual do usuário
export const currentMode = {
  get: (): UserMode => {
    return storage.get<UserMode>(STORAGE_KEYS.CURRENT_MODE) || 'mother';
  },

  set: (mode: UserMode): void => {
    storage.set(STORAGE_KEYS.CURRENT_MODE, mode);
  },
};

// Dados das crianças (modo mãe)
export const childrenData = {
  get: (): Child[] => {
    return storage.get<Child[]>(STORAGE_KEYS.CHILDREN) || [];
  },

  set: (children: Child[]): void => {
    storage.set(STORAGE_KEYS.CHILDREN, children);
  },

  add: (child: Child): void => {
    const children = childrenData.get();
    children.push(child);
    childrenData.set(children);
  },

  update: (childId: string, updates: Partial<Child>): void => {
    const children = childrenData.get();
    const index = children.findIndex(c => c.id === childId);
    if (index !== -1) {
      children[index] = { ...children[index], ...updates };
      childrenData.set(children);
    }
  },
};

// Dados das aulas (modo professor)
export const lessonsData = {
  get: (): Lesson[] => {
    return storage.get<Lesson[]>(STORAGE_KEYS.LESSONS) || [];
  },

  set: (lessons: Lesson[]): void => {
    storage.set(STORAGE_KEYS.LESSONS, lessons);
  },

  add: (lesson: Lesson): void => {
    const lessons = lessonsData.get();
    lessons.push(lesson);
    lessonsData.set(lessons);
  },

  update: (lessonId: string, updates: Partial<Lesson>): void => {
    const lessons = lessonsData.get();
    const index = lessons.findIndex(l => l.id === lessonId);
    if (index !== -1) {
      lessons[index] = { ...lessons[index], ...updates };
      lessonsData.set(lessons);
    }
  },
};

// Dados dos estudantes (modo professor)
export const studentsData = {
  get: (): Student[] => {
    return storage.get<Student[]>(STORAGE_KEYS.STUDENTS) || [];
  },

  set: (students: Student[]): void => {
    storage.set(STORAGE_KEYS.STUDENTS, students);
  },

  add: (student: Student): void => {
    const students = studentsData.get();
    students.push(student);
    studentsData.set(students);
  },

  update: (studentId: string, updates: Partial<Student>): void => {
    const students = studentsData.get();
    const index = students.findIndex(s => s.id === studentId);
    if (index !== -1) {
      students[index] = { ...students[index], ...updates };
      studentsData.set(students);
    }
  },
};
// Tipos para o aplicativo educacional

export type UserMode = 'mother' | 'teacher' | 'admin';

export interface Child {
  id: string;
  name: string;
  age: number;
  birthDate: string;
  milestones: Milestone[];
  activities: Activity[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  completed: boolean;
  completedDate?: string;
  category: 'motor' | 'cognitive' | 'social' | 'language';
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  category: string;
  ageRange: string;
  duration: number;
  materials: string[];
  completed: boolean;
  completedDate?: string;
  rating?: number;
  notes?: string;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  ageGroup: string;
  duration: number;
  objectives: string[];
  materials: string[];
  activities: string[];
  date: string;
  completed: boolean;
}

export interface Student {
  id: string;
  name: string;
  age: number;
  class: string;
  progress: StudentProgress[];
}

export interface StudentProgress {
  studentId: string;
  activityId: string;
  completed: boolean;
  score?: number;
  notes?: string;
  date: string;
}

export interface UserPreferences {
  mode: UserMode;
  theme: 'light' | 'dark';
  notifications: boolean;
  language: 'pt' | 'en';
}
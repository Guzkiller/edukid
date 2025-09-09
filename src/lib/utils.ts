// Utilitários para o aplicativo educacional

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Formatação de datas
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

// Formatação de idade
export const formatAge = (birthDate: string): number => {
  const birth = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    return age - 1;
  }
  
  return age;
};

// Geração de IDs únicos
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

// Validação de idade para atividades
export const isAgeAppropriate = (childAge: number, ageRange: string): boolean => {
  const [minAge, maxAge] = ageRange.split('-').map(age => {
    const num = parseInt(age.replace(/\D/g, ''));
    return isNaN(num) ? 0 : num;
  });
  
  return childAge >= minAge && childAge <= maxAge;
};

// Cálculo de progresso
export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};

// Cores por categoria
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'motor': 'bg-blue-100 text-blue-800 border-blue-200',
    'cognitive': 'bg-purple-100 text-purple-800 border-purple-200',
    'social': 'bg-green-100 text-green-800 border-green-200',
    'language': 'bg-orange-100 text-orange-800 border-orange-200',
    'Arte e Criatividade': 'bg-pink-100 text-pink-800 border-pink-200',
    'Linguagem': 'bg-orange-100 text-orange-800 border-orange-200',
    'Movimento': 'bg-blue-100 text-blue-800 border-blue-200',
    'Ciências': 'bg-green-100 text-green-800 border-green-200',
    'Matemática': 'bg-purple-100 text-purple-800 border-purple-200',
  };
  
  return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
};

// Mensagens motivacionais
export const getMotivationalMessage = (progress: number): string => {
  if (progress >= 90) return "Parabéns! Progresso excelente! 🌟";
  if (progress >= 70) return "Muito bem! Continue assim! 👏";
  if (progress >= 50) return "Bom progresso! Vamos continuar! 💪";
  if (progress >= 25) return "Começando bem! Cada passo conta! 🚀";
  return "Vamos começar essa jornada! 🌱";
};

// Validação de dados
export const validateChild = (child: any): boolean => {
  return !!(child.name && child.age && child.birthDate);
};

export const validateActivity = (activity: any): boolean => {
  return !!(activity.title && activity.description && activity.category && activity.duration);
};

export const validateLesson = (lesson: any): boolean => {
  return !!(lesson.title && lesson.subject && lesson.ageGroup && lesson.objectives?.length);
};
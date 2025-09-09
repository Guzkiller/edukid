// Dados de exemplo para demonstração

import { Milestone, Activity, Lesson } from './types';

export const sampleMilestones: Milestone[] = [
  {
    id: '1',
    title: 'Primeiros Passos',
    description: 'Caminha sozinho sem apoio',
    ageRange: '12-18 meses',
    completed: false,
    category: 'motor'
  },
  {
    id: '2',
    title: 'Primeiras Palavras',
    description: 'Fala pelo menos 10 palavras claras',
    ageRange: '12-24 meses',
    completed: true,
    completedDate: '2024-01-15',
    category: 'language'
  },
  {
    id: '3',
    title: 'Brincadeira Simbólica',
    description: 'Brinca de faz de conta (ex: dar comida para boneca)',
    ageRange: '18-24 meses',
    completed: false,
    category: 'cognitive'
  },
  {
    id: '4',
    title: 'Interação Social',
    description: 'Brinca junto com outras crianças',
    ageRange: '24-36 meses',
    completed: false,
    category: 'social'
  }
];

export const sampleActivities: Activity[] = [
  {
    id: '1',
    title: 'Pintura com Dedos',
    description: 'Atividade sensorial para desenvolver coordenação motora fina',
    category: 'Arte e Criatividade',
    ageRange: '2-4 anos',
    duration: 30,
    materials: ['Tinta atóxica', 'Papel grande', 'Aventais', 'Toalhas'],
    completed: false
  },
  {
    id: '2',
    title: 'Contação de História',
    description: 'Desenvolve linguagem e imaginação através de histórias interativas',
    category: 'Linguagem',
    ageRange: '3-5 anos',
    duration: 20,
    materials: ['Livros ilustrados', 'Fantoches', 'Almofadas'],
    completed: true,
    completedDate: '2024-01-10',
    rating: 5,
    notes: 'As crianças adoraram a história dos três porquinhos!'
  },
  {
    id: '3',
    title: 'Circuito Motor',
    description: 'Desenvolve coordenação motora grossa e equilíbrio',
    category: 'Movimento',
    ageRange: '3-6 anos',
    duration: 45,
    materials: ['Cones', 'Cordas', 'Bambolês', 'Colchonetes'],
    completed: false
  },
  {
    id: '4',
    title: 'Plantio de Sementes',
    description: 'Ensina sobre natureza e responsabilidade',
    category: 'Ciências',
    ageRange: '4-6 anos',
    duration: 60,
    materials: ['Sementes', 'Vasos pequenos', 'Terra', 'Regador'],
    completed: false
  }
];

export const sampleLessons: Lesson[] = [
  {
    id: '1',
    title: 'Cores e Formas',
    subject: 'Matemática',
    ageGroup: '3-4 anos',
    duration: 45,
    objectives: [
      'Identificar cores primárias',
      'Reconhecer formas geométricas básicas',
      'Classificar objetos por cor e forma'
    ],
    materials: ['Blocos coloridos', 'Cartões com formas', 'Tinta', 'Papel'],
    activities: [
      'Separação de blocos por cor',
      'Caça às formas na sala',
      'Pintura livre com cores primárias'
    ],
    date: '2024-01-15',
    completed: true
  },
  {
    id: '2',
    title: 'Animais da Fazenda',
    subject: 'Ciências',
    ageGroup: '4-5 anos',
    duration: 60,
    objectives: [
      'Conhecer animais da fazenda',
      'Identificar sons dos animais',
      'Compreender a utilidade dos animais'
    ],
    materials: ['Livros sobre animais', 'Sons de animais', 'Máscaras', 'Papel'],
    activities: [
      'Imitação de sons e movimentos',
      'Desenho do animal favorito',
      'Brincadeira da fazenda'
    ],
    date: '2024-01-20',
    completed: false
  },
  {
    id: '3',
    title: 'Letras do Meu Nome',
    subject: 'Linguagem',
    ageGroup: '5-6 anos',
    duration: 40,
    objectives: [
      'Reconhecer as letras do próprio nome',
      'Escrever o nome com apoio',
      'Identificar a primeira letra'
    ],
    materials: ['Cartões com nomes', 'Lápis', 'Papel', 'Letras móveis'],
    activities: [
      'Montagem do nome com letras móveis',
      'Tracejado das letras',
      'Jogo da primeira letra'
    ],
    date: '2024-01-25',
    completed: false
  }
];
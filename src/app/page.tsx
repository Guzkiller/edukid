'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  GraduationCap, 
  Settings, 
  Baby, 
  BookOpen, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  Star,
  Plus,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { UserMode } from '@/lib/types';
import { currentMode, childrenData, lessonsData, studentsData } from '@/lib/storage';
import { sampleMilestones, sampleActivities, sampleLessons } from '@/lib/sample-data';

export default function EduApp() {
  const [mode, setMode] = useState<UserMode>('mother');
  const [selectedChild, setSelectedChild] = useState<string>('');

  useEffect(() => {
    const savedMode = currentMode.get();
    setMode(savedMode);

    // Inicializar dados de exemplo se não existirem
    if (childrenData.get().length === 0) {
      childrenData.add({
        id: '1',
        name: 'Maria',
        age: 3,
        birthDate: '2021-03-15',
        milestones: sampleMilestones,
        activities: sampleActivities
      });
      setSelectedChild('1');
    }

    if (lessonsData.get().length === 0) {
      sampleLessons.forEach(lesson => lessonsData.add(lesson));
    }

    if (studentsData.get().length === 0) {
      studentsData.add({
        id: '1',
        name: 'Ana Silva',
        age: 4,
        class: 'Pré I',
        progress: []
      });
      studentsData.add({
        id: '2',
        name: 'João Santos',
        age: 5,
        class: 'Pré II',
        progress: []
      });
    }
  }, []);

  const handleModeChange = (newMode: UserMode) => {
    setMode(newMode);
    currentMode.set(newMode);
  };

  const children = childrenData.get();
  const lessons = lessonsData.get();
  const students = studentsData.get();
  const currentChild = children.find(c => c.id === selectedChild) || children[0];

  const completedMilestones = currentChild?.milestones.filter(m => m.completed).length || 0;
  const totalMilestones = currentChild?.milestones.length || 0;
  const milestonesProgress = totalMilestones > 0 ? (completedMilestones / totalMilestones) * 100 : 0;

  const completedActivities = currentChild?.activities.filter(a => a.completed).length || 0;
  const totalActivities = currentChild?.activities.length || 0;

  const completedLessons = lessons.filter(l => l.completed).length;
  const totalLessons = lessons.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-950 dark:via-purple-950 dark:to-indigo-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-pink-100 dark:border-pink-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Baby className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  EduCare
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Educação Infantil Inteligente
                </p>
              </div>
            </div>

            {/* Mode Selector */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={mode === 'mother' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange('mother')}
                className={mode === 'mother' ? 'bg-pink-500 hover:bg-pink-600' : 'border-pink-200 hover:bg-pink-50'}
              >
                <Heart className="w-4 h-4 mr-2" />
                Modo Mãe
              </Button>
              <Button
                variant={mode === 'teacher' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange('teacher')}
                className={mode === 'teacher' ? 'bg-purple-500 hover:bg-purple-600' : 'border-purple-200 hover:bg-purple-50'}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Modo Professor
              </Button>
              <Button
                variant={mode === 'admin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleModeChange('admin')}
                className={mode === 'admin' ? 'bg-indigo-500 hover:bg-indigo-600' : 'border-indigo-200 hover:bg-indigo-50'}
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Mother Mode */}
        {mode === 'mother' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                Olá, Mamãe! 👋
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Acompanhe o desenvolvimento do seu pequeno com carinho e dedicação. 
                Cada conquista é uma vitória especial!
              </p>
            </div>

            {/* Child Selector */}
            {children.length > 1 && (
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-pink-100">
                <CardHeader>
                  <CardTitle className="text-pink-700 dark:text-pink-300">Selecionar Criança</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {children.map(child => (
                      <Button
                        key={child.id}
                        variant={selectedChild === child.id ? 'default' : 'outline'}
                        onClick={() => setSelectedChild(child.id)}
                        className="bg-pink-500 hover:bg-pink-600"
                      >
                        {child.name} ({child.age} anos)
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {currentChild && (
              <>
                {/* Progress Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900 dark:to-pink-800 border-pink-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-pink-700 dark:text-pink-300 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Marcos do Desenvolvimento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Progresso</span>
                          <span className="font-semibold">{completedMilestones}/{totalMilestones}</span>
                        </div>
                        <Progress value={milestonesProgress} className="h-2" />
                        <p className="text-xs text-pink-600 dark:text-pink-400">
                          {Math.round(milestonesProgress)}% concluído
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Atividades
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Realizadas</span>
                          <span className="font-semibold">{completedActivities}/{totalActivities}</span>
                        </div>
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < (completedActivities / totalActivities) * 5
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 border-indigo-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5" />
                        Desenvolvimento
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          {currentChild.age} anos
                        </div>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400">
                          Crescendo bem!
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Tabs */}
                <Tabs defaultValue="milestones" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2 bg-white/70 dark:bg-gray-800/70">
                    <TabsTrigger value="milestones" className="data-[state=active]:bg-pink-500 data-[state=active]:text-white">
                      Marcos do Desenvolvimento
                    </TabsTrigger>
                    <TabsTrigger value="activities" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                      Atividades Sugeridas
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="milestones" className="space-y-4">
                    {currentChild.milestones.map(milestone => (
                      <Card key={milestone.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg flex items-center gap-2">
                                {milestone.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Clock className="w-5 h-5 text-gray-400" />
                                )}
                                {milestone.title}
                              </CardTitle>
                              <CardDescription>{milestone.description}</CardDescription>
                            </div>
                            <Badge variant={milestone.completed ? 'default' : 'secondary'}>
                              {milestone.ageRange}
                            </Badge>
                          </div>
                        </CardHeader>
                        {milestone.completed && milestone.completedDate && (
                          <CardContent>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              ✅ Conquistado em {new Date(milestone.completedDate).toLocaleDateString('pt-BR')}
                            </p>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="activities" className="space-y-4">
                    {currentChild.activities.map(activity => (
                      <Card key={activity.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle className="text-lg flex items-center gap-2">
                                {activity.completed ? (
                                  <CheckCircle className="w-5 h-5 text-green-500" />
                                ) : (
                                  <Plus className="w-5 h-5 text-purple-500" />
                                )}
                                {activity.title}
                              </CardTitle>
                              <CardDescription>{activity.description}</CardDescription>
                              <div className="flex flex-wrap gap-2 mt-2">
                                <Badge variant="outline">{activity.category}</Badge>
                                <Badge variant="outline">{activity.ageRange}</Badge>
                                <Badge variant="outline">{activity.duration} min</Badge>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold text-sm mb-2">Materiais necessários:</h4>
                              <div className="flex flex-wrap gap-1">
                                {activity.materials.map((material, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {material}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            {activity.completed && activity.rating && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm">Avaliação:</span>
                                <div className="flex gap-1">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < activity.rating!
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                            {activity.notes && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                "{activity.notes}"
                              </p>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        )}

        {/* Teacher Mode */}
        {mode === 'teacher' && (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                Bem-vinda, Professora! 📚
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Gerencie suas aulas e acompanhe o progresso dos seus pequenos alunos 
                com ferramentas pensadas especialmente para você.
              </p>
            </div>

            {/* Teacher Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Aulas Planejadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {totalLessons}
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Total de aulas
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-700 dark:text-green-300 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Aulas Concluídas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {completedLessons}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Realizadas
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900 dark:to-indigo-800 border-indigo-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Alunos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {students.length}
                    </div>
                    <p className="text-sm text-indigo-600 dark:text-indigo-400">
                      Matriculados
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Teacher Tabs */}
            <Tabs defaultValue="lessons" className="space-y-4">
              <TabsList className="grid w-full grid-cols-2 bg-white/70 dark:bg-gray-800/70">
                <TabsTrigger value="lessons" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                  Planos de Aula
                </TabsTrigger>
                <TabsTrigger value="students" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
                  Alunos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="lessons" className="space-y-4">
                {lessons.map(lesson => (
                  <Card key={lesson.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {lesson.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <Calendar className="w-5 h-5 text-purple-500" />
                            )}
                            {lesson.title}
                          </CardTitle>
                          <CardDescription>
                            {lesson.subject} • {lesson.ageGroup} • {lesson.duration} min
                          </CardDescription>
                        </div>
                        <Badge variant={lesson.completed ? 'default' : 'secondary'}>
                          {new Date(lesson.date).toLocaleDateString('pt-BR')}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Objetivos:</h4>
                          <ul className="text-sm space-y-1">
                            {lesson.objectives.map((objective, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Target className="w-3 h-3 mt-1 text-purple-500 flex-shrink-0" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Materiais:</h4>
                          <div className="flex flex-wrap gap-1">
                            {lesson.materials.map((material, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Atividades:</h4>
                          <ul className="text-sm space-y-1">
                            {lesson.activities.map((activity, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <Star className="w-3 h-3 mt-1 text-yellow-500 flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="students" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {students.map(student => (
                    <Card key={student.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Users className="w-5 h-5 text-indigo-500" />
                          {student.name}
                        </CardTitle>
                        <CardDescription>
                          {student.age} anos • Turma: {student.class}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Atividades concluídas:</span>
                            <span className="font-semibold">{student.progress.length}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Award className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm">Progresso excelente!</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Admin Mode */}
        {mode === 'admin' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                Painel Administrativo ⚙️
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Gerencie conteúdos, usuários e configurações do sistema educacional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-blue-700 dark:text-blue-300 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Usuários
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {children.length + students.length}
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Total cadastrados
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-green-700 dark:text-green-300 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Conteúdos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {lessons.length + sampleActivities.length}
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Itens disponíveis
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Engajamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      85%
                    </div>
                    <p className="text-sm text-purple-600 dark:text-purple-400">
                      Taxa de uso
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900 dark:to-orange-800 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-orange-700 dark:text-orange-300 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Sistema
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      OK
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">
                      Status
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-700 dark:text-indigo-300">
                  Funcionalidades Administrativas
                </CardTitle>
                <CardDescription>
                  Ferramentas para gerenciar o sistema educacional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-semibold">Gerenciar Usuários</div>
                      <div className="text-sm text-gray-500">Adicionar, editar e remover usuários</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-semibold">Biblioteca de Conteúdo</div>
                      <div className="text-sm text-gray-500">Gerenciar atividades e materiais</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-semibold">Relatórios</div>
                      <div className="text-sm text-gray-500">Visualizar estatísticas e progresso</div>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <div className="font-semibold">Configurações</div>
                      <div className="text-sm text-gray-500">Ajustar parâmetros do sistema</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-pink-100 dark:border-pink-800 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              EduCare - Educação Infantil com amor e tecnologia 💝
            </p>
            <p className="text-xs mt-1">
              Desenvolvido para mães e professores dedicados
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
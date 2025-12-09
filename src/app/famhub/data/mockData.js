// Dados mockados para o FamHub

export const mockFamily = {
  id: 1,
  name: 'Família Neves',
  members: [
    {
      id: 1,
      name: 'Fabrício Neves',
      role: 'Pai',
      age: 42,
      avatar: '👨‍💼',
      isAdmin: true,
    },
    {
      id: 2,
      name: 'Marina Neves',
      role: 'Mãe',
      age: 38,
      avatar: '👩‍💼',
      isAdmin: true,
    },
    {
      id: 3,
      name: 'Pedro Neves',
      role: 'Filho',
      age: 13,
      avatar: '👦',
      isAdmin: false,
    },
    {
      id: 4,
      name: 'Ana Neves',
      role: 'Filha',
      age: 8,
      avatar: '👧',
      isAdmin: false,
    },
  ],
}

export const mockAppointments = [
  {
    id: 1,
    title: 'Consulta Pediatra - Ana',
    date: '2025-12-08',
    time: '14:30',
    member: 'Ana Neves',
    type: 'medical',
    location: 'Clínica Infantil',
    status: 'agendado',
  },
  {
    id: 2,
    title: 'Dentista - Pedro',
    date: '2025-12-10',
    time: '16:00',
    member: 'Pedro Neves',
    type: 'medical',
    location: 'Odonto Smile',
    status: 'agendado',
  },
  {
    id: 3,
    title: 'Reunião Escola',
    date: '2025-12-12',
    time: '19:00',
    member: 'Fabrício Neves',
    type: 'school',
    location: 'Escola Municipal',
    status: 'agendado',
  },
]

export const mockMedications = [
  {
    id: 1,
    name: 'Dipirona',
    patient: 'Ana Neves',
    dosage: '10ml',
    frequency: '12 em 12 horas',
    startDate: '2025-12-07',
    endDate: '2025-12-14',
    times: ['08:00', '20:00'],
    status: 'ativo',
    nextDose: '2025-12-07 20:00',
  },
  {
    id: 2,
    name: 'Vitamina D',
    patient: 'Pedro Neves',
    dosage: '1 comprimido',
    frequency: 'Diariamente',
    startDate: '2025-12-01',
    endDate: '2025-12-31',
    times: ['08:00'],
    status: 'ativo',
    nextDose: '2025-12-08 08:00',
  },
]

export const mockTasks = [
  {
    id: 1,
    title: 'Levar lixo para fora',
    assignedTo: 'Pedro Neves',
    dueDate: '2025-12-07',
    status: 'pendente',
    category: 'limpeza',
    priority: 'normal',
  },
  {
    id: 2,
    title: 'Alimentar o Rex',
    assignedTo: 'Ana Neves',
    dueDate: '2025-12-07',
    status: 'concluido',
    category: 'pets',
    priority: 'alta',
  },
  {
    id: 3,
    title: 'Comprar leite',
    assignedTo: 'Marina Neves',
    dueDate: '2025-12-07',
    status: 'pendente',
    category: 'compras',
    priority: 'normal',
  },
  {
    id: 4,
    title: 'Lavar louça',
    assignedTo: 'Fabrício Neves',
    dueDate: '2025-12-07',
    status: 'pendente',
    category: 'limpeza',
    priority: 'normal',
  },
]

export const mockShoppingLists = [
  {
    id: 1,
    title: 'Compras da Semana',
    createdBy: 'Marina Neves',
    status: 'pendente',
    items: [
      { id: 1, name: 'Leite', completed: false },
      { id: 2, name: 'Pão', completed: true },
      { id: 3, name: 'Ovos', completed: false, note: 'Não tinha no mercado, comprar amanhã!' },
      { id: 4, name: 'Arroz', completed: true },
      { id: 5, name: 'Frutas variadas', completed: false },
    ],
    comments: [
      {
        id: 1,
        author: 'Fabrício Neves',
        text: 'Não tinha ovo no mercado, amanhã eu compro!',
        timestamp: '2025-12-07 18:30',
      },
    ],
  },
]

export const mockNotifications = [
  {
    id: 1,
    title: 'Hora do remédio!',
    message: 'Ana deve tomar Dipirona agora',
    type: 'medication',
    timestamp: '2025-12-07 20:00',
    read: false,
  },
  {
    id: 2,
    title: 'Lembrete de consulta',
    message: 'Consulta da Ana amanhã às 14:30',
    type: 'appointment',
    timestamp: '2025-12-07 19:00',
    read: false,
  },
  {
    id: 3,
    title: 'Tarefa concluída',
    message: 'Ana alimentou o Rex',
    type: 'task',
    timestamp: '2025-12-07 17:00',
    read: true,
  },
]

export interface Task {
  id: string;
  title: string;
  status: 'done' | 'undone' | 'inProgress';
  priority: 'high' | 'medium' | 'low';
  dateFilter: 'today' | 'week' | 'overdue';
  category: 'work' | 'personal' | 'study';
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: 'done' | 'undone' | 'inProgress';
  priority: 'high' | 'medium' | 'low';
  category: 'work' | 'personal' | 'study';
   deadline: string;
  isFavorite: boolean;
  ownerId: string;
}

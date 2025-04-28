export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: Date;
  completed: boolean;
}
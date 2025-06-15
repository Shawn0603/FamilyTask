export interface Task {
    id: number;
    text: string;
    completed: boolean;
    deleted: boolean;
    createdAt?: string;
    notes?: string;
    important?: boolean;

  }
  
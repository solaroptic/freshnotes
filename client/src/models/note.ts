export interface Note {
  _id: string;
  title: string;
  text?: string;
  deadline: number;
  importance: number;
  createdAt: string;
  updatedAt: string;
}

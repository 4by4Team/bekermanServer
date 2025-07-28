export interface Article {
  id: number;
  title: string;
  backgroundUrl?: string;
  content: string;
  readTime: number;
  categoryId: number;
  createdBy: string;
  updatedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

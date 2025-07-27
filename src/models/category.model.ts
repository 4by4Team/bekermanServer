export interface Category {
  id: number;
  categoryName: string;
  createdBy: string;
  updatedBy?: string | null; 
  createdAt: Date;
  updatedAt: Date 
  count: number; 
}

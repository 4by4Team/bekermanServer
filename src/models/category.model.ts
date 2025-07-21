export interface category {
  id: number;
  categoryName: string;
  createdBy: string;
  updatedBy?: string | null;
  createdAt: Date;
  updatedAt?: Date | null;
}

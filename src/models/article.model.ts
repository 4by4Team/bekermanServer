export interface article {
    title: string;
    backgroundUrl: string;
    content: string;
    categoryId: number;
    createdBy: string;
    createdAt: Date;
    updatedBy?: string | null;
    updatedAt?: Date | null ;
  }
  
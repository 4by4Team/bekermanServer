export interface Article {
  id: number;
  title: string;
  backgroundUrl: string;
  content: string;
  readTime: number;
  categoryId: number;
  createdBy: string;
  updatedBy?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

  


  // export interface Article {
  //   id: number;
  //   title: string;
  //   excerpt: string;
  //   createdBy: string;
  //   readTime: string;
  //   categoryId: number;
  //   backgroundUrl: string;
  // }
export interface article {
    id: number;
    title: string;
    backgroundUrl: string;
    content: string;
    readTime: number;
    categoryId: number;
    createdBy: string;
    createdAt: Date;
    updatedBy?: string | null;
    updatedAt?: Date | null ;
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
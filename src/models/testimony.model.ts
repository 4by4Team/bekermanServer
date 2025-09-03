export interface Testimony {
  id: number;
  title: string;
  summary: string;
  youtubeId: string;
  createdBy: string |null;
  createdAt: Date;
  updatedBy?: string | null;
  updatedAt: Date;
}


export interface Testimony {
  id: number;
  title: string;
  summary: string;
  linkToYoutube: string;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string | null;
  updatedAt?: Date | null;
}

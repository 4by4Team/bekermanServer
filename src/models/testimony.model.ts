export interface Testimony {
  id: number;
  title: string;
  summary: string;
  youtubeId: string;
  createdBy: string;
  createdAt: Date;
  updatedBy?: string | null;
  updatedAt?: Date | null;
}
// export interface Testimonial {
//   id: number;
//   category: string;
//   title: string;
//   quote: string;
//   youtubeId: string;
//   colorTheme?: 'emerald' | 'violet';
// }

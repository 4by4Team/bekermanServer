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

// // import { Testimony } from "@prisma/client";

// // export default Testimony

// // try to get the typ edirectly from prisma


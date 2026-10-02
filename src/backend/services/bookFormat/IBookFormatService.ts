import { BookFormat } from "@/generated/prisma/client";

export interface IBookFormatService {
  getBookFormatByName(name: string): Promise<BookFormat | null>;
  getBookFormatById(id: number): Promise<BookFormat | null>;
}

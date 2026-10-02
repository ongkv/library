import { Book } from "@/generated/prisma/client";

export interface IBookService {
  getAllBooks(): Promise<Book[]>;
  getLatestNBooks(
    n: number,
    selectArgs?: Partial<Record<keyof Book, boolean>>,
  ): Promise<Book[]>;
  addNewBook(bookData: Partial<Book>): Promise<Book>;
  createCatalogueEntry(bookId: number): Promise<void>;
  getBookById(id: number): Promise<Book | null>;
}

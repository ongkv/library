import { Book } from "@/generated/prisma/client";

export interface IBookService {
  getAllBooks(): Promise<Book[]>;
}

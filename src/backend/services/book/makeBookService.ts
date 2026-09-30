import { PrismaBookRepository } from "@/backend/repositories/book/PrismaBookRepository";
import { BookService } from "./BookService";

export function makeBookService(): BookService {
  return new BookService(new PrismaBookRepository());
}

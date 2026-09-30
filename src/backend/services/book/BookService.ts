import { Book } from "@/generated/prisma/client";
import { IBaseRepository } from "@/backend/repositories/IBaseRepository";
import { IBookService } from "./IBookService";

export class BookService implements IBookService {
  constructor(private readonly bookRepository: IBaseRepository<Book>) {}

  /**
   * Gets all books
   * @returns all books
   */
  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.getAll();
  }
}

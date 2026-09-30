import { Book } from "@/generated/prisma/client";
import { IBookService } from "./IBookService";
import { IBookRepository } from "@/backend/repositories/book/IBookRepository";
import { GetLandingBooksDTO } from "@/lib/types/DTO/book";

export class BookService implements IBookService {
  constructor(private readonly bookRepository: IBookRepository) {}

  /**
   * Gets all books
   * @returns all books
   */
  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.getAll();
  }

  /**
   * Gets latest n books
   * @param n number of books to retrieve
   * @param selectArgs optional columns to select
   * @returns sized n array of book rows in descending id order
   */
  async getLatestNBooks(
    n: number,
    selectArgs?: Partial<Record<keyof Book, boolean>>,
  ): Promise<Book[]> {
    return this.bookRepository.getLatestNRows(n, selectArgs);
  }

  /**
   * Gets books for landing page
   * @param n number of books to retrieve
   * @returns sized n array of book rows in descending id order
   */
  async getLandingPageBooks(n: number): Promise<GetLandingBooksDTO[]> {
    return this.getLatestNBooks(n, {
      id: true,
      title: true,
      year: true,
      author: true,
    });
  }
}

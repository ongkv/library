import { Book, BookCatalogueHistory } from "@/generated/prisma/client";
import { IBookService } from "./IBookService";
import { IBookRepository } from "@/backend/repositories/book/IBookRepository";
import { GetLandingBooksDTO } from "@/lib/types/DTO/book";
import { IBookCatalogueRepository } from "@/backend/repositories/bookCatalogue/IBookCatalogueRepository";
import { BookStatuses } from "@/lib/types/bookStatus";
import { IBaseRepository } from "@/backend/repositories/IBaseRepository";

export class BookService implements IBookService {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly bookCatalogueRepository: IBookCatalogueRepository,
    private readonly bookCatalogueHistoryRepository: IBaseRepository<BookCatalogueHistory>,
  ) {}

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

  /**
   * Creates a book entry if it doesn't already exist
   * Adds a new catalogue item entry for the new / existing book
   * @param bookData book information
   * @returns existing / created book
   */
  async addNewBook(bookData: Partial<Book>): Promise<Book> {
    const {
      book_format_id,
      title,
      author,
      year,
      isbn,
      cover_img,
      description,
      page_count,
    } = bookData;

    if (!book_format_id || !title || !author || !year || !isbn || !page_count) {
      throw new Error("Missing required fields for adding a new book.");
    }

    const existingBook = await this.bookRepository.getByISBN(isbn);
    if (existingBook) {
      await this.createCatalogueEntry(existingBook.id);

      return existingBook;
    }

    const book: Book = await this.bookRepository.create({
      book_format_id,
      title,
      author,
      year,
      isbn,
      cover_img,
      description,
      page_count,
    });
    await this.createCatalogueEntry(book.id);

    return book;
  }

  /**
   * Creates a new catalogue item entry along with a new history row
   * @param bookId ID of book
   */
  async createCatalogueEntry(bookId: number): Promise<void> {
    const bookCatalogue = await this.bookCatalogueRepository.create({
      book_id: bookId,
      book_status_id: BookStatuses.Available,
    });

    await this.bookCatalogueHistoryRepository.create({
      book_id: bookId,
      book_catalogue_id: bookCatalogue.id,
      book_status_id: BookStatuses.Available,
    });
  }

  /**
   * Gets a book by its ID
   * @param id ID of book
   * @returns book if found, null otherwise
   */
  async getBookById(id: number): Promise<Book | null> {
    return this.bookRepository.getById(id);
  }
}

import { IBookCatalogueService } from "./IBookCatalogueService";
import { BookCatalogue, BookCatalogueHistory } from "@/generated/prisma/client";
import {
  getStaffBookCatalogueBookSelectArgs,
  getStaffBookCatalogueSelectArgs,
  getStaffBookCatalogueUserSelectArgs,
  GetStaffCatalogueBooksDTO,
} from "@/lib/types/DTO/bookCatalogue";
import { IBookCatalogueRepository } from "@/backend/repositories/bookCatalogue/IBookCatalogueRepository";
import { IBaseRepository } from "@/backend/repositories/IBaseRepository";

export class BookCatalogueService implements IBookCatalogueService {
  constructor(
    private readonly bookCatalogueRepository: IBookCatalogueRepository,
    private readonly bookCatalogueHistoryRepository: IBaseRepository<BookCatalogueHistory>,
    private readonly bookRepository: IBookCatalogueRepository,
  ) {}

  /**
   * Retrieves all books in catalogue
   * @returns all books in catalogue
   */
  async getAllCatalogueBooks(): Promise<BookCatalogue[]> {
    return this.bookCatalogueRepository.getAll();
  }

  /**
   * Retrieves books in catalogue with book and user details
   * @returns trimmed data of books in catalogue with book and user details
   */
  async getCatalogueBooksSummary(): Promise<GetStaffCatalogueBooksDTO[]> {
    return this.bookCatalogueRepository.getAllWithBookAndUserData(
      getStaffBookCatalogueSelectArgs,
      getStaffBookCatalogueBookSelectArgs,
      getStaffBookCatalogueUserSelectArgs,
    );
  }

  async getCatalogueBookById(id: number): Promise<BookCatalogue | null> {
    return this.bookCatalogueRepository.getById(id);
  }

  async deleteCatalogueBookById(id: number): Promise<void> {
    const deletedCatalogueBook = await this.bookCatalogueRepository.delete(id);
    if (!deletedCatalogueBook) {
      throw new Error(`Catalogue book with ID ${id} not found.`);
    }

    await this.logBookCatalogueChange(deletedCatalogueBook);

    const remainingBooks =
      await this.bookCatalogueRepository.getRemainingBooksByBookId(
        deletedCatalogueBook.book_id,
      );

    if (remainingBooks && remainingBooks.length === 0) {
      await this.bookRepository.delete(deletedCatalogueBook.book_id);
    }
  }

  async logBookCatalogueChange(data: BookCatalogue): Promise<void> {
    const {
      id,
      book_id,
      book_status_id,
      user_id,
      reserved_at,
      borrowed_at,
      returned_at,
      deleted_at,
    } = data;

    await this.bookCatalogueHistoryRepository.create({
      book_catalogue_id: id,
      book_id,
      book_status_id,
      user_id,
      reserved_at,
      borrowed_at,
      returned_at,
      deleted_at,
    });
  }
}

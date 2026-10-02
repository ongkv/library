import { IBookCatalogueService } from "./IBookCatalogueService";
import { BookCatalogue } from "@/generated/prisma/client";
import {
  getStaffBookCatalogueBookSelectArgs,
  getStaffBookCatalogueSelectArgs,
  getStaffBookCatalogueUserSelectArgs,
  GetStaffCatalogueBooksDTO,
} from "@/lib/types/DTO/bookCatalogue";
import { IBookCatalogueRepository } from "@/backend/repositories/bookCatalogue/IBookCatalogueRepository";

export class BookCatalogueService implements IBookCatalogueService {
  constructor(
    private readonly bookCatalogueRepository: IBookCatalogueRepository,
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
}

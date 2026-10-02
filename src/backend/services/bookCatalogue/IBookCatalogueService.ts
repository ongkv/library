import { BookCatalogue } from "@/generated/prisma/client";
import { GetStaffCatalogueBooksDTO } from "@/lib/types/DTO/bookCatalogue";

export interface IBookCatalogueService {
  getAllCatalogueBooks(): Promise<BookCatalogue[]>;
  getCatalogueBooksSummary(): Promise<GetStaffCatalogueBooksDTO[]>;
  getCatalogueBookById(id: number): Promise<BookCatalogue | null>;
  deleteCatalogueBookById(id: number): Promise<void>;
  logBookCatalogueChange(data: BookCatalogue): Promise<void>;
}

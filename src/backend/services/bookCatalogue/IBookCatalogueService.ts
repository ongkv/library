import { BookCatalogue } from "@/generated/prisma/client";
import { GetStaffCatalogueBooksDTO } from "@/lib/types/DTO/bookCatalogue";

export interface IBookCatalogueService {
  getAllCatalogueBooks(): Promise<BookCatalogue[]>;
  getCatalogueBooksSummary(): Promise<GetStaffCatalogueBooksDTO[]>;
}

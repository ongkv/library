import { PrismaBookCatalogueRepository } from "@/backend/repositories/bookCatalogue/PrismaBookCatalogueRepository";
import { BookCatalogueService } from "./BookCatalogueService";
import { PrismaBookCatalogueHistoryRepository } from "@/backend/repositories/bookCatalogueHistory/PrismaBookCatalogueHistoryRepository";
import { PrismaBookRepository } from "@/backend/repositories/book/PrismaBookRepository";

export function makeBookCatalogueService() {
  return new BookCatalogueService(
    new PrismaBookCatalogueRepository(),
    new PrismaBookCatalogueHistoryRepository(),
    new PrismaBookRepository(),
  );
}

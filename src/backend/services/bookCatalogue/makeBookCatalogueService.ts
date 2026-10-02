import { PrismaBookCatalogueRepository } from "@/backend/repositories/bookCatalogue/PrismaBookCatalogueRepository";
import { BookCatalogueService } from "./BookCatalogueService";
import { PrismaBookCatalogueHistoryRepository } from "@/backend/repositories/bookCatalogueHistory/PrismaBookCatalogueHistoryRepository";

export function makeBookCatalogueService() {
  return new BookCatalogueService(
    new PrismaBookCatalogueRepository(),
    new PrismaBookCatalogueHistoryRepository(),
    new PrismaBookCatalogueRepository(),
  );
}

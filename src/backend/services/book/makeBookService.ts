import { PrismaBookRepository } from "@/backend/repositories/book/PrismaBookRepository";
import { BookService } from "./BookService";
import { PrismaBookCatalogueRepository } from "@/backend/repositories/bookCatalogue/PrismaBookCatalogueRepository";
import { PrismaBookCatalogueHistoryRepository } from "@/backend/repositories/bookCatalogueHistory/PrismaBookCatalogueHistoryRepository";

export function makeBookService(): BookService {
  return new BookService(
    new PrismaBookRepository(),
    new PrismaBookCatalogueRepository(),
    new PrismaBookCatalogueHistoryRepository(),
  );
}

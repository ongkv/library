import { PrismaBookCatalogueRepository } from "@/backend/repositories/bookCatalogue/PrismaBookCatalogueRepository";
import { BookCatalogueService } from "./BookCatalogueService";

export function makeBookCatalogueService() {
  return new BookCatalogueService(new PrismaBookCatalogueRepository());
}

import { PrismaBookFormatRepository } from "@/backend/repositories/bookFormat/PrismaBookFormatRepository";
import { BookFormatService } from "./BookFormatService";

export function makeBookFormatService() {
  return new BookFormatService(new PrismaBookFormatRepository());
}

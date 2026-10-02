import { PrismaBookStatusRepository } from "@/backend/repositories/bookStatus/PrismaBookStatusRepository";
import { BookStatusService } from "./BookStatusService";

export function makeBookStatusService() {
  return new BookStatusService(new PrismaBookStatusRepository());
}

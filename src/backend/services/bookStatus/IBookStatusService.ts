import { BookStatus } from "@/generated/prisma/client";

export interface IBookStatusService {
  getBookStatusById(id: number): Promise<BookStatus | null>;
}

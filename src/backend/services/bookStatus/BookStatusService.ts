import { IBaseRepository } from "@/backend/repositories/IBaseRepository";
import { IBookStatusService } from "./IBookStatusService";
import { BookStatus } from "@/generated/prisma/client";

export class BookStatusService implements IBookStatusService {
  constructor(private bookStatusRepository: IBaseRepository<BookStatus>) {}

  async getBookStatusById(id: number): Promise<BookStatus | null> {
    return this.bookStatusRepository.getById(id);
  }
}

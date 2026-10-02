import { IBookFormatRepository } from "@/backend/repositories/bookFormat/IBookFormatRepository";
import { IBookFormatService } from "./IBookFormatService";
import { BookFormat } from "@/generated/prisma/client";

export class BookFormatService implements IBookFormatService {
  constructor(private readonly bookFormatRepository: IBookFormatRepository) {}

  async getBookFormatByName(name: string): Promise<BookFormat | null> {
    return this.bookFormatRepository.getByName(name);
  }
}

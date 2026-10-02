import { BookFormat } from "@/generated/prisma/client";
import { IBaseRepository } from "../IBaseRepository";

export interface IBookFormatRepository extends IBaseRepository<BookFormat> {
  getByName(name: string): Promise<BookFormat | null>;
}

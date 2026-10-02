import { Book } from "@/generated/prisma/client";
import { IBaseRepository } from "../IBaseRepository";

export interface IBookRepository extends IBaseRepository<Book> {
  getLatestNRows(
    n: number,
    selectArgs?: Partial<Record<keyof Book, boolean>>,
    includeDeleted?: boolean,
  ): Promise<Book[]>;
  getByISBN(isbn: string): Promise<Book | null>;
}

import { Book, BookCatalogue, User } from "@/generated/prisma/client";
import { IBaseRepository } from "../IBaseRepository";
import { BookCatalogueWithBookAndUser } from "@/lib/types/DTO/bookCatalogue";

export interface IBookCatalogueRepository extends IBaseRepository<BookCatalogue> {
  getAllWithBookAndUserData(
    selectArgs?: Partial<Record<keyof BookCatalogue, boolean>>,
    bookSelectArgs?: Partial<Record<keyof Book, boolean>>,
    userSelectArgs?: Partial<Record<keyof User, boolean>>,
    includeDeleted?: boolean,
  ): Promise<BookCatalogueWithBookAndUser[]>;
  getRemainingBooksByBookId(bookId: number): Promise<BookCatalogue[] | null>;
}

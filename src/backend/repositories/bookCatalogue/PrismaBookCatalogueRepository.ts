import { Book, BookCatalogue, User } from "@/generated/prisma/client";
import { prisma } from "@/backend/models/prisma-db";
import { IBookCatalogueRepository } from "./IBookCatalogueRepository";
import { BookCatalogueWithBookAndUser } from "@/lib/types/DTO/bookCatalogue";

export class PrismaBookCatalogueRepository implements IBookCatalogueRepository {
  async getAll(): Promise<BookCatalogue[]> {
    return prisma.bookCatalogue.findMany();
  }

  async getAllWithBookAndUserData(
    selectArgs?: Partial<Record<keyof BookCatalogue, boolean>>,
    bookSelectArgs?: Partial<Record<keyof Book, boolean>>,
    userSelectArgs?: Partial<Record<keyof User, boolean>>,
    includeDeleted: boolean = false,
  ): Promise<BookCatalogueWithBookAndUser[]> {
    return prisma.bookCatalogue.findMany({
      select: {
        ...selectArgs,
        book: {
          select: {
            ...bookSelectArgs,
          },
        },
        user: {
          select: {
            ...userSelectArgs,
          },
        },
      },
      where: {
        deleted_at: includeDeleted ? undefined : null,
      },
    });
  }

  async getRemainingBooksByBookId(
    bookId: number,
  ): Promise<BookCatalogue[] | null> {
    return prisma.bookCatalogue.findMany({
      where: {
        book_id: bookId,
        deleted_at: null,
      },
    });
  }

  async getById(id: number): Promise<BookCatalogue | null> {
    return prisma.bookCatalogue.findUnique({
      where: { id },
    });
  }

  async create({
    book_id,
    book_status_id,
  }: BookCatalogue): Promise<BookCatalogue> {
    return prisma.bookCatalogue.create({
      data: { book_id, book_status_id },
    });
  }

  async update({
    id,
    book_id,
    book_status_id,
    user_id,
    reserved_at,
    borrowed_at,
    return_by,
    returned_at,
  }: BookCatalogue): Promise<BookCatalogue> {
    return prisma.bookCatalogue.update({
      where: { id },
      data: {
        book_id,
        book_status_id,
        user_id,
        reserved_at,
        borrowed_at,
        return_by,
        returned_at,
      },
    });
  }

  async delete(id: number): Promise<BookCatalogue> {
    return prisma.bookCatalogue.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}

import { prisma } from "../../models/prisma-db";
import { Book } from "@/generated/prisma/client";
import { IBookRepository } from "./IBookRepository";

export class PrismaBookRepository implements IBookRepository {
  async getLatestNRows(
    n: number,
    selectArgs?: Partial<Record<keyof Book, boolean>>,
  ): Promise<Book[]> {
    return prisma.book.findMany({
      take: n,
      orderBy: [{ id: "desc" }],
      select: selectArgs,
    });
  }

  async getByISBN(isbn: string): Promise<Book | null> {
    return prisma.book.findUnique({
      where: { isbn },
    });
  }

  async getAll(): Promise<Book[]> {
    return prisma.book.findMany();
  }

  async getById(id: number): Promise<Book | null> {
    return prisma.book.findUnique({
      where: { id },
    });
  }

  async create({
    book_format_id,
    title,
    author,
    year,
    isbn,
    cover_img,
    description,
    page_count,
  }: Book): Promise<Book> {
    return prisma.book.create({
      data: {
        book_format_id,
        title,
        author,
        year,
        isbn,
        cover_img,
        description,
        page_count,
      },
    });
  }

  async update({
    id,
    book_format_id,
    title,
    author,
    year,
    isbn,
    cover_img,
    description,
    page_count,
  }: Book): Promise<Book> {
    return prisma.book.update({
      where: { id },
      data: {
        book_format_id,
        title,
        author,
        year,
        isbn,
        cover_img,
        description,
        page_count,
      },
    });
  }

  async delete(id: number): Promise<Book> {
    return prisma.book.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}

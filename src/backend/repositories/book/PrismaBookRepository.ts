import { prisma } from "../../models/prisma-db";
import { IBaseRepository } from "../IBaseRepository";
import { Book } from "@/generated/prisma/client";

export class PrismaBookRepository implements IBaseRepository<Book> {
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

import { BookStatus } from "@/generated/prisma/client";
import { IBaseRepository } from "../IBaseRepository";
import { prisma } from "@/backend/models/prisma-db";

export class PrismaBookStatusRepository implements IBaseRepository<BookStatus> {
  async getById(id: number): Promise<BookStatus | null> {
    return prisma.bookStatus.findUnique({
      where: { id },
    });
  }

  async getAll(): Promise<BookStatus[]> {
    return prisma.bookStatus.findMany();
  }

  async create(data: BookStatus): Promise<BookStatus> {
    return prisma.bookStatus.create({
      data,
    });
  }

  async update(data: Partial<BookStatus>): Promise<BookStatus> {
    if (!data.id) {
      throw new Error("ID is required for updating a BookStatus record.");
    }
    return prisma.bookStatus.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: number): Promise<BookStatus> {
    return prisma.bookStatus.delete({
      where: { id },
    });
  }
}

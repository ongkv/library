import { BookCatalogueHistory } from "@/generated/prisma/client";
import { IBaseRepository } from "../IBaseRepository";
import { prisma } from "@/backend/models/prisma-db";

export class PrismaBookCatalogueHistoryRepository implements IBaseRepository<BookCatalogueHistory> {
  async create(data: BookCatalogueHistory): Promise<BookCatalogueHistory> {
    return prisma.bookCatalogueHistory.create({
      data,
    });
  }

  async getAll(): Promise<BookCatalogueHistory[]> {
    return prisma.bookCatalogueHistory.findMany();
  }

  async getById(id: number): Promise<BookCatalogueHistory | null> {
    return prisma.bookCatalogueHistory.findUnique({
      where: { id },
    });
  }

  async update(
    data: Partial<BookCatalogueHistory>,
  ): Promise<BookCatalogueHistory> {
    if (!data.id) {
      throw new Error(
        "ID is required for updating a BookCatalogueHistory record.",
      );
    }
    return prisma.bookCatalogueHistory.update({
      where: { id: data.id },
      data,
    });
  }

  async delete(id: number): Promise<BookCatalogueHistory> {
    return prisma.bookCatalogueHistory.delete({
      where: { id },
    });
  }
}

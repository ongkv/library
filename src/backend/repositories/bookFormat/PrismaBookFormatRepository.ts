import { prisma } from "../../models/prisma-db";
import { IBaseRepository } from "../IBaseRepository";
import { BookFormat } from "@/generated/prisma/client";

export class PrismaBookFormatRepository implements IBaseRepository<BookFormat> {
  async getAll(): Promise<BookFormat[]> {
    return prisma.bookFormat.findMany();
  }

  async getById(id: number): Promise<BookFormat | null> {
    return prisma.bookFormat.findUnique({
      where: { id },
    });
  }

  async create({ name }: BookFormat): Promise<BookFormat> {
    return prisma.bookFormat.create({
      data: { name },
    });
  }

  async update({ id, name }: BookFormat): Promise<BookFormat> {
    return prisma.bookFormat.update({
      where: { id },
      data: { name },
    });
  }

  async delete(id: number): Promise<BookFormat> {
    return prisma.bookFormat.delete({
      where: { id },
    });
  }
}

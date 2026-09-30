import { UserModel } from "@/generated/prisma/models";
import { prisma } from "../../models/prisma-db";
import { IBaseRepository } from "../IBaseRepository";

export class PrismaUserRepository implements IBaseRepository<UserModel> {
  async getAll(): Promise<UserModel[]> {
    return prisma.user.findMany();
  }

  async getById(id: number): Promise<UserModel | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async create({
    f_name,
    l_name,
    email,
    phone,
    password,
    address,
  }: UserModel): Promise<UserModel> {
    return prisma.user.create({
      data: { f_name, l_name, email, phone, password, address },
    });
  }

  async update({
    id,
    f_name,
    l_name,
    email,
    phone,
    password,
    address,
  }: UserModel): Promise<UserModel> {
    return prisma.user.update({
      where: { id },
      data: { f_name, l_name, email, phone, password, address },
    });
  }

  async delete(id: number): Promise<UserModel> {
    return prisma.user.delete({
      where: { id },
    });
  }
}

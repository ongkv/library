import { User } from "@/generated/prisma/client";

export interface IUserService {
  getUserById(id: number): Promise<User | null>;
}

import { PrismaUserRepository } from "@/backend/repositories/user/PrismaUserRepository";
import { UserService } from "./UserService";

export function makeUserService() {
  return new UserService(new PrismaUserRepository());
}

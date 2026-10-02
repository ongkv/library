import { IBaseRepository } from "@/backend/repositories/IBaseRepository";
import { IUserService } from "./IUserService";
import { User } from "@/generated/prisma/client";

export class UserService implements IUserService {
  constructor(private userRepository: IBaseRepository<User>) {}

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.getById(id);
  }
}

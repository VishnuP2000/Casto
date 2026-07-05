import { IUser } from "../../../models/userModel";
import { IBaseRepository } from "../base.IRepository";

export interface IUserRepository extends IBaseRepository<IUser> {
      findUserByEmail(email: string): Promise<IUser |null | never>;
      create(data: Partial<IUser>): Promise<IUser>;
}
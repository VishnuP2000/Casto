import Container, { Service } from "typedi";
import { IUser, userModel } from "../../models/userModel";
import { BaseRepository } from "../base.repository";
import { IUserRepository } from "../interface/user/user.Irepository";
import { HttpStatus } from "../../enum/httpStatus";

@Service()
export class UserRepository extends BaseRepository<IUser>  implements IUserRepository{

   constructor(){
      super(userModel) // super() using for call constructor of parant class
   }
      
    async findUserByEmail(email: string): Promise<IUser|null> {
         try {
            console.log('email',email)
           const user = await userModel.findOne({email})
           return user
      } catch (error) {
               console.log('error',error)
            throw new Error("Unknown error occurred in create");
         }
     }
//     async create(data: Partial<IUser>): Promise<IUser> {
//   try {
//     const user = await this.create(data)
//     return user;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Database Error (create): ${error.message}`);
//     }
//     throw new Error("Unknown error occurred in create");
//   }
// }
}
export const userRepository = Container.get(UserRepository)
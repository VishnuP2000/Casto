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
     async findById (userId:string):Promise<IUser |null > {
      try {
         console.log('enter the findById',userId)
         const user = await this.findById(userId)
         return user
      } catch (error) {
         console.log('findById error in repository',error)
          throw new Error("Unknown error occurred in create");

      }
     }
}
export const userRepository = Container.get(UserRepository)
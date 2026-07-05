import { Document, Model, Types } from "mongoose";
import { IUser } from "../models/userModel";
import { IBaseRepository } from "./interface/base.IRepository";

//abstract make a common class, then we can use the common class in every class
export abstract class BaseRepository<T extends Document>implements IBaseRepository<T>{
          protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async save(user: IUser): Promise<IUser> {
    return await user.save();
  }

  async findAll(): Promise<T[]> {
    try {
      return await this.model.find().exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Database Error (findAll): ${error.message}`);
      }
      throw new Error("Unknown error occurred in findAll");
    }
  }

  async findById(id: string): Promise<T | null> {
    try {
      console.log('base findById')
      const result = await this.model.findById(id).exec();
      if (!result) throw new Error(`No record found with ID: ${id}`);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Database Error (findById): ${error.message}`);
      }
      throw new Error("Unknown error occurred in findById");
    }
  }

  async create(data: Partial<T>): Promise<T> {
    try {
      
      let d =  await this.model.create(data);
      console.log(d)
      return d
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Database Error (create): ${error.message}`);
      }
      throw new Error("Unknown error occurred in create");
    }
  }

  async updateData(id: string, data: Partial<T>): Promise<T | null> {
    try {
      const updatedRecord = await this.model
        .findByIdAndUpdate(id, data, { new: true })
        .exec();
      if (!updatedRecord)
        throw new Error(`Update failed: No record found with ID: ${id}`);
      return updatedRecord;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Database Error (update): ${error.message}`);
      }
      throw new Error("Unknown error occurred in update");
    }
  }

async updateById(id: Types.ObjectId,update: Record<string, any>): Promise<T | null> {
  return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
}

  async deleteData(id: string): Promise<boolean> {
    try {
      const deletedRecord = await this.model.findByIdAndDelete(id).exec();
      if (!deletedRecord)
        throw new Error(`Delete failed: No record found with ID: ${id}`);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Database Error (delete): ${error.message}`);
      }
      throw new Error("Unknown error occurred in delete");
    }
  }
}
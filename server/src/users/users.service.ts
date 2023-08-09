import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async getOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
  async create(userDto: CreateUserDto): Promise<User> {
    const newRecipient = new this.userModel(userDto);
    return newRecipient.save();
  }
  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id);
  }
  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });
  }
}
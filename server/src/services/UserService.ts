import { Service } from "typedi";
import { ERRORS } from "../enums/error";
import { User, UserModel } from "../entities/User";
import { Ref } from "../types";

@Service()
export class UserService {
  async createUser(email: String, password: String): Promise<Ref<User>> {
    if (email === '' || password === '') {
      throw new Error(ERRORS.INVALID_SIGNUP_DATA);
    }
    const user = new UserModel({ email, password });
    const existingUser = await UserModel.findOne({ email }); 
    if (existingUser) {
      throw new Error(ERRORS.EMAIL_IN_USE);
    }
    return user.save();
  }
}
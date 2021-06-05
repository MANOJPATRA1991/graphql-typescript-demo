import { Field, InputType } from "type-graphql";
import { User } from "../../entities/User";

@InputType()
export class AuthUser implements Partial<User> { 
  @Field()
  email: String;

  @Field()
  password: string;
}
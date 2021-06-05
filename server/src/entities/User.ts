import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop as Property, pre, DocumentType } from "@typegoose/typegoose";
import { __Type } from "graphql";
import { NextFunction } from "express";
import { genSalt, hash, compare } from 'bcrypt';

@ObjectType({ description: "The user model" })
@pre<User>('save', function (next: NextFunction) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  genSalt(10, (err: Error, salt: string) => {
    if (err) return next(err);
    hash(user.password, salt, (err: Error, hash: string) => {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
})
export class User {
  @Field(type => ID)
  id: String;

  @Field()
  @Property()
  email: String;

  @Property()
  password: string;

  comparePassword(this: DocumentType<User>, candidatePassword: string): Promise<boolean> {
    return compare(candidatePassword, this.password);
  }
}

export const UserModel = getModelForClass(User);

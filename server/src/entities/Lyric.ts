import { Field, ID, Int, ObjectType } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";
import { __Type } from "graphql";
import { Song } from "./Song";
import { Ref } from "../types";

@ObjectType({ description: "The lyrics model"})
export class Lyric {
  @Field(type => ID)
  id: String;

  @Field(type => Int, { defaultValue: 0 })
  @Property({ default: 0 })
  likes: number;

  @Field()
  @Property()
  content: String;

  @Field(type => Song)
  @Property({ ref: () => Song })
  song: Ref<Song>;
  _doc: any;
}

export const LyricModel = getModelForClass(Lyric);
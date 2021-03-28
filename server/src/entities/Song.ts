import { Field, ID, ObjectType } from "type-graphql";
import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { __Type } from "graphql";
import { Lyric } from "./Lyric";
import { Ref } from "../types";

@ObjectType({ description: "The song model" })
export class Song {
  @Field(type => ID)
  id: String;

  @Field()
  @Property()
  title: String;

  @Field(type => [Lyric])
  @Property({ ref: "Lyric", required: true, default: [] })
  lyrics: Ref<Lyric>[];
  _doc: any;
}

export const SongModel = getModelForClass(Song);
import { Field, ID, InputType } from "type-graphql";
import { Song } from "../../entities/Song";

@InputType()
export class AddLyricsToSong implements Partial<Song> {
  @Field(() => ID)
  id: String;
  
  @Field()
  content: String;
}
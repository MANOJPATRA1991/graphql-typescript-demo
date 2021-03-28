import { Query, Arg, FieldResolver, Resolver, Root, Mutation, Args } from "type-graphql";
import { Service } from "typedi";
import { Lyric } from "../entities/Lyric";
import { Song } from "../entities/Song";
import { SongService } from "../services/SongService";
import { Ref } from "../types";
import { AddLyricsToSong } from "./types/AddLyricsToSong";

@Service()
@Resolver(of => Song)
export class SongResolver {
  constructor(
    private readonly songService: SongService,
  ) { }

  @Query(returns => Song)
  song(@Arg("id") id: String): Promise<Ref<Song> | null> {
    return this.songService.getSong(id);
  }

  @FieldResolver(returns => [Lyric])
  lyrics(@Root() data: Song): Promise<void | Ref<Lyric>[] | undefined> {
    return this.songService.findLyrics(data._doc._id);
  }

  @Mutation(() => Song)
  addSong(@Arg("title") title: String): Promise<Ref<Song>> {
    return this.songService.addSong(title);
  }

  @Mutation(() => Song)
  addLyricsToSong(@Arg("data") { id, content}: AddLyricsToSong): Promise<Ref<Song> | undefined> {
    return this.songService.addLyric(id, content);
  }

  @Mutation(() => Song)
  deleteSong(@Arg("id") id: String) {
    return this.songService.deleteSong(id);
  }
}
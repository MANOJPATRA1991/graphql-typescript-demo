import { Query, Arg, FieldResolver, Resolver, Root, Mutation } from "type-graphql";
import { Service } from "typedi";
import { Lyric } from "../entities/Lyric";
import { Song } from "../entities/Song";
import { LyricService } from "../services/LyricService";
import { Ref } from "../types";

@Service()
@Resolver(of => Lyric)
export class LyricResolver {
  constructor(
    private readonly lyricService: LyricService,
  ) { }
  
  @Query(returns => Lyric)
  async lyric(@Arg("id") id: String): Promise<Ref<Lyric> | null> {
    return this.lyricService.getLyric(id);
  }

  @FieldResolver(returns => Song)
  song(@Root() data: Lyric): Promise<Ref<Song> | undefined> {
    return this.lyricService.findSong(data._doc._id);
  }

  @Mutation(() => Lyric)
  likeLyric(@Arg("id") id: String): Promise<Ref<Lyric> | undefined> {
    return this.lyricService.likeLyric(id);
  }
}
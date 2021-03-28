import { DocumentType } from "@typegoose/typegoose";
import { Service } from "typedi";
import { Lyric, LyricModel } from "../entities/Lyric";
import { Song } from "../entities/Song";
import { Ref } from "../types";

@Service()
export class LyricService {
  getLyric(lyricId: String): Promise<Ref<Lyric> | null> {
    return LyricModel
      .findById({ _id: lyricId })
      .then(lyric => lyric);
  }

  findSong(lyricId: String): Promise<Ref<Song> | undefined> {
    return LyricModel
      .findById({ _id: lyricId })
      .populate('song')
      .then(lyric => lyric?.song);
  }

  likeLyric(lyricId: String): Promise<Ref<Lyric> | undefined> {
    return LyricModel
      .findById({ _id: lyricId  })
      .then(lyric => {
        if (!!lyric) {
          ++lyric.likes;
        }
        return lyric?.save();
      })
  }
}
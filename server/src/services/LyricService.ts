import { DocumentType } from "@typegoose/typegoose";
import { Service } from "typedi";
import { Lyric, LyricModel } from "../entities/Lyric";
import { Song } from "../entities/Song";
import { Ref } from "../types";

@Service()
export class LyricService {
  async getLyric(lyricId: String): Promise<Ref<Lyric> | null> {
    const lyric = await LyricModel.findById({ _id: lyricId });
    return lyric;
  }

  async findSong(lyricId: String): Promise<Ref<Song> | undefined> {
    const lyric = await LyricModel
      .findById({ _id: lyricId })
      .populate('song');
    return lyric?.song;
  }

  async likeLyric(lyricId: String): Promise<Ref<Lyric> | undefined> {
    const lyric = await LyricModel.findById({ _id: lyricId });
    if (!!lyric) {
      ++lyric.likes;
    }
    return lyric?.save();
  }
}
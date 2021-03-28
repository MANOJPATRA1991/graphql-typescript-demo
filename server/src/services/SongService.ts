import { Service } from "typedi";
import { Lyric, LyricModel } from "../entities/Lyric";
import { Song, SongModel } from "../entities/Song";
import { Ref } from "../types";

@Service()
export class SongService {
  getSong(song_id: String): Promise<Ref<Song> | null> {
    return SongModel
      .findById({ _id: song_id })
      .then(song => song);
  }

  findLyrics(songId: String): Promise<Ref<Lyric>[] | undefined> {
    return SongModel
      .findById({ _id: songId })
      .populate('lyrics')
      .then(song =>  song?.lyrics);
  }

  addSong(title: String): Promise<Ref<Song>> {
    return (new SongModel({ title })).save();
  }

  addLyric(songId: String, content: String): Promise<Ref<Song> | undefined> {
    return SongModel
      .findById({ _id: songId })
      .then(song => {
        const lyric = new LyricModel({ content, song });
        song?.lyrics.push(lyric);
        return Promise.all([lyric.save(), song?.save()])
          .then(([lyric, song]) => song);
      });
  }
  
  deleteSong(songId: String) {
    return SongModel.remove({ _id: songId });
  }
}
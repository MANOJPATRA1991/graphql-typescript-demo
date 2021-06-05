import { Service } from "typedi";
import { Lyric, LyricModel } from "../entities/Lyric";
import { Song, SongModel } from "../entities/Song";
import { Ref } from "../types";

@Service()
export class SongService {
  async getAllSongs(): Promise<Ref<Song>[] | undefined> {
    const songs = await SongModel
      .find({});
    return songs;
  }
  
  async getSong(song_id: String): Promise<Ref<Song> | null> {
    const song = await SongModel.findById({ _id: song_id });
    return song;
  }

  async findLyrics(songId: String): Promise<Ref<Lyric>[] | undefined> {
    const song = await SongModel
      .findById({ _id: songId })
      .populate('lyrics');
    return song?.lyrics;
  }

  addSong(title: String): Promise<Ref<Song>> {
    return (new SongModel({ title })).save();
  }

  async addLyric(songId: String, content: String): Promise<Ref<Song> | undefined> {
    const song = await SongModel.findById({ _id: songId });
    const lyric = new LyricModel({ content, song });
    song?.lyrics.push(lyric);
    const [lyric_1, song_1] = await Promise.all([
      lyric.save(),
      song?.save()
    ]);
    return song_1;
  }
  
  deleteSong(songId: String) {
    return SongModel.findByIdAndRemove(songId);
  }
}
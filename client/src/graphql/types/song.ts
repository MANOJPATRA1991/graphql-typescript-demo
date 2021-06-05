import { Lyric } from "./lyric";

export interface Song {
  id: string;
  lyrics: Lyric[];
  title: string;
}

export interface SongsData {
  songs: Song[];
}
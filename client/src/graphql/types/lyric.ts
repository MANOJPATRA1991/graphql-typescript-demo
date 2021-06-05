import { Song } from "./song";

export interface Lyric {
  content: string;
  id: string;
  likes: number;
  song: Song;
}

export interface AddLyricVars {
  id: string;
  content: string;
}
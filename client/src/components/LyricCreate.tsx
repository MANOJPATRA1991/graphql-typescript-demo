import { useMutation } from '@apollo/client';
import React, { FormEvent, useEffect, useState } from 'react';
import { ADD_LYRIC_TO_SONG } from '../graphql/mutations/lyric';
import { AddLyricVars } from '../graphql/types/lyric';
import { Song } from '../graphql/types/song';

export const LyricCreate = ({ songId }: { songId: string }) => {
  const [lyric, setLyric] = useState('');

  const [addLyricToSongFn] = useMutation<
    { addLyricToSong: Song },
    { data: AddLyricVars }
  >(ADD_LYRIC_TO_SONG, {
    variables: { 
      data: { 
        id: songId, 
        content: lyric 
      }
    }
  });

  function onsubmit(event: FormEvent) {
    event.preventDefault();
    lyric && addLyricToSongFn().then(() => setLyric(''));
  }

  return (
    <form onSubmit={(e) => onsubmit(e)}>
      <label>Add a lyric</label>
      <input
        name="lyric"
        value={lyric}
        onChange={event => setLyric(event.target.value)}
      />
    </form>
  );
}
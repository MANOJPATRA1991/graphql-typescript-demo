import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import { Song } from '../graphql/types/song';
import { ADD_SONG } from '../graphql/mutations/song';
import { GET_SONG_TITLES } from '../graphql/queries/song';

export const SongCreate = () => {
  const [title, setTitle] = useState('');

  const history = useHistory();
  
  const [addSongFn] = useMutation<
    { addSongFn: Song },
    { title: String }
  >(ADD_SONG, {
    variables: { title },
    refetchQueries: [{ 
      query: GET_SONG_TITLES 
    }]
  });

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    title && addSongFn().then(() => history.push("/songs"));
  }

  return (
    <div>
      <Link to="/songs">
        Back
      </Link>
      <h3>Create a new song</h3>
      <form onSubmit={e => onSubmit(e)}>
        <label>Song Title: </label>
        <input 
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </form>
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_SONG_TITLES } from '../graphql/queries/song';
import { Song, SongsData } from '../graphql/types/song';
import { DELETE_SONG } from '../graphql/mutations/song';

export const SongList = () => {
  const [deleteId, selectIdToDelete] = useState<string | null>(null);
  
  const  { loading, error, data, refetch } = useQuery<SongsData>(GET_SONG_TITLES);
  
  const [deleteSongFn, { error: responseError, data: responseData }] = useMutation<
    { deleteSongFn: Song },
    { id: string | null }
  >(DELETE_SONG, {
    variables: { id: deleteId }
  });

  function onSongDelete(id: string) {
    selectIdToDelete(id);
  }

  // When a song id is set to be deleted
  useEffect(() => {
    deleteId && deleteSongFn().then(() => refetch());
  }, [deleteId]);
  
  if (loading || error) return null;

  return (
    <>
      <ul className="collection">
        {data?.songs.map(({ id, title }: Song) => (
          <li className="collection-item" key={`song-${id}`}>
            <Link to={`/songs/${id}`}>{title}</Link>
            <i 
              className="material-icons"
              onClick={() => onSongDelete(id)}
            >delete</i>
          </li>
        ))}
      </ul>
      <Link to="/songs/new">
        <button 
          className="btn-floating btn-large waves-effect waves-light red right"
        >
          <i className="material-icons">add</i>
        </button>
      </Link>
    </>
  );
};
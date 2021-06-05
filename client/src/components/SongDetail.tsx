import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_SONG_BY_ID } from '../graphql/queries/song';
import { Song } from '../graphql/types/song';
import { LyricCreate } from './LyricCreate';
import { LyricList } from './LyricList';

export const SongDetail = (props: any) => {
  const { id } = props.match.params as { id: string };

  const  { loading: loadingStatus, error: responseError, data: responseData } = useQuery<
    { song: Song }, 
    { id: String }
  >(GET_SONG_BY_ID, {
    variables: { id },
  });

  if (loadingStatus || responseError) return null;

  return (
    <div>
      <Link to="/songs">
        Back
      </Link>
      <h3>{responseData?.song?.title}</h3>
      <LyricList lyrics={responseData?.song.lyrics} />
      <LyricCreate songId={id} />
    </div>
  );
}
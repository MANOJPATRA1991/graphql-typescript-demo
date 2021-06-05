import { gql } from '@apollo/client';

export const GET_SONG_TITLES = gql`
  query GetSongTitles {
    songs {
      id
      title
    }
  }
`;

export const GET_SONG_BY_ID = gql`
  query GetSongById($id: String!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        likes
        content
      }
    }
  }
`;

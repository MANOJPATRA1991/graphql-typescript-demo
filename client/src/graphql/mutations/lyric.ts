import { gql } from "@apollo/client";

gql`
input AddLyricsToSong {
  id: ID!
  content: String!
}
`

export const ADD_LYRIC_TO_SONG = gql`
  mutation AddLyricToSong($data: AddLyricsToSong!) {
    addLyricsToSong(data: $data) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

export const LIKE_LYRIC = gql`
  mutation LikeLyric($id: String!) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;
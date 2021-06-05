import { useMutation } from '@apollo/client';
import React from 'react';
import { LIKE_LYRIC } from '../graphql/mutations/lyric';
import { Lyric } from '../graphql/types/lyric';

export const LyricList = ({ lyrics }: { lyrics: Lyric[] | undefined }) => {
  const [likeLyricFn] = useMutation<
    { likeLyricFn: Partial<Lyric> },
    { id: string }
  >(LIKE_LYRIC);

  function onLike(lyricId: string, likes: number) {
    likeLyricFn({ 
      variables: { id: lyricId },
      // Updates the UI before the actual results arrive
      optimisticResponse: () => ({
        __typename: "Mutation",
        likeLyricFn: {
          id: lyricId,
          __typename: "Lyric",
          likes: likes + 1
        } 
      })
    });
  }
  
  return (
    <ul className="collection">
      {(lyrics || []).map(({ id, content, likes }: Lyric) => (
        <li key={id} className="collection-item">
          {content}
          <span className="like-box">
            <i 
              className="material-icons"
              onClick={() => onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </span>
        </li>
      ))} 
    </ul>
  );
};
import { albumsResolver } from './resolvers/albumsResolver';
import { artistResolver } from './resolvers/artistResolver';
import { categoriesResolver } from './resolvers/categoriesResolver';
import { createSongResolver } from './resolvers/createSongResolver';
import { songResolver } from './resolvers/songResolver';
import { songsResolver } from './resolvers/songsResolver';

/**
 * A collection of the resolvers used in the Apollo Server.
 */
export const resolvers = {
  Query: {
    artists: artistResolver,
    songs: songsResolver,
    albums: albumsResolver,
    song: songResolver,
    categories: categoriesResolver,
  },
  Mutation: {
    createSong: createSongResolver,
  },
};

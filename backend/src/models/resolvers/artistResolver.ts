import { Artists } from '../Music';
import { ArtistsInput, ArtistsSearch } from './types';

/**
 * Resolver for artists query. Returns a list of artists.
 */
export const artistResolver = async (_, args: ArtistsInput) => {
  const limit = args.limit || Math.min(args.limit || 50, 50);
  const offset: number = args.offset || 0;
  let search: ArtistsSearch = {};
  if (args.id) {
    search = { ...search, _id: args.id };
  }
  if (args.name) {
    search = {
      ...search,
      name: RegExp(args.name, 'i'),
    };
  }
  return await Artists.find(search).limit(limit).skip(offset);
};

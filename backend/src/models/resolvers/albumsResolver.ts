import { Albums } from '../Music';
import { AlbumsInput, AlbumsSearch } from './types';

/**
 * Resolver for albums query. Returns a list of albums.
 */
export const albumsResolver = async (_, args: AlbumsInput) => {
  const limit = args.limit || Math.min(args.limit || 50, 50);
  const offset: number = args.offset || 0;
  let search: AlbumsSearch = {};
  if (args.id) {
    search = { ...search, _id: args.id };
  }
  if (args.title) {
    search = {
      ...search,
      title: RegExp(args.title, 'i'),
    };
  }
  if (args.artist) {
    search = { ...search, artists: args.artist };
  }
  return await Albums.find(search)
    .limit(limit)
    .skip(offset)
    .populate('artists');
};

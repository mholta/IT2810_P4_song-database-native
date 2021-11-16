import { Songs } from '../Music';

/**
 * Resolver for song query. Returns a song.
 */
export const songResolver = async (_, args: { id: String }) => {
  return await Songs.findById(args.id)
    .populate({ path: 'album', populate: { path: 'artists' } })
    .populate('artists')
    .populate('categories');
};

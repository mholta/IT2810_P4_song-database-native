import { Songs } from '../Music';
import {
  SongsInput,
  SongsSearch,
  SongsSearchArtist,
  SongsSearchSongs,
  Sorting,
  SortOrder,
  SortOrderToDB,
  SortType,
} from './types';

/**
 * Resolver for songs query. Returns a list of songs.
 */
export const songsResolver = async (_, args: SongsInput) => {
  const limit = args.limit || Math.min(args.limit || 50, 50);
  const categories: string[] = (args.filter && args.filter.categories) || [];

  let initialSorting: Sorting = {
    sortType: SortType.RELEASE_DATE,
    order: SortOrder.DESC,
  };
  let search: SongsSearch = {};
  enum textScore {
    textScore = 'textScore',
  }
  type Score = 1 | { $meta: textScore };

  // dummy score
  let setScore: Score = 1;
  if (args.searchString) {
    search = { $text: { $search: args.searchString } };
    setScore = { $meta: textScore.textScore };
    initialSorting.order = SortOrder.BEST;
    initialSorting.sortType = SortType.SCORE;
  }
  let searchSongs: SongsSearchSongs = {};
  let searchArtist: SongsSearchArtist = {};
  if (args.filter && args.filter.contributor) {
    searchSongs = {
      $or: [
        { writers: args.filter.contributor },
        { producers: args.filter.contributor },
      ],
    };
    searchArtist = { name: args.filter.contributor };
  }

  const sorting: Sorting = args.sorting || initialSorting;
  const sort = {
    [sorting.sortType]: SortOrderToDB(sorting.order),
    _id: 1,
  };
  let categoryFilter = {};
  if (categories.length > 0) {
    categoryFilter = { categories: { $in: categories } };
  }

  const page = args.page - 1 || 0;
  const songs = await Songs.aggregate([
    // search in songs
    { $match: { $and: [search, searchSongs] } },
    { $set: { score: setScore } },
    // union with artists and search in them too
    {
      $unionWith: {
        coll: 'artists',
        pipeline: [
          { $match: { $and: [search, searchArtist] } },

          { $set: { score: setScore } },
          {
            $lookup: {
              from: 'songs',
              localField: '_id',
              foreignField: 'artists',
              as: 'singsIn',
            },
          },
          { $unwind: '$singsIn' },
          {
            $replaceRoot: {
              newRoot: { $mergeObjects: ['$singsIn', { score: '$score' }] },
            },
          },
        ],
      },
    },
    // union with albums and search in them too
    {
      $unionWith: {
        coll: 'albums',
        pipeline: [
          // use seachSongs to so that we do not search in albums when searching for person
          { $match: { $and: [search, searchSongs] } },
          { $set: { score: setScore } },
          {
            $lookup: {
              from: 'songs',
              localField: '_id',
              foreignField: 'album',
              as: 'singsIn',
            },
          },
          { $unwind: '$singsIn' },
          {
            $replaceRoot: {
              newRoot: { $mergeObjects: ['$singsIn', { score: '$score' }] },
            },
          },
        ],
      },
    },
    // filter on category if categories inputed
    {
      $match: categoryFilter,
    },
    // "poplate" artists in song
    {
      $lookup: {
        from: 'artists',
        localField: 'artists',
        foreignField: '_id',
        as: 'artists',
      },
    },
    // "populate" album in song
    {
      $lookup: {
        from: 'albums',
        localField: 'album',
        foreignField: '_id',
        pipeline: [
          {
            // "poplate" artists in album
            $lookup: {
              from: 'artists',
              localField: 'artists',
              foreignField: '_id',

              as: 'artists',
            },
          },
        ],
        as: 'album',
      },
    },
    // unwind album as a song does not have multiple albums
    { $unwind: '$album' },

    // to keep all data but remove duplicates
    {
      $group: {
        _id: '$_id',
        song: { $first: '$$ROOT' },
        // to score results with sum of scores in artist-name, album-title and song-title
        score: { $sum: '$score' },
      },
    },
    { $replaceRoot: { newRoot: '$song' } },

    // populate categories
    {
      $lookup: {
        from: 'categories',
        localField: 'categories',
        foreignField: '_id',

        as: 'categories',
      },
    },
    // to get number of pages in the search
    {
      $facet: {
        songs: [{ $sort: sort }, { $skip: limit * page }, { $limit: limit }],
        count: [{ $group: { _id: null, count: { $sum: 1 } } }],
      },
    },
  ]);
  if (songs[0].count.length === 0) {
    songs[0].pages = 0;
  } else {
    songs[0].pages = Math.ceil(songs[0].count[0].count / limit);
  }
  return songs[0];
};

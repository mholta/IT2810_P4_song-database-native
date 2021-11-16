import { Albums, Artists, Categories, Songs } from '../Music';
import { makeSlug, MutationSongsInput } from './types';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import isImage from 'is-image';
import { UserInputError } from 'apollo-server-errors';

/**
 * Resolver for createSong mutation. Returns id and title of created song.
 */
export const createSongResolver = async (_, args: MutationSongsInput) => {
  // to throw error if artist doesnt exist
  const releaseDate = new Date(args.releaseDate);
  const artistsInDB = await Artists.countDocuments({
    _id: { $in: args.artists },
  });
  if (artistsInDB !== args.artists.length) {
    throw new UserInputError(
      'Some or one of the artists not referencing an arist'
    );
  }
  const categoriesInDB = await Categories.countDocuments({
    _id: { $in: args.categories || [] },
  });
  if (args.categories && categoriesInDB !== args.categories.length) {
    throw new UserInputError(
      'Some or one of the categories not referencing a category'
    );
  }
  const albumSlug = makeSlug(args.album + '-' + args.artists[0]);
  let stream: fs.ReadStream,
    pathNameBig: string,
    pathNameSmall: string,
    smallImg: sharp.Sharp,
    biggerImg: sharp.Sharp;
  let addFile = false;
  if (args.file && args.album !== albumSlug) {
    addFile = true;
    const { createReadStream, filename } = await args.file;
    if (!isImage(filename)) {
      throw new UserInputError('File is not an image');
    }
    const { ext } = path.parse(filename);
    const fileEndpointName =
      makeSlug(args.album) +
      '-' +
      makeSlug(args.artists[0]) +
      '-' +
      releaseDate.getFullYear();
    stream = createReadStream();
    pathNameSmall = `/var/www/html/project3/public/images/${
      fileEndpointName + '-small' + ext
    }`;
    pathNameBig = `/var/www/html/project3/public/images/${
      fileEndpointName + ext
    }`;
    smallImg = sharp().resize({ width: 200, height: 200, fit: 'cover' });
    biggerImg = sharp().resize({ width: 600, height: 600, fit: 'cover' });
    if (!args.albumReleaseDate) {
      throw new UserInputError('Album must have an releaseDate');
    }
    const album = new Albums({
      _id: albumSlug,
      title: args.album,
      artists: args.artists,
      releaseDate: args.albumReleaseDate,
      picture:
        'http://it2810-21.idi.ntnu.no/project3/public/images/' +
        fileEndpointName +
        ext,
    });
    args.album = albumSlug;
    await album.save();
    delete args.albumReleaseDate;
  } else if ((await Albums.findById(args.album)) === null) {
    throw new UserInputError('A new album must have an image');
  }

  const slug = makeSlug(args.title) + '-' + args.artists[0];
  args._id = slug;
  for (const key in args) {
    if (
      ['', undefined, null].includes(args[key]) ||
      (Array.isArray(args[key]) && args[key].length === 0)
    ) {
      delete args[key];
    }
  }
  const song = new Songs(args);
  const songToBePopulated = await song.save();
  if (addFile) {
    stream.pipe(smallImg).pipe(fs.createWriteStream(pathNameSmall));
    stream.pipe(biggerImg).pipe(fs.createWriteStream(pathNameBig));
  }
  return await songToBePopulated.populate([
    {
      path: 'album',
      populate: { path: 'artists' },
    },
    { path: 'artists' },
  ]);
};

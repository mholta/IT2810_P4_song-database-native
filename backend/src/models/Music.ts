import { Document, model, Model, Schema } from "mongoose";

/**
 * Schemas for how we should fetch data from MongoDB database.
 */
const ArtistSchema = new Schema({
  _id: String,
  name: String,
  location: String,
  affilation: String,
  webpage: String,
  instagram: String,
  iTunes: String,
  youtube: String,
  spotify: String,
  picture: String,
});
ArtistSchema.index({ name: "text" });

const AlbumSchema = new Schema({
  _id: String,
  title: String,
  artists: [{ type: String, ref: "Artists" }],
  iTunes: String,
  picture: String,
  producers: { type: [String], default: undefined },
  publisher: String,
  releaseDate: Date,
  spotify: String,
});
AlbumSchema.index({ title: "text" });

const SongSchema = new Schema({
  _id: String,
  album: { type: String, ref: "Albums" },
  artists: [{ type: String, ref: "Artists" }],
  contributors: { type: [String], default: undefined },
  iTunes: String,
  key: String,
  producers: { type: [String], default: undefined },
  releaseDate: Date,
  spotify: String,
  tempo: String,
  time: String,
  title: String,
  writers: { type: [String], default: undefined },
  categories: [{ type: String, ref: "Categories" }],
});
SongSchema.index({ title: "text" });

const CategorySchema = new Schema({
  _id: String,
  title: String,
});

/**
 * Interfaces for what the documents look like in the MongoDB database.
 */
export interface Album extends Document {
  _id: string;
  title: string;
  artists: string[];
  iTunes: string;
  picture: string;
  producers: string[];
  publisher: string;
  releaseDate: Date;
  spotify: string;
}

export interface Artist extends Document {
  _id: string;
  name: string;
  location: string;
  affilation: string;
  webpage: string;
  instagram: string;
  iTunes: string;
  youtube: string;
  spotify: string;
  picture: string;
}

export interface Song extends Document {
  _id: string;
  slug: string;
  album: string;
  artists: string[];
  contributors: string[];
  iTunes: string;
  key: string;
  producers: string[];
  releaseDate: Date;
  spotify: string;
  tempo: string;
  time: string;
  title: string;
  writers: string[];
}

export interface Category extends Document {
  _id: string;
  title: string;
}

export const Albums: Model<Album> = model<Album>("Albums", AlbumSchema);
export const Artists: Model<Artist> = model<Artist>("Artists", ArtistSchema);
export const Songs: Model<Song> = model<Song>("Songs", SongSchema);
export const Categories: Model<Category> = model<Category>(
  "Categories",
  CategorySchema
);

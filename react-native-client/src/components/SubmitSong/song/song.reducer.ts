import { FilterCategory } from "../../../types/api.types";
import {
  SET_TITLE,
  SET_ALBUM_ID,
  SET_ARTISTS,
  SET_THEMES,
  SET_CONTRIBUTORS_STRING,
  SET_PRODUCERS_STRING,
  SET_WRITERS_STRING,
  SET_KEY,
  SET_TEMPO,
  SET_TIME,
  SET_APPLE_MUSIC_LINK,
  SET_SPOTIFY_LINK,
  SET_MAIN_ARTIST,
  SET_RELEASE_DATE,
} from "./song.actionTypes";

export interface SongState {
  title: string;
  albumId: string; // album id
  key: string;
  releaseDate: Date | null;
  mainArtistId: string; // id of main artist
  artists: string[]; // list of artist ids
  themes: FilterCategory[]; // list of category ids
  contributorsList: string[];
  contributorsString: string;
  producersList: string[];
  producersString: string;
  writersList: string[];
  writersString: string;
  tempo: string;
  time: string;
  appleMusicLink: string;
  spotifyLink: string;
}

export const initialSongState: SongState = {
  title: "",
  albumId: "",
  key: "",
  releaseDate: null,
  mainArtistId: "",
  artists: [],
  themes: [],
  contributorsList: [],
  contributorsString: "",
  producersList: [],
  producersString: "",
  writersList: [],
  writersString: "",
  tempo: "",
  time: "",
  appleMusicLink: "",
  spotifyLink: "",
};

const CONTRIBUTOR_SPLIT_REGEX: RegExp = /,|\n/gi;

export const songReducer = (
  state: SongState = initialSongState,
  action: any
): SongState => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };

    case SET_ALBUM_ID:
      return {
        ...state,
        albumId: action.payload.albumId,
      };

    case SET_MAIN_ARTIST:
      return {
        ...state,
        mainArtistId: action.payload.artistId,
        artists: action.payload.artistId ? [action.payload.artistId] : [],
      };

    case SET_ARTISTS:
      return {
        ...state,
        albumId: action.payload.albumId,
      };

    case SET_THEMES:
      return {
        ...state,
        themes: action.payload.themes,
      };

    case SET_CONTRIBUTORS_STRING:
      const contributorsList: string[] = action.payload.contributors.split(
        CONTRIBUTOR_SPLIT_REGEX
      );
      return {
        ...state,
        contributorsString: action.payload.contributors,
        contributorsList: contributorsList,
      };

    case SET_PRODUCERS_STRING:
      const producersList: string[] = action.payload.producers.split(
        CONTRIBUTOR_SPLIT_REGEX
      );
      return {
        ...state,
        producersString: action.payload.producers,
        producersList: producersList,
      };

    case SET_WRITERS_STRING:
      const writersList: string[] = action.payload.writers.split(
        CONTRIBUTOR_SPLIT_REGEX
      );
      return {
        ...state,
        writersString: action.payload.writers,
        writersList: writersList,
      };

    case SET_KEY:
      return {
        ...state,
        key: action.payload.key,
      };

    case SET_TEMPO:
      return {
        ...state,
        tempo: action.payload.tempo,
      };

    case SET_TIME:
      return {
        ...state,
        time: action.payload.time,
      };

    case SET_APPLE_MUSIC_LINK:
      return {
        ...state,
        appleMusicLink: action.payload.appleMusicLink,
      };

    case SET_SPOTIFY_LINK:
      return {
        ...state,
        spotifyLink: action.payload.spotifyLink,
      };

    case SET_RELEASE_DATE:
      return {
        ...state,
        releaseDate: action.payload.releaseDate,
      };

    default:
      return state;
  }
};

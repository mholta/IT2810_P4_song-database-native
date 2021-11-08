import { FilterCategory } from '../../../api/types';
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
  SET_SPOTIFY_LINK,
  SET_APPLE_MUSIC_LINK,
  SET_MAIN_ARTIST,
  SET_RELEASE_DATE,
} from './song.actionTypes';

export const setTitle = (title: string) => ({
  type: SET_TITLE,
  payload: { title },
});

export const setAlbumId = (albumId: string) => ({
  type: SET_ALBUM_ID,
  payload: { albumId },
});

export const setMainArtist = (artistId: string) => ({
  type: SET_MAIN_ARTIST,
  payload: { artistId },
});

/**
 * @param artists list of id of artists
 */
export const setArtists = (artists: string[]) => ({
  type: SET_ARTISTS,
  payload: { artists },
});

export const setThemes = (themes: FilterCategory[]) => ({
  type: SET_THEMES,
  payload: { themes },
});

export const setContributorsString = (contributors: string) => ({
  type: SET_CONTRIBUTORS_STRING,
  payload: {
    contributors,
  },
});

export const setProducersString = (producers: string) => ({
  type: SET_PRODUCERS_STRING,
  payload: {
    producers,
  },
});

export const setWritersString = (writers: string) => ({
  type: SET_WRITERS_STRING,
  payload: {
    writers,
  },
});

export const setKey = (key: string) => ({
  type: SET_KEY,
  payload: {
    key,
  },
});

export const setTempo = (tempo: string) => ({
  type: SET_TEMPO,
  payload: {
    tempo,
  },
});

export const setTime = (time: string) => ({
  type: SET_TIME,
  payload: {
    time,
  },
});

export const setSpotifyLink = (spotifyLink: string) => ({
  type: SET_SPOTIFY_LINK,
  payload: {
    spotifyLink,
  },
});

export const setAppleMusicLink = (appleMusicLink: string) => ({
  type: SET_APPLE_MUSIC_LINK,
  payload: {
    appleMusicLink,
  },
});

export const setReleaseDate = (releaseDate: Date | null) => ({
  type: SET_RELEASE_DATE,
  payload: { releaseDate },
});

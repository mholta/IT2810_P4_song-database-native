import { ReactNativeFile } from "apollo-upload-client";
import {
  SET_TITLE,
  SET_RELEASE_DATE,
  SET_MAIN_ARTIST,
  SET_COVER_IMAGE,
} from "./album.actionTypes";

export const setTitle = (title: string) => ({
  type: SET_TITLE,
  payload: { title },
});

export const setMainArtist = (artistId: string) => ({
  type: SET_MAIN_ARTIST,
  payload: { artistId },
});

export const setReleaseDate = (releaseDate: Date | null) => ({
  type: SET_RELEASE_DATE,
  payload: { releaseDate },
});

export const setCoverImage = (
  coverImage: File | ReactNativeFile | undefined
) => ({
  type: SET_COVER_IMAGE,
  payload: { coverImage },
});

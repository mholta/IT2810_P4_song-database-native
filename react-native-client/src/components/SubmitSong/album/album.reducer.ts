import {
  SET_TITLE,
  SET_MAIN_ARTIST,
  SET_RELEASE_DATE,
  SET_COVER_IMAGE,
} from "./album.actionTypes";

export interface AlbumState {
  title: string;
  releaseDate: Date;
  mainArtistId: string; // id of main artist
  coverImage: any;
}

export const initialAlbumState: AlbumState = {
  title: "",
  releaseDate: new Date(),
  mainArtistId: "",
  coverImage: undefined,
};

export const albumReducer = (
  state: AlbumState = initialAlbumState,
  action: any
): AlbumState => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: action.payload.title,
      };

    case SET_MAIN_ARTIST:
      return {
        ...state,
        mainArtistId: action.payload.artistId,
      };

    case SET_RELEASE_DATE:
      return {
        ...state,
        releaseDate: action.payload.releaseDate,
      };

    case SET_COVER_IMAGE:
      return {
        ...state,
        coverImage: action.payload.coverImage,
      };

    default:
      return state;
  }
};

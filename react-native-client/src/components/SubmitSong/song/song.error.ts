export const ERROR_UNKOWN = "ERROR_UNKOWN";
export const ERROR_NETWORK = "ERROR_NETWORK";
export const ERROR_RELEASE_DATE = "ERROR_RELEASE_DATE";
export const ERROR_RELEASE_DATE_ALBUM = "ERROR_RELEASE_DATE_ALBUM";
export const ERROR_ALBUM = "ERROR_ALBUM";
export const ERROR_TIME = "ERROR_TIME";
export const ERROR_KEY = "ERROR_KEY";
export const ERROR_TITLE = "ERROR_TITLE";
export const ERROR_ARTIST = "ERROR_ARTIST";
export const ERROR_TITLE_NO_INPUT = "ERROR_TITLE_NO_INPUT";
export const ERROR_ALBUM_NO_INPUT = "ERROR_ALBUM_NO_INPUT";
export const ERROR_ALBUM_TITLE_NO_INPUT = "ERROR_ALBUM_TITLE_NO_INPUT";
export const ERROR_IMAGE = "ERROR_IMAGE";
export const ERROR_TEMPO = "ERROR_TEMPO";

export const errorMessage = (error: string): string => {
  switch (error) {
    case ERROR_UNKOWN:
      return "Det oppstod en ukjent feil";
    case ERROR_NETWORK:
      return "Det oppstod en feil med nettverket";
    case ERROR_RELEASE_DATE:
      return "Utgivelsesdato må være satt";
    case ERROR_RELEASE_DATE_ALBUM:
      return "Utgivelsesdato for album må være satt";
    case ERROR_ALBUM:
      return "Albumet finnes fra før av";
    case ERROR_TIME:
      return "Feil format på time";
    case ERROR_KEY:
      return "Feil format på toneart";
    case ERROR_TITLE:
      return "Tittel finnes fra før av";
    case ERROR_TITLE_NO_INPUT:
      return "Tittelen må være satt";
    case ERROR_ALBUM_NO_INPUT:
      return "ALbumet må være valgt";
    case ERROR_ALBUM_TITLE_NO_INPUT:
      return "Tittel på album må være satt";
    case ERROR_ARTIST:
      return "Artist må være satt";
    case ERROR_IMAGE:
      return "Bilde må være valgt";
    case ERROR_TEMPO:
      return "Tempo må være et tall";
    default:
      return "Det oppstod en ukjent feil";
  }
};

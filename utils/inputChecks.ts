import {
  ERROR_KEY,
  ERROR_TIME,
} from "../components/SubmitSong/song/song.error";

export const isKeyArt = (key: string): boolean => {
  return RegExp(/^[CDEFGABHcdefgahb][bB#]?[mM]?$/).test(key.replace(/ /g, ""));
};

export const isLegalTime = (time: string): boolean => {
  return RegExp(/^([0-9]+\/[0-9]+(\+[0-9]+\/[0-9]+)*)$/).test(
    time.replace(/ /g, "")
  );
};

export const formatKey = (key: string): string => {
  if (!isKeyArt(key)) throw Error(ERROR_KEY);
  return key
    .replace(/ /g, "")
    .toLowerCase()
    .replace(/^\w/, (match) => match.toUpperCase());
};

export const formatTime = (time: string): string => {
  if (!isLegalTime(time)) throw Error(ERROR_TIME);
  return time.replace(/ /g, "").replace(/\+/g, " + ");
};

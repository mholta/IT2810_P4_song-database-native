import { SET_SEARCH_STRING } from "./search.actionTypes";
export const setSearchString = (searchString: string) => ({
  type: SET_SEARCH_STRING,
  payload: {
    searchString,
  },
});

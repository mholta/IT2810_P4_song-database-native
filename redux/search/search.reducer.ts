import { SET_SEARCH_STRING } from "./search.actionTypes";

export interface SearchState {
  searchString: string;
}

const initialSearchState: SearchState = {
  searchString: "hasddølks",
};

/**
 * A reducer for handling the state of the layout.
 */
export const searchReducer = (
  state: SearchState = initialSearchState,
  action: any
): SearchState => {
  switch (action.type) {
    case SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload.searchString,
      };
    default:
      return state;
  }
};

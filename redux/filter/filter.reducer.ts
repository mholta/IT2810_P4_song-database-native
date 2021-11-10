import { SortOptions } from "./filter.types";
import {
  SET_ALL_THEMES,
  SET_SEARCH_STRING,
  SET_SORT_OPTIONS,
  TOGGLE_THEME_SELECTION,
} from "./filter.actionTypes";
import { SortOrder, SortType } from "../../components/search/SortSelect";

export interface FilterCategory {
  _id: string;
  title: string;
}

export interface FilterState {
  allThemes: FilterCategory[];
  selectedThemes: FilterCategory[];
  sortOptions: SortOptions;
  searchString: string;
}

const dummyThemes: FilterCategory[] = ["hei", "sann", "du", "er", "bra"].map(
  (e) => ({ _id: e, title: e })
);

const initialFilterState: FilterState = {
  allThemes: [...dummyThemes],
  selectedThemes: [],
  sortOptions: {
    sortOrder: SortOrder.DESC,
    sortType: SortType.RELEASE_DATE,
  },
  searchString: "",
};

/**
 * A reducer for handling the state of the filter.
 */
export const filterReducer = (
  state: FilterState = initialFilterState,
  action: any
): FilterState => {
  switch (action.type) {
    case SET_ALL_THEMES:
      return {
        ...state,
        allThemes: action.payload.themes,
      };

    case TOGGLE_THEME_SELECTION:
      const newSelectedThemes: FilterCategory[] = [...state.selectedThemes];
      const theme: FilterCategory = action.payload.theme;

      const indexInSelectedThemesList = newSelectedThemes
        .map((e) => e._id)
        .indexOf(theme._id);

      if (indexInSelectedThemesList === -1) newSelectedThemes.push(theme);
      else newSelectedThemes.splice(indexInSelectedThemesList, 1);

      return {
        ...state,
        selectedThemes: newSelectedThemes,
      };

    case SET_SORT_OPTIONS:
      return {
        ...state,
        sortOptions: action.payload.sortOptions,
      };

    case SET_SEARCH_STRING:
      return {
        ...state,
        searchString: action.payload.searchString,
      };

    default:
      return state;
  }
};

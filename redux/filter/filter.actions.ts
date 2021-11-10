import { SortType } from "./../../components/search/SortSelect";
import { SortOptions } from "./filter.types";
import { FilterCategory } from "./filter.reducer";
import {
  SET_ALL_THEMES,
  SET_SEARCH_STRING,
  SET_SORT_OPTIONS,
  TOGGLE_THEME_SELECTION,
} from "./filter.actionTypes";
import { SortOrder } from "../../components/search/SortSelect";

export const setAllThemes = (themes: FilterCategory[]) => ({
  type: SET_ALL_THEMES,
  payload: {
    themes,
  },
});

export const toggleThemeSelection = (theme: FilterCategory) => {
  return {
    type: TOGGLE_THEME_SELECTION,
    payload: {
      theme: theme,
    },
  };
};

export const setSortOptions = (sortOptions: SortOptions) => ({
  type: SET_SORT_OPTIONS,
  payload: {
    sortOptions,
  },
});

export const setSearchString = (searchString: string) => ({
  type: SET_SEARCH_STRING,
  payload: {
    searchString,
  },
});

import { SortOptions } from "./filter.types";
import { FilterCategory } from "./filter.reducer";
import {
  SET_ALL_THEMES,
  SET_SORT_OPTIONS,
  TOGGLE_THEME_SELECTION,
} from "./filter.actionTypes";
import store from "../store";

export const setAllThemes = (themes: FilterCategory[]) => ({
  type: SET_ALL_THEMES,
  payload: {
    themes,
  },
});

export const toggleThemeSelection = (theme: FilterCategory) => {
  const state = store.getState();
  const newSelectedThemes: FilterCategory[] = [...state.filter.selectedThemes];

  const indexInSelectedThemesList = newSelectedThemes
    .map((e) => e._id)
    .indexOf(theme._id);

  if (indexInSelectedThemesList === -1) newSelectedThemes.push(theme);
  else newSelectedThemes.splice(indexInSelectedThemesList, 1);

  return {
    type: TOGGLE_THEME_SELECTION,
    payload: {
      selectedThemes: newSelectedThemes,
    },
  };
};

export const setSortOptions = (sortOptions: SortOptions) => ({
  type: SET_SORT_OPTIONS,
  payload: {
    sortOptions,
  },
});

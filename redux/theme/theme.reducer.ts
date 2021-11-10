import { ThemeObject, theme } from "./../../styles/theme";
/**
 * A reducer for handling the state of the filter.
 */
export const filterReducer = (
  state: ThemeObject = theme,
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

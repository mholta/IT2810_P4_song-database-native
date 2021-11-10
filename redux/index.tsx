import { combineReducers } from "redux";
import { searchReducer, SearchState } from "./search/search.reducer";
import { filterReducer, FilterState } from "./filter/filter.reducer";

export interface RootState {
  search: SearchState;
  filter: FilterState;
}

/**
 * A combined reducer for handling the state of the application.
 */
export default combineReducers({
  search: searchReducer,
  filter: filterReducer,
});

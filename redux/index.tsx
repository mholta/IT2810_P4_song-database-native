import { combineReducers } from "redux";
import { filterReducer, FilterState } from "./filter/filter.reducer";

export interface RootState {
  filter: FilterState;
}

/**
 * A combined reducer for handling the state of the application.
 */
export default combineReducers({
  filter: filterReducer,
});

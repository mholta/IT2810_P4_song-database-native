import React, { useEffect, useState } from "react";
import { makeStyles, SearchBar, useTheme } from "react-native-elements";
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setSortOptions } from "../../redux/filter/filter.actions";
import { setSearchString } from "../../redux/filter/filter.actions";
import { SortOptions } from "../../redux/filter/filter.reducer";
import { SortOrder, SortType } from "./SearchSorting";

const SearchInput = () => {
  const searchString = useSelector(
    (rootState: RootState) => rootState.filter.searchString
  );
  const dispatch = useDispatch();

  const [localSearchString, setLocalSearchString] = useState<string>(
    searchString
  );

  const triggerSearch = () => {
    const newSortOption: SortOptions | null = localSearchString
      ? null
      : {
          order: SortOrder.DESC,
          sortType: SortType.RELEASE_DATE,
        };
    batch(() => {
      dispatch(setSortOptions(newSortOption));
      dispatch(setSearchString(localSearchString));
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(triggerSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [localSearchString]);

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <SearchBar
      placeholder="Søk på sang"
      // @ts-ignore onChangeText-types for searchbar is currently broken https://github.com/react-native-elements/react-native-elements/issues/3089
      onChangeText={(newVal) => setLocalSearchString(newVal)}
      value={localSearchString}
      style={styles.textInput}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      inputStyle={styles.input}
      placeholderTextColor={theme.colors?.textFaded}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  inputContainer: {
    backgroundColor: theme.colors?.background,
  },
  input: { color: theme.colors?.text },
  textInput: {},
}));

export default SearchInput;

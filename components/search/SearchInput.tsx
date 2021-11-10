import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setSortOptions } from "../../redux/filter/filter.actions";
import { setSearchString } from "../../redux/filter/filter.actions";
import { SortOptions } from "../../redux/filter/filter.types";
import { SortOrder, SortType } from "./SortSelect";

const SearchInput = () => {
  const searchString = useSelector(
    (rootState: RootState) => rootState.filter.searchString
  );
  const dispatch = useDispatch();

  const [localSearchString, setLocalSearchString] =
    useState<string>(searchString);

  const triggerSearch = () => {
    dispatch(setSearchString(localSearchString));
    const newSortOption: SortOptions = {
      sortOrder: SortOrder.DESC,
      sortType: localSearchString ? SortType.RELEVANCE : SortType.RELEASE_DATE,
    };
    dispatch(setSortOptions(newSortOption));
  };

  useEffect(() => {
    const timeoutId = setTimeout(triggerSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [localSearchString]);

  return (
    <SearchBar
      style={styles.textInput}
      containerStyle={styles.container}
      placeholder="Søk på sang"
      onChangeText={(newVal) => setLocalSearchString(newVal)}
      value={localSearchString}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {},
});

export default SearchInput;

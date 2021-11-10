import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { SearchBar } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setSearchString } from "../../redux/search/search.actions";

const SearchInput = () => {
  const searchString = useSelector(
    (rootState: RootState) => rootState.search.searchString
  );
  const dispatch = useDispatch();

  const [localSearchString, setLocalSearchString] =
    useState<string>(searchString);

  const triggerSearch = () => dispatch(setSearchString(localSearchString));

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

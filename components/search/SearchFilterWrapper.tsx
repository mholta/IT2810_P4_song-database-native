import React from "react";
import { StyleSheet } from "react-native";
import { View } from "../Themed";
import SearchInput from "./SearchInput";
import SearchOptions from "./SearchOptions";
import SortSelect from "./SortSelect";

const SearchFilterWrapper = () => {
  return (
    <>
      <View style={styles.container}>
        <SearchInput />
        <SearchOptions />
      </View>
      <SortSelect />
    </>
  );
};

const styles = StyleSheet.create({
  container: { display: "flex", flexDirection: "row" },
});

export default SearchFilterWrapper;

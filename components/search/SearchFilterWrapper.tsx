import React from "react";
import { View } from "react-native";
import { makeStyles } from "react-native-elements";
import SearchInput from "./SearchInput";
import SearchOptions from "./SearchOptions";

const SearchFilterWrapper = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <SearchInput />
      <SearchOptions />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors?.grey3,
  },
}));

export default SearchFilterWrapper;

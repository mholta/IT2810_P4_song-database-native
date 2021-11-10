import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SearchFilterWrapper from "../components/search/SearchFilterWrapper";
import { View, Text } from "../components/Themed";
import { RootState } from "../redux";
import { RootTabScreenProps } from "../types";

const SongsScreen = ({}: RootTabScreenProps<"SongsTab">) => {
  const searchString = useSelector(
    (rootState: RootState) => rootState.search.searchString
  );

  return (
    <View style={styles.container}>
      <SearchFilterWrapper />
      <View style={styles.results}>
        <Text style={styles.title}>{searchString}</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <View></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  results: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default SongsScreen;

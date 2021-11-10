import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import SearchFilterWrapper from "../components/search/SearchFilterWrapper";
import { SongList } from "../components/SongList";
import { View, Text } from "../components/Themed";
import { RootState } from "../redux";
import { RootTabScreenProps } from "../types";

const SongsScreen = ({}: RootTabScreenProps<"SongsTab">) => {
  return (
    <View style={styles.container}>
      <SearchFilterWrapper />
      <View style={styles.resultsWrapper}>
        <SongList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  resultsWrapper: { flexGrow: 1 },
});

export default SongsScreen;

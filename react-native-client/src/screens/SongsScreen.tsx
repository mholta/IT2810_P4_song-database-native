import React from "react";
import { makeStyles } from "react-native-elements";
import SearchFilterWrapper from "../components/search/SearchFilterWrapper";
import { SongList } from "../components/SongList";
import { Text, View } from "react-native";
import { RootTabScreenProps } from "../types";
import SearchSorting from "../components/search/SearchSorting";

const SongsScreen = ({ navigation }: RootTabScreenProps<"SongsTab">) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <SearchFilterWrapper />
      <SongList navigation={navigation} />
      <SearchSorting />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  resultsWrapper: { flexGrow: 1 },
}));

export default SongsScreen;

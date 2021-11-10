import React from "react";
import { Image, StyleSheet } from "react-native";
import { makeStyles } from "react-native-elements";
import { Song } from "../api/types";
import { Text, View } from "./Themed";

interface SongListItemProps {
  song: Song;
  key: string;
}

export const SongListItem = ({ song }: SongListItemProps) => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: song.album.picture }}></Image>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.artists} numberOfLines={1}>
          {song.artists.map((a) => a.name).join(", ")}
        </Text>
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors?.box,
    marginBottom: 10,
    padding: 10,
    borderRadius: theme.layout?.borderRadius?.default,
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
    backgroundColor: "transparent",
  },
  image: {
    height: 60,
    width: 60,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  artists: {
    fontSize: 14,
  },
}));

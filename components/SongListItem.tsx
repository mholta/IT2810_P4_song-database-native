import React from "react";
import { Image, StyleSheet } from "react-native";
import { Song } from "../api/types";
import { Text, View } from "./Themed";

interface SongListItemProps {
  song: Song;
  key: string;
}

export default function SongListItem({ song }: SongListItemProps) {
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#090909",
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
    backgroundColor: "#090909",
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
});

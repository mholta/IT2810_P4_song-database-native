import React from "react";
import { Image, Text, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { Song } from "../../types/api.types";
import { Box } from "../generic/Box";
import { P } from "../generic/Text";

interface SongListItemProps {
  song: Song;
  key: string;
}

export const SongListItem = ({ song }: SongListItemProps) => {
  const styles = useStyles();
  return (
    <Box style={styles.container}>
      <Image style={styles.image} source={{ uri: song.album.picture }}></Image>
      <View style={styles.textContainer}>
        <P style={styles.songTitle} numberOfLines={1}>
          {song.title}
        </P>
        <P numberOfLines={1}>{song.artists.map((a) => a.name).join(", ")}</P>
      </View>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginVertical: theme.layout?.space?.small,
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
  songTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
}));

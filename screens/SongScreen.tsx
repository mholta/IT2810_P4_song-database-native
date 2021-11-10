import { useQuery, gql } from "@apollo/client";
import { faApple, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { IconButton } from "../components/IconButton";
import { Text, View } from "../components/Themed";

interface SongScreenProps {
  route: any;
  navigation: any;
}

export default function SongScreen({ route, navigation }: SongScreenProps) {
  const { data, loading, error } = useQuery(GET_SONG_DATA, {
    variables: { id: route.params.songId },
  });

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {!loading && (
          <View style={styles.songInformation}>
            <Image
              source={{ uri: data.song.album.picture }}
              style={styles.picture}
            ></Image>
            <Text style={styles.title}>{data.song.title}</Text>
            <Text>
              {data.song.album.title} (
              {new Date(data.song.album.releaseDate).getFullYear()}) -{" "}
              {data.song.artists.map((a: any) => a.name).join(", ")}
            </Text>
            {data.song.categories && (
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>Tema: </Text>
                <Text>
                  {data.song.categories.map((c: any) => c.title).join(", ")}
                </Text>
              </View>
            )}
            {data.song.writers && (
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>Tekst og melodi: </Text>
                <Text>{data.song.writers.join(", ")}</Text>
              </View>
            )}
            {data.song.producers && (
              <View style={styles.infoBox}>
                <Text style={styles.infoBoxTitle}>Produsenter: </Text>
                <Text>{data.song.producers.join(", ")}</Text>
              </View>
            )}
            <View style={[styles.infoBox, styles.infoFields]}>
              {data.song.key && (
                <View style={styles.infoField}>
                  <Text style={styles.infoBoxTitle}>Toneart: </Text>
                  <Text>{data.song.key}</Text>
                </View>
              )}
              {data.song.tempo && (
                <View style={styles.infoField}>
                  <Text style={styles.infoBoxTitle}>Tempo: </Text>
                  <Text>{data.song.tempo} BPM</Text>
                </View>
              )}
              {data.song.time && (
                <View style={styles.infoField}>
                  <Text style={styles.infoBoxTitle}>Takt: </Text>
                  <Text>{data.song.time}</Text>
                </View>
              )}
            </View>

            <View style={styles.iconButtons}>
              {data.song.spotify && (
                <IconButton
                  href={data.song.spotify}
                  icon={
                    <FontAwesomeIcon
                      icon={faSpotify}
                      color={theme.colors?.text}
                      size={32}
                    />
                  }
                  text={"Åpne i Spotify"}
                />
              )}

              {data.song.iTunes && (
                <View style={styles.buttonMargin}>
                  <IconButton
                    href={data.song.iTunes}
                    icon={
                      <FontAwesomeIcon
                        icon={faApple}
                        color={theme.colors?.text}
                        size={32}
                      />
                    }
                    text={"Åpne i Apple Music"}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    width: "100%",
    padding: 10,
  },
  songInformation: {
    width: "100%",
    backgroundColor: "transparent",
    borderRadius: theme.layout?.borderRadius?.default,
    padding: 20,
  },
  picture: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  infoBox: {
    backgroundColor: theme.colors?.box,
    borderRadius: theme.layout?.borderRadius?.small,
    padding: 7,
    marginTop: 7,
  },
  infoBoxTitle: {
    fontWeight: "bold",
  },
  infoField: {
    flexDirection: "row",
    backgroundColor: "transparent",
    padding: 7,
    paddingLeft: 10,
    paddingRight: 10,
  },
  infoFields: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  iconButtons: {
    marginTop: 20,
    alignSelf: "center",
  },
  buttonMargin: {
    marginBottom: 40,
  },
}));

export const GET_SONG_DATA = gql`
  query GetSong($id: String!) {
    song(id: $id) {
      _id
      title
      releaseDate
      album {
        title
        picture
        releaseDate
      }
      key
      artists {
        name
      }

      tempo
      time
      writers
      contributors
      producers
      iTunes
      spotify
      categories {
        _id
        title
      }
    }
  }
`;

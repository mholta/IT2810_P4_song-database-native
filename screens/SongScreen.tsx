import { useQuery, gql } from "@apollo/client";
import { faApple, faSpotify } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { Box } from "../components/generic/Box";
import { P } from "../components/generic/Text";
import { IconButton } from "../components/IconButton";

interface SongScreenProps {
  route: any;
  navigation: any;
}

export default function SongScreen({ route, navigation }: SongScreenProps) {
  const { data, loading, error } = useQuery(GET_SONG_DATA, {
    variables: { id: route.params.songId },
  });

  console.log(data?.song?.album);

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
            <P style={styles.title}>{data.song.title}</P>
            <P>
              {data.song.album.title} (
              {new Date(data.song.album.releaseDate).getFullYear()}) -{" "}
              {data.song.artists.map((a: any) => a.name).join(", ")}
            </P>
            {data.song.categories.length > 0 && (
              <Box>
                <P style={styles.infoBoxTitle}>Tema: </P>
                <P>
                  {data.song.categories.map((c: any) => c.title).join(", ")}
                </P>
              </Box>
            )}
            {data.song.writers && (
              <Box>
                <P style={styles.infoBoxTitle}>Tekst og melodi: </P>
                <P>{data.song.writers.join(", ")}</P>
              </Box>
            )}
            {data.song.producers && (
              <Box>
                <P style={styles.infoBoxTitle}>Produsenter: </P>
                <P>{data.song.producers.join(", ")}</P>
              </Box>
            )}
            <Box style={styles.infoFields}>
              {data.song.key && (
                <View style={styles.infoField}>
                  <P style={styles.infoBoxTitle}>Toneart: </P>
                  <P>{data.song.key}</P>
                </View>
              )}
              {data.song.tempo && (
                <View style={styles.infoField}>
                  <P style={styles.infoBoxTitle}>Tempo: </P>
                  <P>{data.song.tempo} BPM</P>
                </View>
              )}
              {data.song.time && (
                <View style={styles.infoField}>
                  <P style={styles.infoBoxTitle}>Takt: </P>
                  <P>{data.song.time}</P>
                </View>
              )}
            </Box>

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

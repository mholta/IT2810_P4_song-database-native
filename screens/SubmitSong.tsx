import React, { useEffect, useReducer, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import {
  initialSongState,
  songReducer,
} from "../components/SubmitSong/song/song.reducer";
import {
  albumReducer,
  initialAlbumState,
} from "../components/SubmitSong/album/album.reducer";
import ArtistSearch from "../components/SubmitSong/ArtistSearch";
import {
  setAlbumId,
  setContributorsString,
  setKey,
  setMainArtist,
  setProducersString,
  setReleaseDate,
  setReleaseDate as setSongReleaseDate,
  setTempo,
  setTime,
  setTitle,
  setWritersString,
} from "../components/SubmitSong/song/song.actions";
import AlbumSearch from "../components/SubmitSong/AlbumSearch";
import DatePicker from "../components/SubmitSong/DatePicker";
import { TextInput } from "react-native-paper";
import {
  ERROR_KEY,
  ERROR_TIME,
  ERROR_TITLE,
} from "../components/SubmitSong/song/song.error";
import ContributorsWithPreview from "../components/SubmitSong/ContributorsWithPreview";
import { makeStyles } from "react-native-elements";
import CreateNewAlbum from "../components/SubmitSong/CreateNewAlbum";

export default function SubmitSong() {
  const [songState, dispatch] = useReducer(songReducer, initialSongState);
  const [albumState, albumDispatch] = useReducer(
    albumReducer,
    initialAlbumState
  );
  const [inputError, setInputError] = useState("");
  const [dateError, setDateError] = useState(false);
  const [dateAlbumError, setDateAlbumError] = useState(false);
  const [send, setSend] = useState(false);
  const [artistId, setArtistId] = useState("");
  const [createNewAlbumModalOpen, setCreateNewAlbumModalOpen] =
    useState<boolean>(true);
  // const client = useApolloClient();
  useEffect(() => {
    setArtistId(songState.mainArtistId);
  }, [songState.mainArtistId]);

  const styles = useStyles();
  return (
    <ScrollView style={styles.container}>
      <ArtistSearch
        setValueCallback={(value: string) => dispatch(setMainArtist(value))}
      />
      {songState.mainArtistId !== "" && songState.mainArtistId === artistId && (
        <AlbumSearch
          artistId={songState.mainArtistId}
          setValueCallback={(value: string) => {
            dispatch(setAlbumId(value));
          }}
          setDateCallback={(date: Date | string | number | null) => {
            date && dispatch(setSongReleaseDate(new Date(date)));
          }}
          setNewAlbumModalOpenCallback={() => {
            setCreateNewAlbumModalOpen(true);
          }}
        />
      )}

      {/* Create new album */}
      {createNewAlbumModalOpen && (
        <CreateNewAlbum
          state={albumState}
          dispatch={albumDispatch}
          setDateAlbumError={setDateAlbumError}
          setDateCallback={(date: Date | null) => {
            if (!songState.releaseDate) {
              dispatch(setReleaseDate(date));
            }
          }}
          setCreateNewAlbumModalOpen={setCreateNewAlbumModalOpen}
        />
      )}

      {/* Song title */}
      <TextInput
        style={styles.inputSection}
        label="Tittel*"
        onChangeText={(text) => dispatch(setTitle(text))}
        error={inputError === ERROR_TITLE}
        value={songState.title}
      />

      {/* Release date. Equal to album release date when choosing album */}
      <View style={styles.inputSection}>
        <DatePicker
          value={songState.releaseDate ?? songState.releaseDate ?? new Date()}
          onChange={(date: Date) => dispatch(setSongReleaseDate(date))}
        />
      </View>

      {/* Key */}
      <TextInput
        style={styles.inputSection}
        label="Toneart*"
        placeholder="A"
        onChangeText={(text) => dispatch(setKey(text))}
        error={inputError === ERROR_KEY}
        value={songState.key}
      />

      {/* Tempo */}
      <TextInput
        style={styles.inputSection}
        label="Tempo"
        placeholder="120"
        onChangeText={(text) => dispatch(setTempo(text))}
        value={songState.tempo}
        keyboardType="numeric"
      />

      {/* Time */}
      <TextInput
        style={styles.inputSection}
        label="Time"
        placeholder="4/4"
        onChangeText={(text) => dispatch(setTime(text))}
        error={inputError === ERROR_TIME}
        value={songState.time}
      />

      {/* Contributors */}
      <View style={styles.inputSection}>
        <ContributorsWithPreview
          label="Låtskrivere"
          id="writers"
          placeholder="Ola, Kari"
          onChangeText={(text) => dispatch(setWritersString(text))}
          valueString={songState.writersString}
          valueList={songState.writersList}
          helperText="Navn separert med komma og evt rolle i parantes."
        />
      </View>

      {/* Producers */}
      <View style={styles.inputSection}>
        <ContributorsWithPreview
          label="Produsent(er)"
          id="producers"
          placeholder="Ola, Kari (med-produsent)"
          onChangeText={(text) => dispatch(setProducersString(text))}
          valueString={songState.producersString}
          valueList={songState.producersList}
          helperText="Navn separert med komma og evt rolle i parantes."
        />
      </View>

      {/* Bidragsytere */}
      <View style={styles.inputSection}>
        <ContributorsWithPreview
          label="Bidragsytere"
          id="contributors"
          placeholder="Ola (gitar), Kari (vokal)"
          onChangeText={(text) => dispatch(setContributorsString(text))}
          valueString={songState.contributorsString}
          valueList={songState.contributorsList}
          helperText="Navn separert med komma og evt rolle i parantes."
        />
      </View>
      <View
        style={styles.separator}
        // lightColor="#eee"
        // darkColor="rgba(255,255,255,0.1)"
      />
    </ScrollView>
  );
}

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    flex: 1,
    padding: theme.layout?.padding?.screen,
  },
  title: {
    fontSize: theme.fontSize?.h1,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputSection: {
    marginVertical: theme.layout?.space?.small,
  },
}));

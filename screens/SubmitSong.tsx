import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Platform,
} from "react-native";
import EditScreenInfo from "../components/EditScreenInfo";
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

export default function SubmitSong() {
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const [albumState, albumDispatch] = useReducer(
    albumReducer,
    initialAlbumState
  );
  const [inputError, setInputError] = useState("");
  const [dateError, setDateError] = useState(false);
  const [dateAlbumError, setDateAlbumError] = useState(false);
  const [send, setSend] = useState(false);
  const [artistId, setArtistId] = useState("");
  const [
    createNewAlbumModalOpen,
    setCreateNewAlbumModalOpen,
  ] = useState<boolean>(false);
  // const client = useApolloClient();
  useEffect(() => {
    setArtistId(state.mainArtistId);
  }, [state.mainArtistId]);
  return (
    <ScrollView style={styles.container}>
      <ArtistSearch
        setValueCallback={(value: string) => dispatch(setMainArtist(value))}
      />
      {state.mainArtistId !== "" && state.mainArtistId === artistId && (
        <AlbumSearch
          artistId={state.mainArtistId}
          setValueCallback={(value: string) => {
            dispatch(setAlbumId(value));
          }}
          setDateCallback={(date: Date | null) => {
            dispatch(setReleaseDate(date));
          }}
          setNewAlbumModalOpenCallback={() => {
            setCreateNewAlbumModalOpen(true);
          }}
        />
      )}
      <TextInput
        label="Tittel*"
        onChangeText={(text) => dispatch(setTitle(text))}
        error={inputError === ERROR_TITLE}
        value={state.title}
      />
      <DatePicker state={state} dispatch={dispatch} />
      <TextInput
        label="Toneart*"
        placeholder="A"
        onChangeText={(text) => dispatch(setKey(text))}
        error={inputError === ERROR_KEY}
        value={state.key}
      />
      <TextInput
        label="Tempo"
        placeholder="120"
        onChangeText={(text) => dispatch(setTempo(text))}
        value={state.tempo}
        keyboardType="numeric"
      />
      <TextInput
        label="Time"
        placeholder="4/4"
        onChangeText={(text) => dispatch(setTime(text))}
        error={inputError === ERROR_TIME}
        value={state.time}
      />
      <ContributorsWithPreview
        label="Låtskrivere"
        id="writers"
        placeholder="Ola, Kari"
        onChangeText={(text) => dispatch(setWritersString(text))}
        valueString={state.writersString}
        valueList={state.writersList}
      />
      <ContributorsWithPreview
        label="Produsent(er)"
        id="producers"
        placeholder="Ola, Kari (med-produsent)"
        onChangeText={(text) => dispatch(setProducersString(text))}
        valueString={state.producersString}
        valueList={state.producersList}
        helperText="Skriv rolle i parantes om ønskelig."
      />
      <ContributorsWithPreview
        label="Bidragsytere"
        id="contributors"
        placeholder="Ola (gitar), Kari (vokal)"
        onChangeText={(text) => dispatch(setContributorsString(text))}
        valueString={state.contributorsString}
        valueList={state.contributorsList}
        helperText="Skriv rolle i parantes om ønskelig."
      />
      <View
        style={styles.separator}
        // lightColor="#eee"
        // darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/SubmitSong.tsx" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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

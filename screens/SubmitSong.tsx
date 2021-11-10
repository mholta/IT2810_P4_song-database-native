import React, { useEffect, useReducer, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, ScrollView, View } from "react-native";
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
  setMainArtist,
  setReleaseDate,
} from "../components/SubmitSong/song/song.actions";
import AlbumSearch from "../components/SubmitSong/AlbumSearch";

export default function SubmitSong() {
  const [state, dispatch] = useReducer(songReducer, initialSongState);
  const [albumState, albumDispatch] = useReducer(
    albumReducer,
    initialAlbumState
  );
  const [inputError, setInputError] = useState("");
  const [dateOpen, setDateOpen] = useState(false);
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

import React, { useEffect, useReducer, useState } from "react";
import { View } from "react-native";
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
  setReleaseDate as setSongReleaseDate,
  setTempo,
  setThemes,
  setTime,
  setTitle,
  setWritersString,
} from "../components/SubmitSong/song/song.actions";
import AlbumSearch from "../components/SubmitSong/AlbumSearch";
import DatePicker from "../components/SubmitSong/DatePicker";
import {
  ERROR_ALBUM,
  ERROR_KEY,
  ERROR_NETWORK,
  ERROR_RELEASE_DATE,
  ERROR_RELEASE_DATE_ALBUM,
  ERROR_TIME,
  ERROR_TITLE,
  ERROR_UNKOWN,
} from "../components/SubmitSong/song/song.error";
import ContributorsWithPreview from "../components/SubmitSong/ContributorsWithPreview";
import { Button, makeStyles } from "react-native-elements";
import CreateNewAlbum from "../components/SubmitSong/CreateNewAlbum";
import { formatKey, formatTime } from "../utils/inputCheck";
import { useMutation, gql } from "@apollo/client";
import ScrollContainer from "../components/generic/ScreenWrapper";
import { TextInput } from "../components/generic/TextInput";
import { CategoriesSelector } from "../components/SubmitSong/CategoriesSelector";
import { FilterCategory } from "../redux/filter/filter.reducer";

const SubmitSong = () => {
  const [songState, songDispatch] = useReducer(songReducer, initialSongState);
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

  useEffect(() => {
    setArtistId(songState.mainArtistId);
  }, [songState.mainArtistId]);

  const styles = useStyles();
  const [createSong, { data, loading }] = useMutation(CREATE_SONG_MUTATION, {
    onError: (err) => {
      if (err.message.includes("E11000 duplicate key error")) {
        if (err.message.includes(".songs")) {
          setInputError(ERROR_TITLE);
        } else if (err.message.includes(".albums")) {
          setInputError(ERROR_ALBUM);
        } else setInputError(ERROR_UNKOWN);
      } else if (err.networkError) {
        setInputError(ERROR_NETWORK);
      } else {
        setInputError(ERROR_UNKOWN);
      }
    },
  });
  useEffect(() => {
    if (send) {
      // Create song
      createSong({
        variables: {
          album: createNewAlbumModalOpen ? albumState.title : songState.albumId,
          artists: songState.artists,
          categories: songState.themes.map((theme) => theme._id),
          contibutors: songState.contributorsList,
          iTunes: songState.appleMusicLink,
          key: songState.key,
          producers: songState.producersList,
          releaseDate: songState.releaseDate, // TODO: Implement date picker in song
          spotify: songState.spotifyLink,
          tempo: songState.tempo,
          time: songState.time,
          title: songState.title,
          writers: songState.writersList,
          file: albumState.coverImage,
          albumReleaseDate: albumState.releaseDate,
        },
      })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
    return () => setSend(false);
  }, [send]);
  const handleSubmit = (e: any) => {
    /*     console.log({
      album: createNewAlbumModalOpen ? albumState.title : songState.albumId,
      artists: songState.artists,
      categories: songState.themes.map((theme) => theme._id),
      contibutors: songState.contributorsList,
      iTunes: songState.appleMusicLink,
      key: songState.key,
      producers: songState.producersList,
      releaseDate: songState.releaseDate, // TODO: Implement date picker in song
      spotify: songState.spotifyLink,
      tempo: songState.tempo,
      time: songState.time,
      title: songState.title,
      writers: songState.writersList,
      file: albumState.coverImage,
      albumReleaseDate: albumState.releaseDate,
    }); */
    try {
      if (songState.key) songDispatch(setKey(formatKey(songState.key)));
      if (songState.time) songDispatch(setTime(formatTime(songState.time)));
      if (!songState.releaseDate) throw Error(ERROR_RELEASE_DATE);
      if (dateError) throw Error(ERROR_RELEASE_DATE);
      if (dateAlbumError) throw Error(ERROR_RELEASE_DATE_ALBUM);
      setSend(true);
    } catch (err) {
      if (err instanceof Error) setInputError(err.message);
      else {
        setInputError(ERROR_UNKOWN);
      }
      return;
    }
  };
  return (
    <ScrollContainer>
      <ArtistSearch
        setValueCallback={(value: string) => songDispatch(setMainArtist(value))}
      />
      {songState.mainArtistId !== "" &&
        songState.mainArtistId === artistId &&
        !createNewAlbumModalOpen && (
          <AlbumSearch
            artistId={songState.mainArtistId}
            setValueCallback={(value: string) => {
              songDispatch(setAlbumId(value));
            }}
            setDateCallback={(date: Date | string | number | null) => {
              date && songDispatch(setSongReleaseDate(new Date(date)));
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
              songDispatch(setSongReleaseDate(date));
            }
          }}
          setCreateNewAlbumModalOpen={setCreateNewAlbumModalOpen}
          onDateErrorChange={setDateAlbumError}
        />
      )}

      {/* Song title */}
      <TextInput
        style={styles.inputSection}
        label="Tittel*"
        onChangeText={(text) => songDispatch(setTitle(text))}
        error={inputError === ERROR_TITLE}
        value={songState.title}
      />

      {/* Release date. Equal to album release date when choosing album */}
      <View style={styles.inputSection}>
        {songState.releaseDate && (
          <DatePicker
            value={songState.releaseDate}
            label="Utgivelsesdato sang"
            onChange={(date: Date) => songDispatch(setSongReleaseDate(date))}
            onDateErrorChange={setDateError}
          />
        )}
      </View>

      {/* Categories */}
      <CategoriesSelector
        onChangeSelection={(categories: FilterCategory[]) => {
          songDispatch(setThemes(categories));
        }}
      />

      {/* Key */}
      <TextInput
        style={styles.inputSection}
        label="Toneart*"
        placeholder="A"
        onChangeText={(text) => songDispatch(setKey(text))}
        error={inputError === ERROR_KEY}
        value={songState.key}
      />

      {/* Tempo */}
      <TextInput
        style={styles.inputSection}
        label="Tempo"
        placeholder="120"
        onChangeText={(text) => songDispatch(setTempo(text))}
        value={songState.tempo}
        keyboardType="numeric"
      />

      {/* Time */}
      <TextInput
        style={styles.inputSection}
        label="Time"
        placeholder="4/4"
        onChangeText={(text) => songDispatch(setTime(text))}
        error={inputError === ERROR_TIME}
        value={songState.time}
      />

      {/* Contributors */}
      <View style={styles.inputSection}>
        <ContributorsWithPreview
          label="Låtskrivere"
          id="writers"
          placeholder="Ola, Kari"
          onChangeText={(text) => songDispatch(setWritersString(text))}
          valueString={songState.writersString}
          valueList={songState.writersList}
          helperText="Navn separert med komma."
        />
      </View>

      {/* Producers */}
      <View style={styles.inputSection}>
        <ContributorsWithPreview
          label="Produsent(er)"
          id="producers"
          placeholder="Ola, Kari (med-produsent)"
          onChangeText={(text) => songDispatch(setProducersString(text))}
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
          onChangeText={(text) => songDispatch(setContributorsString(text))}
          valueString={songState.contributorsString}
          valueList={songState.contributorsList}
          helperText="Navn separert med komma og evt rolle i parantes."
        />
      </View>
      <Button title="Send inn" onPress={handleSubmit} />
      <View style={styles.separator} />
    </ScrollContainer>
  );
};

const CREATE_SONG_MUTATION = gql`
  mutation CreateSong(
    $album: String!
    $artists: [String!]!
    $categories: [String!]
    $contributors: [String!]
    $iTunes: String
    $key: String
    $producers: [String!]
    $releaseDate: Date!
    $spotify: String
    $tempo: String
    $time: String
    $title: String!
    $writers: [String!]
    $file: Upload
    $albumReleaseDate: Date
  ) {
    createSong(
      album: $album
      artists: $artists
      categories: $categories
      contributors: $contributors
      iTunes: $iTunes
      key: $key
      producers: $producers
      releaseDate: $releaseDate
      spotify: $spotify
      tempo: $tempo
      time: $time
      title: $title
      writers: $writers
      file: $file
      albumReleaseDate: $albumReleaseDate
    ) {
      _id
      title
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: theme.fontSize?.h1,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  inputSection: {},
}));

export default SubmitSong;

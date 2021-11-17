import React, { useEffect, useReducer, useState } from "react";
import { View } from "react-native";
import { initialSongState, songReducer } from "./song/song.reducer";
import { albumReducer, initialAlbumState } from "./album/album.reducer";
import ArtistSearch from "./DropdownSearch.Artist";
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
} from "./song/song.actions";
import AlbumSearch from "./DropdownSearch.Album";
import DatePicker from "./DatePicker";
import {
  errorMessage,
  ERROR_ALBUM,
  ERROR_ALBUM_NO_INPUT,
  ERROR_ALBUM_TITLE_NO_INPUT,
  ERROR_ARTIST,
  ERROR_IMAGE,
  ERROR_KEY,
  ERROR_NETWORK,
  ERROR_RELEASE_DATE,
  ERROR_RELEASE_DATE_ALBUM,
  ERROR_TEMPO,
  ERROR_TIME,
  ERROR_TITLE,
  ERROR_TITLE_NO_INPUT,
  ERROR_UNKOWN,
} from "./song/song.error";
import ContributorsWithPreview from "./ContributorsWithPreview";
import { Button, makeStyles } from "react-native-elements";
import CreateNewAlbum from "./CreateNewAlbum";
import { formatKey, formatTime } from "../../utils/inputCheck";
import { useMutation, gql, useApolloClient } from "@apollo/client";
import ScrollContainer from "../generic/ScreenWrapper";
import { TextInput } from "../generic/TextInput";
import { CategoriesSelect } from "./CategoriesSelect";
import { FilterCategory } from "../../redux/filter/filter.reducer";
import { HelperText } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";

interface SubmitSongProps {
  navigation: any;
}

const SubmitSong = ({ navigation }: SubmitSongProps) => {
  const [songState, songDispatch] = useReducer(songReducer, {
    ...initialSongState,
  });
  const [albumState, albumDispatch] = useReducer(albumReducer, {
    ...initialAlbumState,
  });
  const [inputError, setInputError] = useState("");
  const [dateError, setDateError] = useState(false);
  const [dateAlbumError, setDateAlbumError] = useState(false);
  const [send, setSend] = useState(false);
  const [artistId, setArtistId] = useState("");
  const [
    createNewAlbumModalOpen,
    setCreateNewAlbumModalOpen,
  ] = useState<boolean>(false);
  const client = useApolloClient();

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
          releaseDate: songState.releaseDate,
          spotify: songState.spotifyLink,
          tempo: songState.tempo,
          time: songState.time,
          title: songState.title,
          writers: songState.writersList,
          file: albumState.coverImage,
          albumReleaseDate: albumState.releaseDate,
        },
      })
        .then((_) => setSend(false))
        .catch((_) => setSend(false));
    }
  }, [send]);

  if (data && !loading) {
    client.clearStore();

    setTimeout(() => {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: "Root" },
            {
              name: "SongScreen",
              params: {
                songId: data.createSong._id,
              },
            },
          ],
        })
      );
    }, 500);
  }

  const handleSubmit = (e: any) => {
    try {
      if (songState.artists.length === 0) throw Error(ERROR_ARTIST);
      if (createNewAlbumModalOpen && !albumState.title)
        throw Error(ERROR_ALBUM_TITLE_NO_INPUT);
      else if (!createNewAlbumModalOpen && !songState.albumId)
        throw Error(ERROR_ALBUM_NO_INPUT);
      if (createNewAlbumModalOpen && !albumState.coverImage)
        throw Error(ERROR_IMAGE);
      if (!songState.title) throw Error(ERROR_TITLE_NO_INPUT);
      if (!songState.releaseDate) throw Error(ERROR_RELEASE_DATE);
      if (songState.key) songDispatch(setKey(formatKey(songState.key)));
      else throw Error(ERROR_KEY);
      if (songState.tempo && isNaN(parseInt(songState.tempo)))
        throw Error(ERROR_TEMPO);
      if (songState.time) songDispatch(setTime(formatTime(songState.time)));
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
        setValueCallback={(value: string) => {
          if (inputError === ERROR_ARTIST) setInputError("");
          songDispatch(setMainArtist(value));
        }}
      />
      {inputError === ERROR_ARTIST && (
        <HelperText type="error">{errorMessage(inputError)}</HelperText>
      )}
      {songState.mainArtistId !== "" &&
        songState.mainArtistId === artistId &&
        !createNewAlbumModalOpen && (
          <AlbumSearch
            artistId={songState.mainArtistId}
            setValueCallback={(value: string) => {
              if (
                inputError === ERROR_ALBUM_NO_INPUT ||
                inputError === ERROR_ALBUM
              )
                setInputError("");
              songDispatch(setAlbumId(value));
            }}
            setDateCallback={(date: Date | string | number | null) => {
              if (date) {
                songDispatch(setSongReleaseDate(new Date(date)));
                if (inputError === ERROR_RELEASE_DATE) setInputError("");
              }
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
          setInputError={setInputError}
          inputError={inputError}
          setDateAlbumError={setDateAlbumError}
          setDateCallback={(date: Date | null) => {
            if (!songState.releaseDate) {
              songDispatch(setSongReleaseDate(date));
              if (
                inputError === ERROR_RELEASE_DATE ||
                inputError === ERROR_RELEASE_DATE_ALBUM
              )
                setInputError("");
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
        error={
          inputError === ERROR_TITLE || inputError === ERROR_TITLE_NO_INPUT
        }
        value={songState.title}
      />
      {(inputError === ERROR_TITLE || inputError === ERROR_TITLE_NO_INPUT) && (
        <HelperText type="error">{errorMessage(inputError)}</HelperText>
      )}

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
      <CategoriesSelect
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
      {inputError === ERROR_KEY && (
        <HelperText type="error">{errorMessage(inputError)}</HelperText>
      )}

      {/* Tempo */}
      <TextInput
        style={styles.inputSection}
        label="Tempo"
        placeholder="120"
        onChangeText={(text) => songDispatch(setTempo(text))}
        value={songState.tempo}
        keyboardType="numeric"
      />
      {inputError === ERROR_TEMPO && (
        <HelperText type="error">{errorMessage(inputError)}</HelperText>
      )}

      {/* Time */}
      <TextInput
        style={styles.inputSection}
        label="Time"
        placeholder="4/4"
        onChangeText={(text) => songDispatch(setTime(text))}
        error={inputError === ERROR_TIME}
        value={songState.time}
      />
      {inputError === ERROR_TIME && (
        <HelperText type="error">{errorMessage(inputError)}</HelperText>
      )}

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

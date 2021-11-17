import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { HelperText, IconButton } from "react-native-paper";
import { setCoverImage, setReleaseDate, setTitle } from "./album/album.actions";
import { AlbumState } from "./album/album.reducer";
import DatePicker from "./DatePicker";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ReactNativeFile } from "apollo-upload-client";
import { TextInput } from "../generic/TextInput";
import {
  errorMessage,
  ERROR_ALBUM,
  ERROR_ALBUM_TITLE_NO_INPUT,
  ERROR_IMAGE,
} from "./song/song.error";

interface CreateNewAlbumProps {
  state: AlbumState;
  dispatch: React.Dispatch<any>;
  setCreateNewAlbumModalOpen: React.Dispatch<boolean>;
  setDateCallback: (date: Date | null) => void;
  setDateAlbumError: React.Dispatch<boolean>;
  onDateErrorChange: (error: boolean) => void;
  setInputError: React.Dispatch<string>;
  inputError: string;
}

const CreateNewAlbum = ({
  state,
  inputError,
  setInputError,
  dispatch,
  setCreateNewAlbumModalOpen,
  setDateCallback,
  onDateErrorChange,
}: CreateNewAlbumProps) => {
  const [dateOpen, setDateOpen] = useState(false);
  const styles = useStyles();
  const [coverURI, setCoverURI] = useState<string>("");
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (!pickerResult.cancelled) {
      const blob = RegExp(/^data:image\/[A-Za-z]*;base64,/).test(
        pickerResult.uri
      );
      let file: File | ReactNativeFile;
      if (blob) {
        const blob = await fetch(pickerResult.uri).then((res) => res.blob());
        file = new File(
          [blob],
          "a." +
            pickerResult.uri.substring(11, pickerResult.uri.indexOf(";base64,"))
        );
        setCoverURI(URL.createObjectURL(blob));
      } else {
        const type = pickerResult.uri.substring(
          pickerResult.uri.lastIndexOf(".") + 1
        );
        console.log(type);

        const uri = pickerResult.uri;
        file = new ReactNativeFile({
          uri,
          type: "image/" + type,
          name: "cover-image." + type,
        });
        setCoverURI(pickerResult.uri);
      }
      console.log(file);
      dispatch(setCoverImage(file));
    }
  };

  return (
    <View>
      <View>
        <Text style={styles.title}>Opprett nytt album</Text>
        <IconButton
          icon="window-close"
          onPress={() => setCreateNewAlbumModalOpen(false)}
        />
      </View>

      {/* Title */}
      <TextInput
        style={styles.inputSection}
        label="Tittel*"
        onChangeText={(text) => {
          dispatch(setTitle(text));
          if (
            inputError === ERROR_ALBUM_TITLE_NO_INPUT ||
            inputError === ERROR_ALBUM
          )
            setInputError("");
        }}
        value={state.title}
      />
      {(inputError === ERROR_ALBUM_TITLE_NO_INPUT ||
        inputError === ERROR_ALBUM) && (
        <HelperText type="error">{errorMessage(inputError)}</HelperText>
      )}
      {/* Release date. Sets song release date after being chosen*/}
      <View style={[styles.inputSection]}>
        <DatePicker
          value={state.releaseDate}
          label="Utgivelsesdato album"
          onChange={(date: Date) => {
            dispatch(setReleaseDate(date));
            setDateCallback(date);
          }}
          onDateErrorChange={onDateErrorChange}
        />
      </View>

      {/* Cover image upload */}
      <View>
        <Button onPress={openImagePickerAsync}>Last opp coverbilde</Button>
        {state.coverImage && (
          <Image
            onLoad={() => inputError === ERROR_IMAGE && setInputError("")}
            source={{
              uri: coverURI,
            }}
            style={{ width: 300, height: 300, resizeMode: "cover" }}
          />
        )}
        {inputError === ERROR_IMAGE && (
          <HelperText type="error">{errorMessage(inputError)}</HelperText>
        )}
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    flex: 1,
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

export default CreateNewAlbum;

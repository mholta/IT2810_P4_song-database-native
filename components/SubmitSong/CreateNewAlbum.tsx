import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { IconButton, TextInput } from "react-native-paper";
import { setCoverImage, setReleaseDate, setTitle } from "./album/album.actions";
import { AlbumState } from "./album/album.reducer";
import DatePicker from "./DatePicker";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

interface CreateNewAlbumProps {
  state: AlbumState;
  dispatch: React.Dispatch<any>;
  setCreateNewAlbumModalOpen: React.Dispatch<boolean>;
  setDateCallback: (date: Date | null) => void;
  setDateAlbumError: React.Dispatch<boolean>;
}

const CreateNewAlbum = ({
  state,
  dispatch,
  setCreateNewAlbumModalOpen,
  setDateCallback,
  setDateAlbumError,
}: CreateNewAlbumProps) => {
  const [dateOpen, setDateOpen] = useState(false);
  const styles = useStyles();

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
    if (!pickerResult.cancelled) dispatch(setCoverImage(pickerResult.uri));
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
        onChangeText={(text) => dispatch(setTitle(text))}
        value={state.title}
      />

      {/* Release date. Sets song release date after being chosen*/}
      <View style={[styles.inputSection]}>
        <DatePicker
          value={state.releaseDate ?? new Date()}
          onChange={(date: Date) => {
            dispatch(setReleaseDate(date));
            setDateCallback(date);
          }}
        />
      </View>

      {/* Cover image upload */}
      <View>
        <Button onPress={openImagePickerAsync}>Last opp coverbilde</Button>
        {state.coverImage && (
          <Image
            source={{ uri: state.coverImage }}
            style={{ width: 300, height: 300, resizeMode: "contain" }}
          />
        )}
      </View>
      {/*       <input
        required
        accept="image/*"
        style={{
          width: "1px",
          height: "1px",
          opacity: 0,
          display: "block",
          marginLeft: "10%",
          // overflow: "hidden",
          position: "relative",
          zIndex: -1,
        }}
        id="raised-button-file"
        type="file"
        onChange={({
          target: { validity, files },
        }: React.ChangeEvent<HTMLInputElement>) => {
          validity.valid && dispatch(setCoverImage(files?.length && files[0]));
        }}
      /> */}

      {/*   <div>
        {state.coverImage ? (
          <img
            src={URL.createObjectURL(state.coverImage)}
            alt="preview"
            style={{ maxWidth: "6rem" }}
          ></img>
        ) : (
          <div>Trykk på knappen for å laste opp bilde</div>
        )}
      </div> */}
    </View>
  );
};

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

export default CreateNewAlbum;

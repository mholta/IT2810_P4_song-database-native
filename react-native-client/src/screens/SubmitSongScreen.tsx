import React from "react";
import SubmitSong from "../components/SubmitSong/SubmitSong";

interface SubmitSongProps {
  navigation: any;
}

const SubmitSongScreen = ({ navigation }: SubmitSongProps) => {
  return <SubmitSong navigation={navigation} />;
};

export default SubmitSongScreen;

import { NavigationProp, ParamListBase } from "@react-navigation/core";
import React from "react";
import SubmitSong from "../components/SubmitSong/SubmitSong";

interface SubmitSongProps {
  navigation: NavigationProp<ParamListBase>;
}

const SubmitSongScreen = ({ navigation }: SubmitSongProps) => {
  return <SubmitSong navigation={navigation} />;
};

export default SubmitSongScreen;

import React from "react";
import { Text } from "react-native";
import { SongState } from "./song/song.reducer";

interface DatePickerProps {
  state: SongState;
  dispatch: React.Dispatch<any>;
}

const DatePicker = ({ state, dispatch }: DatePickerProps) => {
  return <Text>{state.releaseDate}</Text>;
};
export default DatePicker;

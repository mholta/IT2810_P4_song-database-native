import React from "react";
import { Text } from "react-native";
import { SongState } from "./song/song.reducer";

export interface DatePickerProps {
  value: Date;
  onChange: React.Dispatch<any>;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  return <Text>{value.toLocaleDateString()}</Text>;
};
export default DatePicker;

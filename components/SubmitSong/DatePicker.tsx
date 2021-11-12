import React from "react";
import { Text } from "react-native";
import { TextInput } from "react-native-paper";
import { SongState } from "./song/song.reducer";
import TextInputMask from "react-native-text-input-mask";

export interface DatePickerProps {
  value: Date | null;
  onChange: React.Dispatch<any>;
}

const DatePicker = ({ value, onChange }: DatePickerProps) => {
  if (value === null) {
    onChange(new Date());
  }
  return (
    <Text
    // render={(props) => (
    //   <TextInputMask {...props} mask="+[00] [000] [000] [000]" />
    // )}
    >
      {value?.toLocaleDateString()}
    </Text>
  );
};
export default DatePicker;

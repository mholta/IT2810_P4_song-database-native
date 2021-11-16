import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { TextInput } from "../generic/TextInput";
import { SongState } from "./song/song.reducer";

export interface DatePickerProps {
  value: Date;
  label: string;
  onChange: React.Dispatch<any>;
  onDateErrorChange: (error: boolean) => void;
}

const DatePicker = ({
  value,
  label,
  onChange,
  onDateErrorChange,
}: DatePickerProps) => {
  const [inputText, setInputText] = useState<string>(
    value.toLocaleDateString()
  );
  const [inputError, setInputError] = useState<boolean>(false);

  return (
    <TextInput
      value={inputText}
      error={inputError}
      label={label + " (DD/MM/YYYY)"}
      placeholder="DD/MM/YYYY"
      onChangeText={(newVal) => {
        setInputText(newVal);

        try {
          const [day, month, year] = newVal.split("/").map((s) => parseInt(s));
          if (!year || year < 1200)
            throw new Error("Year should be after 1200");
          const date = new Date(year, month - 1, day);

          onChange(date);
          setInputError(false);
          onDateErrorChange(false);
        } catch (e) {
          setInputError(true);
          onDateErrorChange(true);
        }
      }}
    />
  );
};
export default DatePicker;

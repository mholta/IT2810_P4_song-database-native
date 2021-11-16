import React from "react";
import { useState } from "react";
import { View, Platform, Button } from "react-native";
import NativeDatePicker from "@react-native-community/datetimepicker";
import { DatePickerProps } from "./DatePicker";

const DatePicker = ({ onChange, value }: DatePickerProps) => {
  const [show, setShow] = useState(false);
  if (Platform.OS !== "web") {
    return (
      <View>
        <Button
          onPress={() => setShow(true)}
          title={value?.toLocaleDateString() ?? "Velg utgivelsesdato"}
        />
        {show && (
          <NativeDatePicker
            accessibilityLabel="Choose date"
            value={value ?? new Date()}
            onChange={(_: any, selectedDate?: Date) => {
              setShow(Platform.OS === "ios");
              selectedDate && onChange(selectedDate);
            }}
            mode="date"
          />
        )}
      </View>
    );
  }

  return <></>;
};
export default DatePicker;

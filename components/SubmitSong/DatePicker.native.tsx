import React from "react";
import { useState } from "react";
import { View, Platform } from "react-native";
import NativeDatePicker from "@react-native-community/datetimepicker";
import { DatePickerProps } from "./DatePicker";

const DatePicker = ({ onChange, value }: DatePickerProps) => {
  if (Platform.OS !== "web") {
    return (
      <View>
        <NativeDatePicker
          accessibilityLabel="Choose date"
          value={value ?? new Date()}
          onChange={(_: any, selectedDate?: Date) => {
            selectedDate && onChange(selectedDate);
          }}
          mode="date"
        />
      </View>
    );
  }

  return <></>;
};
export default DatePicker;

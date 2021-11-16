import React from "react";
import { useState } from "react";
import { View, Platform, Button } from "react-native";
import NativeDatePicker from "@react-native-community/datetimepicker";
import { DatePickerProps } from "./DatePicker";

const DatePicker = ({ onChange, value }: DatePickerProps) => {
  const isIos = Platform.OS === "ios";

  const [show, setShow] = useState(isIos);

  return (
    <View>
      {!isIos && (
        <Button
          onPress={() => setShow(true)}
          title={value?.toLocaleDateString() ?? "Velg utgivelsesdato"}
        />
      )}
      {show && (
        <NativeDatePicker
          accessibilityLabel="Choose date"
          value={value}
          onChange={(_: any, selectedDate?: Date) => {
            setShow(isIos);
            selectedDate && onChange(selectedDate);
          }}
          mode="date"
        />
      )}
    </View>
  );
};
export default DatePicker;

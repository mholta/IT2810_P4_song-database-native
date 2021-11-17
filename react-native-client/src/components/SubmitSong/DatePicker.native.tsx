import React from "react";
import { useState } from "react";
import { View, Platform } from "react-native";
import NativeDatePicker from "@react-native-community/datetimepicker";
import { DatePickerProps } from "./DatePicker";
import { Button } from "react-native-elements";
import { customDateString } from "../../utils/customDateString";

const DatePicker = ({ onChange, value, label }: DatePickerProps) => {
  const isIos = Platform.OS === "ios";

  const [show, setShow] = useState(isIos);

  return (
    <View>
      {!isIos && (
        <Button
          onPress={() => setShow(true)}
          title={label + ": " + customDateString(value)}
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

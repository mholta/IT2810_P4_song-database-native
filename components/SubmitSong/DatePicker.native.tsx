import React from "react";
import { useState } from "react";
import { View, Platform, Text } from "react-native";
import NativeDatePicker from "react-native-date-picker";
import { Button } from "react-native-elements";

const DatePicker = ({}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  console.log(Platform.OS === "web");
  if (Platform.OS === "web") {
    return <Text>Hei</Text>;
  } else {
    return (
      <View>
        <Button title="Open" onPress={() => setOpen(true)} />
        <NativeDatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date: Date) => {
            setOpen(false);
            setDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    );
  }
};
export default DatePicker;

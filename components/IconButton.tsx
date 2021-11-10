import * as React from "react";
import { Linking, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";

interface IconButtonProps {
  href: string;
  text: string;
  icon: React.ReactNode;
}

export const IconButton = ({ href, icon, text }: IconButtonProps) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Linking.openURL(href);
      }}
    >
      {icon}
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
  },
  text: {
    marginLeft: 10,
    textDecorationLine: "underline",
    fontSize: 18,
  },
});

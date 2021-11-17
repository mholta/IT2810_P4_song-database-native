import * as React from "react";
import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { makeStyles } from "react-native-elements";
import { P } from "./Text";

interface IconButtonProps {
  href: string;
  text: string;
  icon: React.ReactNode;
}

export const IconButton = ({ href, icon, text }: IconButtonProps) => {
  const styles = useStyles();
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        Linking.openURL(href);
      }}
    >
      {icon}
      {text && <P style={styles.text}>{text}</P>}
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.layout?.space?.small,
  },
  text: {
    marginLeft: 10,
    textDecorationLine: "underline",
    fontSize: 18,
  },
}));

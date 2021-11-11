import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import { Button, makeStyles } from "react-native-elements";
import { P } from "../generic/Text";

interface SortSelectButtonProps {
  onPress: () => void;
  selected: boolean;
  title: string;
  value: string;
}

const SortSelectButton = ({
  onPress,
  selected,
  title,
  value,
}: SortSelectButtonProps) => {
  const styles = useStyles();

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <P>{title}</P>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  button: { marginBottom: theme.layout?.space?.small },
  buttonText: { fontSize: theme.fontSize?.h3 },
}));

export default SortSelectButton;

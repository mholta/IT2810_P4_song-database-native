import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import { Button, makeStyles, useTheme } from "react-native-elements";
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
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <P
        style={[
          styles.buttonText,
          {
            textDecorationLine: "underline",
            color: selected ? theme.colors?.primary : theme.colors?.text,
          },
        ]}
      >
        {title}
      </P>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles((theme) => ({
  button: { marginBottom: theme.layout?.space?.small },
  buttonText: { fontSize: theme.fontSize?.p ?? 1 * 1.2 },
}));

export default SortSelectButton;

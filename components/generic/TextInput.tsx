import React from "react";
import { makeStyles, useTheme } from "react-native-elements";
import { TextInput as RNTextInput } from "react-native-paper";
import { TextInputProps } from "react-native-paper/lib/typescript/components/TextInput/TextInput";

interface TextInputttProps extends Partial<TextInputProps> {}

export const TextInput = (props: TextInputttProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <RNTextInput
      {...props}
      style={[props.style, styles.textInput]}
      theme={{
        colors: {
          placeholder: theme.colors?.textFaded,
        },
      }}
    />
  );
};

const useStyles = makeStyles((theme) => ({
  textInput: {
    marginVertical: theme.layout?.space?.small,
    backgroundColor: theme.colors?.box,
    color: "red",
  },
}));

import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import { makeStyles } from "react-native-elements";

export const P = (props: Text["props"]) => {
  const styles = useStyles();
  const { style, children, ...otherProps } = props;

  return (
    <Text style={[styles.p, style]} {...otherProps}>
      {children}
    </Text>
  );
};

export const H2 = (props: Text["props"]) => {
  const styles = useStyles();
  const { style, children, ...otherProps } = props;

  return (
    <Text style={[styles.h2, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const useStyles = makeStyles((theme) => ({
  p: {
    color: theme.colors?.text,
    fontSize: theme.fontSize?.p,
  },
  h1: {
    color: theme.colors?.text,
    fontSize: theme.fontSize?.h1,
  },
  h2: {
    color: theme.colors?.text,
    fontWeight: "bold",
    fontSize: theme.fontSize?.h2,
    marginBottom: theme.layout?.space?.small,
    marginTop: theme.layout?.space?.med,
  },
}));

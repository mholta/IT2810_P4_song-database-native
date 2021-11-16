import React from "react";
import { View, ViewProps } from "react-native";
import { makeStyles } from "react-native-elements";

export const Box = (props: ViewProps) => {
  const styles = useStyles();
  const { style, children, ...otherProps } = props;

  return (
    <View style={[styles.box, style]} {...otherProps}>
      {children}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  box: {
    backgroundColor: theme.colors?.box,
    padding: theme.layout?.space?.med,
    borderRadius: theme.layout?.borderRadius?.default,
    flex: 1,
    marginVertical: theme.layout?.space?.med,
  },
}));

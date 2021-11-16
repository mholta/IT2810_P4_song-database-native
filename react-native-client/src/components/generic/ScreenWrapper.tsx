import React from "react";
import { ScrollView } from "react-native";
import { makeStyles } from "react-native-elements";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScrollContainer = ({ children }: ScreenWrapperProps) => {
  const styles = useStyles();
  return <ScrollView style={styles.screenWrapper}>{children}</ScrollView>;
};

const useStyles = makeStyles((theme) => ({
  screenWrapper: {
    flex: 1,
    padding: theme.layout?.padding?.screen,
  },
}));

export default ScrollContainer;

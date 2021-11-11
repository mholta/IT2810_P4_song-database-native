import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, Text, View } from "react-native";
import { makeStyles } from "react-native-elements";

const InfoScreen = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Informasjon</Text>
      <View style={styles.separator} />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
}));

export default InfoScreen;

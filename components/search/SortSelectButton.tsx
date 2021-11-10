import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

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
  return (
    <Button
      title={title}
      onPress={onPress}
      type={selected ? "solid" : "outline"}
      style={styles.button}
    />
  );
};

const styles = StyleSheet.create({
  button: {},
});

export default SortSelectButton;

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { View, TouchableOpacity } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";

interface FilterButtonProps {
  onDropdownClose: () => void;
  onDropdownOpen: () => void;
  dropdownIsOpen: boolean;
}

const FilterButton = ({
  onDropdownClose,
  onDropdownOpen,
  dropdownIsOpen,
}: FilterButtonProps) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={dropdownIsOpen ? onDropdownClose : onDropdownOpen}
        style={styles.button}
      >
        <FontAwesomeIcon
          icon={dropdownIsOpen ? "times" : "sliders-h"}
          size={dropdownIsOpen ? 28 : 22}
          color={theme.colors?.textFaded}
        />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: theme.layout?.padding?.modal,
    backgroundColor: "transparent",
    marginRight: theme.layout?.space?.small,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 10,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
  },
}));

export default FilterButton;

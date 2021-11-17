import React, { useState } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { makeStyles } from "react-native-elements";
import FilterDropdown from "./FilterDropdown";
import SearchInput from "./SearchInput";
import FilterButton from "./FilterButton";

const SearchFilterWrapper = () => {
  const styles = useStyles();
  const [dropdownIsOpen, setFilterMenuDropdownIsOpen] =
    useState<boolean>(false);
  const openDropdown = () => setFilterMenuDropdownIsOpen(true);
  const closeDropdown = () => setFilterMenuDropdownIsOpen(false);

  return (
    <View
      style={[[styles.container, { height: dropdownIsOpen ? "100%" : "auto" }]]}
    >
      <View style={styles.topBarContainer}>
        {/* Search bar */}
        <SearchInput />

        {/* Filter button */}
        <FilterButton
          onDropdownOpen={openDropdown}
          onDropdownClose={closeDropdown}
          dropdownIsOpen={dropdownIsOpen}
        />
      </View>

      {/* Dropdown */}
      {dropdownIsOpen && <FilterDropdown />}

      {/* Backdrop */}
      <TouchableWithoutFeedback
        style={[styles.backdrop, { display: dropdownIsOpen ? "flex" : "none" }]}
        onPress={closeDropdown}
      >
        <View style={styles.backdrop}></View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  topBarContainer: {
    top: 0,
    left: 0,
    height: 66,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors?.grey3,
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    justifyContent: "flex-start",
  },
  backdrop: {
    flexGrow: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
}));

export default SearchFilterWrapper;

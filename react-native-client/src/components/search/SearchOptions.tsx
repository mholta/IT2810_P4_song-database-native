import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { makeStyles } from "react-native-elements";
import RNModal from "react-native-modal";
import { useSelector } from "react-redux";
import useColorScheme from "../../hooks/useColorScheme";
import { RootState } from "../../redux";
import { toggleThemeSelection } from "../../redux/filter/filter.actions";
import { Box } from "../generic/Box";
import Categories from "./Categories";

const SearchOptions = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const allThemes = useSelector(
    (rootState: RootState) => rootState.filter.allThemes
  );
  const selectedThemes = useSelector(
    (rootState: RootState) => rootState.filter.selectedThemes
  );

  const colorScheme = useColorScheme();

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={openModal} style={styles.button}>
        <FontAwesomeIcon
          icon="sliders-h"
          size={20}
          color={colorScheme === "dark" ? "#ddd" : "#111"}
        />
      </TouchableOpacity>
      <RNModal
        isVisible={modalIsOpen}
        onBackdropPress={closeModal}
        useNativeDriverForBackdrop
        swipeDirection="down"
      >
        <ScrollView>
          <Box style={{ flex: 0 }}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <FontAwesomeIcon
                icon="times"
                size={30}
                color={colorScheme === "dark" ? "#ddd" : "#111"}
              />
            </TouchableOpacity>
            <View>
              <Categories
                title="Tema"
                allCategories={allThemes}
                selectedCategories={selectedThemes}
                toggleActiveCategoryFunction={toggleThemeSelection}
              />
            </View>
          </Box>
        </ScrollView>
      </RNModal>
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

export default SearchOptions;

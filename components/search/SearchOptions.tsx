import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import ReactNativeModal from "react-native-modal";
import { useSelector } from "react-redux";
import useColorScheme from "../../hooks/useColorScheme";
import { RootState } from "../../redux";
import { toggleThemeSelection } from "../../redux/filter/filter.actions";
import { View } from "../Themed";
import Categories from "./Categories";
import SortSelect from "./SortSelect";

const SearchOptions = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(true);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const allThemes = useSelector(
    (rootState: RootState) => rootState.filter.allThemes
  );
  const selectedThemes = useSelector(
    (rootState: RootState) => rootState.filter.selectedThemes
  );

  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={openModal} style={styles.button}>
          <FontAwesomeIcon
            icon="sliders-h"
            size={20}
            color={colorScheme === "dark" ? "#ddd" : "#111"}
          />
        </TouchableOpacity>
      </View>
      <ReactNativeModal isVisible={modalIsOpen} onBackdropPress={closeModal}>
        <ScrollView>
          <Button title="Lukk" onPress={closeModal} />
          <SortSelect />
          <View style={styles.centeredView}>
            <Categories
              title="Tema"
              allCategories={allThemes}
              selectedCategories={selectedThemes}
              toggleActiveCategoryFunction={toggleThemeSelection}
            />
          </View>
        </ScrollView>
      </ReactNativeModal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    padding: 10,
  },
  button: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  container: {
    display: "flex",
    flexDirection: "row",
  },
});

export default SearchOptions;
import React from "react";
import { ScrollView, View } from "react-native";
import { makeStyles } from "react-native-elements";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { toggleThemeSelection } from "../../redux/filter/filter.actions";
import Categories from "./Categories";

const FilterDropdown = () => {
  const styles = useStyles();

  const allThemes = useSelector(
    (rootState: RootState) => rootState.filter.allThemes
  );
  const selectedThemes = useSelector(
    (rootState: RootState) => rootState.filter.selectedThemes
  );

  return (
    <ScrollView style={styles.dropdown}>
      <View style={styles.item}>
        <Categories
          title="Tema"
          allCategories={allThemes}
          selectedCategories={selectedThemes}
          toggleActiveCategoryFunction={toggleThemeSelection}
        />
      </View>
    </ScrollView>
  );
};

const useStyles = makeStyles((theme) => ({
  item: {
    backgroundColor: theme.colors?.dropdown,
    padding: theme.layout?.padding?.screen,
    paddingBottom: (theme.layout?.padding?.screen ?? 1) * 2,
  },
  dropdown: {
    flexGrow: 0,
  },
}));

export default FilterDropdown;

import React from "react";
import { Text, View } from "react-native";
import { makeStyles, useTheme } from "react-native-elements";
import { Chip } from "react-native-paper";
import { useDispatch } from "react-redux";
import { FilterCategory } from "../../redux/filter/filter.reducer";
import { H2 } from "../generic/Text";

interface CategoriesProps {
  title: string;
  allCategories: FilterCategory[];
  selectedCategories: FilterCategory[];
  toggleActiveCategoryFunction: Function;
}

const Categories = ({
  title,
  allCategories,
  selectedCategories,
  toggleActiveCategoryFunction,
}: CategoriesProps) => {
  const dispatch = useDispatch();

  const categoriesInOrder = [
    ...selectedCategories,
    ...allCategories.filter((c) => !selectedCategories.includes(c)),
  ];

  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View>
      <H2>{title}</H2>
      <View style={styles.categoriesList}>
        {categoriesInOrder.map((category, index) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <Chip
              key={"category" + title + index}
              mode="outlined"
              selected={isSelected}
              onPress={() => dispatch(toggleActiveCategoryFunction(category))}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: isSelected
                    ? theme.colors?.primary
                    : theme.colors?.white,
                },
              ]}
            >
              {category.title}
            </Chip>
          );
        })}
      </View>
    </View>
  );
};

const useStyles = makeStyles({
  categoriesList: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: -5,
    position: "relative",
    zIndex: -1,
  },
  categoryButton: {
    margin: 5,
  },
});

export default Categories;

import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import { useDispatch } from "react-redux";
import { FilterCategory } from "../../redux/filter/filter.reducer";
import { Text, View } from "../Themed";

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

  return (
    <View>
      <Text>{title}</Text>
      <View style={styles.categoriesList}>
        {categoriesInOrder.map((category, index) => (
          <Button
            key={"category" + title + index}
            title={category.title}
            type={selectedCategories.includes(category) ? "solid" : "outline"}
            onPress={() => dispatch(toggleActiveCategoryFunction(category))}
            style={styles.categoryButton}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

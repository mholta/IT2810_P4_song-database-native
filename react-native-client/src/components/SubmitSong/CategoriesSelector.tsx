import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
  makeStyles,
  useTheme,
  Button,
  ButtonProps,
} from 'react-native-elements';
import { Chip } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { FilterCategory } from '../../redux/filter/filter.reducer';

interface CategoriesSelectorProps {
  onChangeSelection: Function;
}

/**
 * Button that opens a modal with a list of categories that can be selected.
 * Categories are displayed under the button when selected.
 */
export const CategoriesSelector = (props: CategoriesSelectorProps) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    FilterCategory[]
  >([]);

  const allCategories = useSelector(
    (rootState: RootState) => rootState.filter.allThemes
  );

  const addRemoveCategory = (category: FilterCategory, isSelected: boolean) => {
    let newSelectedCategories;
    if (isSelected) {
      newSelectedCategories = selectedCategories.filter((c) => c != category);
    } else {
      newSelectedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(newSelectedCategories);
    props.onChangeSelection(newSelectedCategories);
  };

  return (
    <View style={styles.container}>
      <Button
        type="outline"
        title="Velg tema"
        onPress={() => {
          setModalVisible(true);
        }}
        {...props}
        style={styles.button}
      />

      <View style={styles.categoryList}>
        {selectedCategories.map((category, index) => (
          <Chip
            key={'category' + index}
            mode="flat"
            style={styles.categoryListItem}
            onClose={() => addRemoveCategory(category, true)}
          >
            {category.title}
          </Chip>
        ))}
      </View>

      <Modal
        isVisible={modalVisible}
        swipeDirection="down"
        onBackdropPress={() => setModalVisible(false)}
      >
        {allCategories.map((category, index) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <Chip
              key={'category' + index}
              mode="outlined"
              selected={isSelected}
              onPress={() => addRemoveCategory(category, isSelected)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: isSelected
                    ? theme.colors?.primary
                    : theme.colors?.background,
                },
              ]}
            >
              {category.title}
            </Chip>
          );
        })}
      </Modal>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.layout?.padding?.med,
    backgroundColor: theme.colors?.box,
    borderRadius: 5,
  },
  button: {
    margin: 5,
    backgroundColor: theme.colors?.background,
  },
  categoryButton: {
    margin: 5,
  },
  categoryList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    position: 'relative',
  },
  categoryListItem: {
    margin: 5,
    color: theme.colors?.text,
    backgroundColor: theme.colors?.grey0,
  },
}));

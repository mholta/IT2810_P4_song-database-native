import { Picker as RNPicker, PickerProps } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Button, makeStyles, useTheme } from "react-native-elements";
import { Platform, TouchableWithoutFeedback, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setSortOptions } from "../../redux/filter/filter.actions";
import { SortOptions } from "../../redux/filter/filter.reducer";

interface SearchSortingProps {}

const SearchSorting = ({}: SearchSortingProps) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const sortOptionsRedux: SortOptions = useSelector(
    (rootState: RootState) => rootState.filter.sortOptions
  );

  const dispatch = useDispatch();

  const showRelevanceSortOption: boolean = useSelector(
    (rootState: RootState) => rootState.filter.searchString
  )
    ? true
    : false;

  const options: SortOptionWithDisplayName[] = showRelevanceSortOption
    ? [relevanceSortOption, ...sortOptions]
    : [...sortOptions];

  const currentSortOptionString: string = getSortOptionFromTypeAndOrder(
    (sortOptionsRedux?.sortType ?? options[0].sortType) as SortType,
    (sortOptionsRedux?.order ?? options[0].order) as SortOrder
  )
    .displayName.split("")
    .map((e, i) => (i ? e : e.toLowerCase()))
    .join("");

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const isIos: boolean = Platform.OS === "ios";

  const Picker = (props: PickerProps) => (
    <RNPicker
      {...props}
      selectedValue={
        sortOptionsRedux
          ? sortOptionObjectToString(sortOptionsRedux)
          : sortOptionObjectToString(options[0])
      }
      onValueChange={(itemValue: string) => {
        dispatch(
          setSortOptions(
            itemValue === "relevance--desc"
              ? null
              : typeAndOrderFromSortOptionString(itemValue)
          )
        );
      }}
    >
      {options.map((option: SortOptionWithDisplayName, i) => (
        <RNPicker.Item
          key={"sort-option-" + i}
          label={option.displayName}
          color={theme.colors?.text}
          value={sortOptionObjectToString(option)}
        />
      ))}
    </RNPicker>
  );

  if (isIos)
    return (
      <View style={[styles.container, { height: isOpen ? "100%" : "auto" }]}>
        {/* Backdrop */}
        <TouchableWithoutFeedback
          style={[styles.backdrop, { display: isOpen ? "flex" : "none" }]}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.backdrop}></View>
        </TouchableWithoutFeedback>

        {/* Picker in modal */}
        {isOpen && (
          <View style={styles.modal}>
            <Picker />
          </View>
        )}

        {/* Bottom button */}
        <View
          style={[
            styles.bottomContainer,
            {
              backgroundColor: isOpen
                ? theme.colors?.barSolid
                : theme.colors?.barTransparent,
            },
          ]}
        >
          <Button
            type="clear"
            onPress={() => setIsOpen(!isOpen)}
            title={isOpen ? "Lukk" : "Sorterer på " + currentSortOptionString}
            style={{
              alignItems: "flex-end",
            }}
          />
        </View>
      </View>
    );

  if (isOpen) setIsOpen(false);

  /* Else */
  return (
    <View style={[styles.container, { height: "auto" }]}>
      {/* Bottom button */}
      <View
        style={[
          styles.bottomContainer,
          {
            backgroundColor: isOpen
              ? theme.colors?.barSolid
              : theme.colors?.barTransparent,
          },
        ]}
      >
        <Picker
          style={{
            color:
              Platform.OS === "web"
                ? theme.colors?.background
                : theme.colors?.text,
          }}
        />
      </View>
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  bottomContainer: {
    position: "relative",
    bottom: 0,
    left: 0,
    height: 60,
    flexGrow: 0,
    width: "100%",
    padding: theme.layout?.padding?.screen,
    display: "flex",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: theme.colors?.dropdown,
  },
  backdrop: {
    flexGrow: 1,
    backgroundColor: theme.colors?.backdrop,
  },
}));

export enum SortType {
  RELEASE_DATE = "releaseDate",
  TITLE = "title",
  ARTISTS = "artists",
  RELEVANCE = "relevance",
}

interface SortOptionWithDisplayName extends SortOptions {
  displayName: string;
  isDefaultValue?: boolean;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export const getSortOptionFromTypeAndOrder = (
  sortType: SortType,
  sortOrder: SortOrder
): SortOptionWithDisplayName => {
  switch (sortType) {
    case SortType.RELEASE_DATE:
      return sortOrder === SortOrder.DESC ? sortOptions[0] : sortOptions[1];

    case SortType.TITLE:
      return sortOrder === SortOrder.ASC ? sortOptions[2] : sortOptions[3];

    case SortType.ARTISTS:
      return sortOrder === SortOrder.ASC ? sortOptions[4] : sortOptions[5];

    case SortType.RELEVANCE:
      return relevanceSortOption;

    default:
      return sortOptions[0];
  }
};

const sortOptionObjectToString = (sortOptions: SortOptions): string => {
  return sortOptions.sortType + "--" + sortOptions.order;
};

const sortOptionIsEqual = (a: SortOptions, b: SortOptions) =>
  sortOptionObjectToString(a) === sortOptionObjectToString(b);

const sortOptionsWithDisplayNameToPlainSortOptions = (
  sortOptionsWithDisplayName: SortOptionWithDisplayName
): SortOptions => ({
  order: sortOptionsWithDisplayName.order,
  sortType: sortOptionsWithDisplayName.sortType,
});

const typeAndOrderFromSortOptionString = (
  sortOptionString: string
): SortOptions => {
  const strings: string[] = sortOptionString.split("--");
  const sortType = strings[0] as SortType;
  const order = strings[1] as SortOrder;

  return { sortType, order };
};

const relevanceSortOption: SortOptionWithDisplayName = {
  displayName: "Relevanse",
  sortType: SortType.RELEVANCE,
  order: SortOrder.DESC,
};

const sortOptions: SortOptionWithDisplayName[] = [
  {
    displayName: "Nyeste",
    sortType: SortType.RELEASE_DATE,
    order: SortOrder.DESC,
  },
  {
    displayName: "Eldste",
    sortType: SortType.RELEASE_DATE,
    order: SortOrder.ASC,
  },
  {
    displayName: "Tittel A-Å",
    sortType: SortType.TITLE,
    order: SortOrder.ASC,
  },
  {
    displayName: "Tittel Å-A",
    sortType: SortType.TITLE,
    order: SortOrder.DESC,
  },
  {
    displayName: "Artist A-Å",
    sortType: SortType.ARTISTS,
    order: SortOrder.ASC,
  },
  {
    displayName: "Artist Å-A",
    sortType: SortType.ARTISTS,
    order: SortOrder.DESC,
  },
];

export default SearchSorting;

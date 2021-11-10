import { Picker } from "@react-native-picker/picker";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setSortOptions } from "../../redux/filter/filter.actions";
import { SortOptions } from "../../redux/filter/filter.types";
import { Text, View } from "../Themed";

const SortSelect = () => {
  const sortOptionsRedux: SortOptions = useSelector(
    (rootState: RootState) => rootState.filter.sortOptions
  );
  const dispatch = useDispatch();
  const selectedSortOption = sortOptionObjectToString(sortOptionsRedux);

  return (
    <View>
      <Text>
        <Picker
          selectedValue={selectedSortOption}
          onValueChange={(itemValue, itemIndex) =>
            dispatch(
              setSortOptions(typeAndOrderFromSortOptionString(itemValue))
            )
          }
        >
          {sortOptions.map((sortOption, i) => {
            console.log(sortOption);

            return (
              <Picker.Item
                key={"sortOption" + i}
                label={sortOption.displayName}
                value={sortOptionObjectToString(sortOption)}
              />
            );
          })}
        </Picker>
      </Text>
    </View>
  );
};

export default SortSelect;

export enum SortType {
  RELEASE_DATE = "releaseDate",
  TITLE = "title",
  ARTISTS = "artists",
  RELEVANCE = "relevance",
}

interface SortOption extends SortOptions {
  displayName: string;
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export const getSortOptionFromTypeAndOrder = (
  sortType: SortType,
  sortOrder: SortOrder
): SortOption => {
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
  return sortOptions.sortType + "--" + sortOptions.sortOrder;
};

const typeAndOrderFromSortOptionString = (
  sortOptionString: string
): SortOptions => {
  const strings: string[] = sortOptionString.split("--");
  const sortType = strings[0] as SortType;
  const sortOrder = strings[1] as SortOrder;

  return { sortType, sortOrder };
};

const relevanceSortOption: SortOption = {
  displayName: "relevanse",
  sortType: SortType.RELEVANCE,
  sortOrder: SortOrder.DESC,
};

const sortOptions: SortOption[] = [
  {
    displayName: "nyeste",
    sortType: SortType.RELEASE_DATE,
    sortOrder: SortOrder.DESC,
  },
  {
    displayName: "eldste",
    sortType: SortType.RELEASE_DATE,
    sortOrder: SortOrder.ASC,
  },
  {
    displayName: "Tittel A-Å",
    sortType: SortType.TITLE,
    sortOrder: SortOrder.ASC,
  },
  {
    displayName: "Tittel Å-A",
    sortType: SortType.TITLE,
    sortOrder: SortOrder.DESC,
  },
  {
    displayName: "Artist A-Å",
    sortType: SortType.ARTISTS,
    sortOrder: SortOrder.ASC,
  },
  {
    displayName: "Artist Å-A",
    sortType: SortType.ARTISTS,
    sortOrder: SortOrder.DESC,
  },
];

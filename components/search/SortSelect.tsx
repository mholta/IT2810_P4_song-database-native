import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import { setSortOptions } from "../../redux/filter/filter.actions";
import { SortOptions } from "../../redux/filter/filter.types";
import { Text, View } from "../Themed";
import SortSelectButton from "./SortSelectButton";

const SortSelect = () => {
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

  return (
    <View>
      <Text>Sorter på:</Text>
      <View>
        {options.map((option: SortOptionWithDisplayName, i) => (
          <SortSelectButton
            key={"sort-option-" + i}
            title={option.displayName}
            value={sortOptionObjectToString(option)}
            selected={sortOptionIsEqual(option, sortOptionsRedux)}
            onPress={() =>
              dispatch(
                setSortOptions(
                  sortOptionsWithDisplayNameToPlainSortOptions(option)
                )
              )
            }
          />
        ))}
      </View>
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

interface SortOptionWithDisplayName extends SortOptions {
  displayName: string;
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
  displayName: "relevanse",
  sortType: SortType.RELEVANCE,
  order: SortOrder.DESC,
};

const sortOptions: SortOptionWithDisplayName[] = [
  {
    displayName: "nyeste",
    sortType: SortType.RELEASE_DATE,
    order: SortOrder.DESC,
  },
  {
    displayName: "eldste",
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

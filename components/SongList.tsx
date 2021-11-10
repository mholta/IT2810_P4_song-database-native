import { useQuery, gql } from "@apollo/client";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Song } from "../api/types";
import { SongListItem } from "../components/SongListItem";
import { View } from "../components/Themed";
import { RootState } from "../redux";
import { SortOptions } from "../redux/filter/filter.types";

interface SongListProps {
  navigation: any;
}

export const SongList = ({ navigation }: SongListProps) => {
  const searchString = useSelector(
    (rootState: RootState) => rootState.filter.searchString
  );
  const selectedThemes: string[] = useSelector(
    (rootState: RootState) => rootState.filter.selectedThemes
  ).map((e) => e._id);
  const sortOptions: SortOptions = useSelector(
    (rootState: RootState) => rootState.filter.sortOptions
  );

  const options = {
    variables: {
      searchString: searchString,
      themes: selectedThemes,
      contributor: undefined,
      ...sortOptions,
    },
  };

  const { loading, error, data, fetchMore } = useQuery(GET_SEARCH_RESULTS, {
    ...options,
    variables: {
      ...options?.variables,
      limit: 20,
      page: 1,
    },
  });

  const [songs, setSongs] = React.useState<Song[]>([]);
  const [loadedPageNum, setLoadedPageNum] = React.useState<number>(1);
  const [lastPageNum, setLastPageNum] = React.useState<number>(1);

  // Set initial songs fetched
  useEffect(() => {
    if (data?.songs?.songs) setSongs(data.songs.songs);
  }, [data]);

  // Set total amount of pages count
  useEffect(() => {
    data?.songs?.pages && setLastPageNum(data?.songs?.pages);
  }, [data?.songs?.pages]);

  const loadNextPage = () => {
    if (loadedPageNum < lastPageNum) {
      fetchMore({
        variables: {
          page: loadedPageNum + 1,
        },
      });
      setLoadedPageNum(loadedPageNum + 1);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("SongScreen", { songId: item._id })}
    >
      <SongListItem song={item} key={item._id} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {!loading && (
        <FlatList
          data={songs}
          renderItem={renderItem}
          style={styles.listView}
          keyExtractor={(item) => item._id}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.25}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  listView: {
    width: "100%",
    padding: 10,
  },
});

const GET_SEARCH_RESULTS = gql`
  query Songs(
    $searchString: String
    $themes: [String!]
    $contributor: String
    $sortOrder: SortOrder!
    $sortType: SortType!
    $page: Int!
    $limit: Int!
  ) {
    songs(
      searchString: $searchString
      filter: { categories: $themes, contributor: $contributor }
      limit: $limit
      page: $page
      sorting: { order: $sortOrder, sortType: $sortType }
    ) {
      songs {
        _id
        artists {
          name
        }
        title
        album {
          picture
        }
      }
      pages
    }
  }
`;

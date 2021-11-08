import { useQuery, gql } from "@apollo/client";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Song } from "../api/types";
import { SongListItem } from "../components/SongListItem";
import { View } from "../components/Themed";

export const SongList = () => {
  const options = {
    variables: {
      searchString: "",
      themes: undefined,
      contributor: undefined,
      sortOrder: "asc",
      sortType: "releaseDate",
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
  React.useEffect(() => {
    if (data?.songs?.songs) setSongs(data.songs.songs);
  }, [data]);

  // Set total amount of pages count
  React.useEffect(() => {
    data?.songs?.pages && setLastPageNum(data?.songs?.pages);
  }, [data?.songs?.pages]);

  const loadNextPage = () => {
    if (loadedPageNum < lastPageNum) {
      fetchMore({
        variables: {
          page: loadedPageNum + 1,
        },
      })
        .then((fetchMoreResult: any) => {
          if (fetchMoreResult.data?.songs?.songs) {
            setSongs([...songs, ...fetchMoreResult.data.songs.songs]);
          }
        })
        .then(() => setLoadedPageNum(loadedPageNum + 1));
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <SongListItem song={item} key={item._id} />
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

import { useQuery, gql } from "@apollo/client";
import * as React from "react";
import { useSelector } from "react-redux";
import { FlatList, TouchableOpacity, View } from "react-native";
import { SongListItem } from "../components/SongListItem";
import { RootState } from "../redux";
import { SortOptions } from "../redux/filter/filter.reducer";
import { makeStyles } from "react-native-elements";

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
  const sortOptions: SortOptions | null = useSelector(
    (rootState: RootState) => rootState.filter.sortOptions
  );
  const options = {
    variables: {
      searchString: searchString,
      themes: selectedThemes.sort(),
      contributor: undefined,
      sortOptions: sortOptions,
    },
  };

  const { data, previousData, fetchMore } = useQuery(GET_SEARCH_RESULTS, {
    ...options,
    variables: {
      ...options?.variables,
      limit: 20,
      page: 1,
    },
  });
  const [loadedPageNum, setLoadedPageNum] = React.useState<number>(1);

  const loadNextPage = () => {
    if (loadedPageNum < (data?.songs?.pages ?? 1)) {
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

  const styles = useStyles();

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.songs?.songs ?? previousData?.songs?.songs ?? []}
        renderItem={renderItem}
        style={styles.listView}
        keyExtractor={(item) => item._id}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.25}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 66,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: theme.colors?.background,
  },
  listView: {
    width: "100%",
    padding: theme.layout?.padding?.med,
    backgroundColor: "transparent",
  },
}));

const GET_SEARCH_RESULTS = gql`
  query Songs(
    $searchString: String
    $themes: [String!]
    $contributor: String
    $sortOptions: Sorting
    $page: Int!
    $limit: Int!
  ) {
    songs(
      searchString: $searchString
      filter: { categories: $themes, contributor: $contributor }
      limit: $limit
      page: $page
      sorting: $sortOptions
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

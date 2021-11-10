import React from "react";
import { useEffect, useRef, useState } from "react";
import { useQuery, DocumentNode } from "@apollo/client";
import {
  Text,
  FlatList,
  TextInput,
  View,
  StyleSheet,
  ListRenderItem,
  TouchableWithoutFeedback,
} from "react-native";
import Modal from "react-native-modal";
import { SearchBar, Button } from "react-native-elements";

type SearchKey = "name" | "title";

type ArtistOrAlbum = {
  [searchKey in SearchKey]: string;
} & {
  _id: string;
  releaseDate?: Date;
};

interface Variables {
  name?: string;
  title?: string;
  offset?: number;
  limit?: number;
  artist?: string;
}
interface DropdownSearchProps {
  setValueCallback: (value: string) => void;
  setDateCallback?: (date: Date | null) => void;
  query: DocumentNode;
  variables: Variables;
  searchKey: SearchKey;
  label: string;
  dataKey: string;
  id: string;
  required: boolean;
  labelPreposition: string;
  noOptionsComponent?: React.ReactNode;
}
interface ItemProp {
  _id: string;
  text: string;
}

const DropdownSearch = ({
  setValueCallback,
  setDateCallback,
  query,
  variables,
  searchKey,
  label,
  dataKey,
  labelPreposition,
  noOptionsComponent,
}: DropdownSearchProps) => {
  const [options, setOptions] = useState<readonly ArtistOrAlbum[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [previousInputValue, setPreviousInputValue] = useState<string>(" ");
  const [modalVisible, setModalVisible] = useState(false);
  const [chosen, setChosen] = useState("");
  const [noMore, setNoMore] = useState(false);
  const [elementCount, setElementCount] = useState<number>(0);
  const { loading, error, refetch, fetchMore } = useQuery(query, {
    variables: variables,
  });
  useEffect(() => {
    if (previousInputValue !== inputValue) {
      (async () => {
        setPreviousInputValue(inputValue);
        const variables: Variables = { name: inputValue };
        await refetch(variables).then(({ data }) => {
          setElementCount(data[dataKey].length);
          setOptions(data[dataKey]);
          setNoMore(data[dataKey].length < (variables.limit || 50));
        });
      })();
    }
    if (inputValue === "") {
      setPreviousInputValue("");
    }
  }, [loading, inputValue]);

  const Item = ({ text, _id }: ItemProp) => {
    return (
      <View style={styles.item}>
        <Button
          type="clear"
          onPress={() => {
            setModalVisible(false);
            setValueCallback(_id);
            setChosen(text);
          }}
          title={text}
        />
      </View>
    );
  };
  const loadMore = () => {
    if (elementCount > 0 && !noMore) {
      fetchMore({
        variables: {
          offset: elementCount,
        },
      })
        .then((fetchMoreResult: any) => {
          if (fetchMoreResult.data[dataKey]) {
            setOptions([...options, ...fetchMoreResult.data[dataKey]]);
            return fetchMoreResult.data[dataKey].length;
          }
          return 0;
        })
        .then((skip: number) => {
          if (skip < (variables.limit || 50)) {
            setNoMore(true);
          } else {
            setElementCount(elementCount + skip);
          }
        });
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const renderItem: ListRenderItem<ArtistOrAlbum> = ({ item, index }) => {
    return <Item text={item[searchKey]} _id={item._id} />;
  };
  const seperator = () => {
    return <View style={styles.seperator} />;
  };
  return (
    <View>
      <Text>{label.replace(/^\w/, (match) => match.toUpperCase())}</Text>
      <Button
        type="outline"
        title={
          chosen === ""
            ? `Velg ${labelPreposition} ${label}`
            : `${label.replace(/^\w/, (match) =>
                match.toUpperCase()
              )}: ${chosen}`
        }
        style={{ width: "auto" }}
        onPress={openModal}
      />

      <Modal
        isVisible={modalVisible}
        swipeDirection="down"
        onBackdropPress={closeModal}
        // style={styles.modal}
      >
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={
              <SearchBar
                placeholder={`Søk etter ${labelPreposition} ${label}`}
                style={styles.input}
                autoCorrect={false}
                // @ts-ignore onChangeText-types for searchbar is currently broken https://github.com/react-native-elements/react-native-elements/issues/3089
                onChangeText={(newInputValue: string) => {
                  setInputValue(newInputValue);
                }}
                round={false}
                // lightTheme={true}
                onFocus={openModal}
                onBlur={openModal}
                clearButtonMode={"always"}
                value={inputValue}
                //@ts-ignore probably same error as above. & is used insted of | https://github.com/react-native-elements/react-native-elements/issues/3089
                searchIcon={null}
              />
            }
            data={options}
            keyExtractor={(_, index) => label + "-" + index}
            renderItem={renderItem}
            ItemSeparatorComponent={seperator}
            onEndReached={loadMore}
            onEndReachedThreshold={0.25}
          ></FlatList>
          {options.length === 0 && inputValue !== "" && noOptionsComponent}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 20,
    padding: 12,
  },
  item: {
    margin: 20,
  },
  seperator: {
    height: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    top: 20,
    marginBottom: 20,
    // width: "80%",
    position: "relative",
    alignSelf: "center",
    // padding: "1px",
    borderRadius: 10,
    backgroundColor: "black",
  },
});
export default DropdownSearch;

import React from "react";
import { useEffect, useState } from "react";
import { useQuery, DocumentNode } from "@apollo/client";
import {
  FlatList,
  View,
  ListRenderItem,
  useWindowDimensions,
} from "react-native";
import Modal from "react-native-modal";
import { SearchBar, Button, makeStyles, useTheme } from "react-native-elements";

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
  const styles = useStyles();
  const { theme } = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const [chosen, setChosen] = useState("");
  const [previousDataLength, setPreviousDataLength] = useState<number>(0);
  const [variable, setVariable] = useState(variables);
  const { data, previousData, loading, error, fetchMore } = useQuery(query, {
    variables: variable,
  });

  const loadMore = () => {
    if (
      data &&
      data[dataKey].length > 0 &&
      previousDataLength + (variables.limit || 50) == data[dataKey].length
    ) {
      setPreviousDataLength(data[dataKey].length);
      fetchMore({
        variables: {
          offset: data[dataKey].length,
        },
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
    return (
      <View style={styles.item}>
        <Button
          type="clear"
          onPress={() => {
            setModalVisible(false);
            setValueCallback(item._id);
            if (setDateCallback && item.releaseDate) {
              console.log(item.releaseDate);
              setDateCallback(item.releaseDate);
            }
            setChosen(item[searchKey]);
          }}
          title={item[searchKey]}
        />
      </View>
    );
  };
  const seperator = () => {
    return <View style={styles.seperator} />;
  };
  return (
    <View>
      <Button
        type="outline"
        title={
          chosen === ""
            ? `Velg ${labelPreposition} ${label} *`
            : `${label.replace(/^\w/, (match) =>
                match.toUpperCase()
              )}: ${chosen}`
        }
        style={{ width: "auto" }}
        onPress={openModal}
      />

      <Modal isVisible={modalVisible} onBackdropPress={closeModal}>
        <View style={styles.container}>
          <FlatList
            ListHeaderComponent={
              <SearchBar
                placeholder={`Søk etter ${labelPreposition} ${label}`}
                style={styles.input}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.input}
                placeholderTextColor={theme.colors?.textFaded}
                autoCorrect={false}
                // @ts-ignore onChangeText-types for searchbar is currently broken https://github.com/react-native-elements/react-native-elements/issues/3089
                onChangeText={(newInputValue: string) => {
                  setVariable({ ...variable, [searchKey]: newInputValue });
                }}
                round={false}
                onFocus={openModal}
                onBlur={openModal}
                clearButtonMode={"always"}
                value={variable[searchKey] ?? ""}
                //@ts-ignore probably same error as above. & is used insted of | https://github.com/react-native-elements/react-native-elements/issues/3089
                searchIcon={null}
              />
            }
            data={
              data ? data[dataKey] : previousData ? previousData[dataKey] : []
            }
            keyExtractor={(_, index) => label + "-" + index}
            renderItem={renderItem}
            ItemSeparatorComponent={seperator}
            onEndReached={loadMore}
            onEndReachedThreshold={0.25}
            style={{ width: useWindowDimensions().width * 0.8 }}
          ></FlatList>
          {noOptionsComponent}
        </View>
      </Modal>
    </View>
  );
};
const useStyles = makeStyles((theme) => ({
  searchContainer: {
    backgroundColor: theme.colors?.grey3,
  },
  container: {
    flex: 1,
    top: 20,
    marginBottom: 20,
    position: "relative",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: theme.colors?.background,
  },
  inputContainer: {
    backgroundColor: theme.colors?.background,
  },
  input: {
    height: 20,
    padding: 12,
    color: theme.colors?.text,
  },
  item: {
    margin: 20,
  },
  seperator: {
    height: 1,
    backgroundColor: theme.colors?.text,
  },
}));

export default DropdownSearch;

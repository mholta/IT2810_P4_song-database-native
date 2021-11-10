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
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { SearchBar, Button } from "react-native-elements";

type SearchKey = "name" | "title";

type ArtistOrAlbum = {
  [searchKey in SearchKey]: string;
} & {
  _id: string;
  releaseDate?: Date;
};

interface DropdownSearchProps {
  setValueCallback: (value: string) => void;
  setDateCallback?: (date: Date | null) => void;
  query: DocumentNode;
  variables: { [key: string]: any };
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
  const { loading, error, refetch } = useQuery(query, {
    variables: variables,
  });
  useEffect(() => {
    if (previousInputValue !== inputValue && inputValue !== "") {
      (async () => {
        setPreviousInputValue(inputValue);
        await refetch({ [searchKey]: inputValue }).then(({ data }) => {
          setOptions(data[dataKey]);
        });
      })();
    }
    if (inputValue === "") {
      setPreviousInputValue("");
      setOptions([]);
    }
  }, [loading, inputValue]);

  const Item = ({ text, _id }: ItemProp) => {
    console.log(text, _id);
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
  const renderItem: ListRenderItem<ArtistOrAlbum> = ({ item, index }) => {
    return <Item text={item[searchKey]} _id={item._id} />;
  };
  const seperator = () => {
    return <View style={styles.seperator} />;
  };
  console.log(options);
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
        onPress={() => setModalVisible(true)}
      />

      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              {/* <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100vw",
              height: "100vh",
            }}
          > */}
              <View style={styles.modal}>
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
                      onFocus={() => setModalVisible(true)}
                      onBlur={() => setModalVisible(true)}
                      clearButtonMode={"always"}
                      value={inputValue}
                      //@ts-ignore probably same error as above. & is used insted of | https://github.com/react-native-elements/react-native-elements/issues/3089
                      searchIcon={null}
                    />
                  }
                  data={options}
                  renderItem={renderItem}
                  ItemSeparatorComponent={seperator}
                ></FlatList>
                {options.length === 0 &&
                  inputValue !== "" &&
                  noOptionsComponent}
              </View>
            </TouchableWithoutFeedback>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: "2rem",
    padding: 12,
  },
  item: {
    margin: 20,
  },
  seperator: {
    height: 1,
    backgroundColor: "white",
  },
  modal: {
    top: "10vh",
    width: "80%",
    alignSelf: "center",
    position: "relative",
    // padding: "1px",
    borderRadius: 10,
    backgroundColor: "black",
  },
});
export default DropdownSearch;

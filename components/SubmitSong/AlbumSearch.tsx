import React from "react";
import { gql } from "@apollo/client";
import { Button } from "react-native-elements";
import DropdownSearch from "./DropdownSearch";
import { Text, View } from "react-native";
interface AlbumSearch {
  setValueCallback: (value: string) => void;
  setDateCallback: (date: Date | null) => void;
  setNewAlbumModalOpenCallback: (value: boolean) => void;
  artistId: string;
}

const AlbumSearch = ({
  setValueCallback,
  setDateCallback,
  setNewAlbumModalOpenCallback,
  artistId,
}: AlbumSearch) => {
  return (
    <DropdownSearch
      required
      id="album-search"
      dataKey="albums"
      label="album"
      labelPreposition="et"
      query={GET_ALBUM_QUERY}
      variables={{
        artist: artistId,
        title: "",
        limit: 10,
      }}
      searchKey="title"
      setValueCallback={setValueCallback}
      setDateCallback={setDateCallback}
      noOptionsComponent={
        <Button
          onPress={() => setNewAlbumModalOpenCallback(true)}
          type="solid"
          title="Opprett nytt album"
        ></Button>
      }
    />
  );
};
export const GET_ALBUM_QUERY = gql`
  query GetAlbums(
    $artist: String!
    $title: String
    $limit: Int!
    $offset: Int
  ) {
    albums(artist: $artist, title: $title, limit: $limit, offset: $offset) {
      _id
      title
      releaseDate
    }
  }
`;
export default AlbumSearch;

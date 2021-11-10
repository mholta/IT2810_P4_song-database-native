import React from "react";
import { gql } from "@apollo/client";
import DropdownSearch from "./DropdownSearch";

interface ArtistSearchProps {
  setValueCallback: (value: string) => void;
}

/**
 * A dropdown with possibility to write and search for an existing artist.
 */
const ArtistSearch = ({ setValueCallback }: ArtistSearchProps) => {
  return (
    <DropdownSearch
      required
      id="artist-search"
      dataKey="artists"
      label="artist"
      labelPreposition="en"
      query={GET_ARTIST_QUERY}
      variables={{
        name: "",
        limit: 10,
      }}
      searchKey="name"
      setValueCallback={setValueCallback}
    />
  );
};

export const GET_ARTIST_QUERY = gql`
  query GetArtists($name: String, $limit: Int!, $offset: Int) {
    artists(name: $name, limit: $limit, offset: $offset) {
      _id
      name
    }
  }
`;

export default ArtistSearch;

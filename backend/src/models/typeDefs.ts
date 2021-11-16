import { gql } from 'apollo-server-core';

/**
 * Defines GraphQL queries, mutations and types.
 */
export const typeDefs = gql`
  scalar Date

  type Query {
    artists(limit: Int, id: String, name: String, offset: Int): [Artist!]
    songs(
      limit: Int
      searchString: String
      filter: Filter
      sorting: Sorting
      page: Int
    ): SongResponse
    albums(
      limit: Int
      id: String
      title: String
      artist: String
      offset: Int
    ): [Album!]
    song(id: String!): Song
    categories: [Category!]
  }

  type Mutation {
    createSong(
      album: String!
      artists: [String!]!
      categories: [String!]
      contributors: [String!]
      iTunes: String
      key: String
      producers: [String!]
      releaseDate: Date!
      albumReleaseDate: Date
      spotify: String
      tempo: String
      time: String
      title: String!
      writers: [String!]
      file: Upload
    ): Song!
  }
  input Filter {
    categories: [String]
    contributor: String
  }
  input Sorting {
    order: SortOrder!
    sortType: SortType!
  }

  enum SortOrder {
    asc
    desc
  }

  enum SortType {
    releaseDate
    title
    artists
    album
    relevance
  }

  type Artist {
    _id: String
    name: String
    location: String
    affilation: String
    webpage: String
    instagram: String
    iTunes: String
    youtube: String
    spotify: String
    picture: String
  }

  type Song {
    _id: String
    album: Album
    artists: [Artist]
    contributors: [String]
    iTunes: String
    key: String
    producers: [String]
    releaseDate: Date
    spotify: String
    tempo: String
    time: String
    title: String
    writers: [String]
    categories: [Category!]
  }

  type SongResponse {
    songs: [Song]
    pages: Int!
  }

  type AlbumResponse {
    albums: [Album!]
    totalCount: Int!
  }

  type ArtistResponse {
    artists: [Artist!]
    totalCount: Int!
  }
  type Album {
    _id: String
    title: String
    artists: [Artist]
    iTunes: String
    picture: String
    producers: [String]
    publisher: String
    releaseDate: Date
    spotify: String
  }

  type Category {
    _id: String!
    title: String!
  }
`;

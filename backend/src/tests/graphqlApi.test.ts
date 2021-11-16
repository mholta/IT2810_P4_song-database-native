import { ApolloServer } from 'apollo-server-express';
import request from 'supertest';
import { typeDefs } from '../models/typeDefs';
import { resolvers } from '../models/resolvers';
import { app } from '../app';
import {
  dummyAlbums,
  dummyArtist,
  dummyCategories,
  dummySong,
  dummySongs,
  returnCreateSong,
} from './data';
import { SortOrder, SortType } from '../models/resolvers/types';

/**
 * Tests for the GraphQL API.
 */

const artistsSpy = jest
  .spyOn(resolvers.Query, 'artists')
  .mockReturnValue(dummyArtist);
const songsSpy = jest
  .spyOn(resolvers.Query, 'songs')
  .mockReturnValue(dummySongs);
const albumsSpy = jest
  .spyOn(resolvers.Query, 'albums')
  .mockReturnValue(dummyAlbums);
const songSpy = jest.spyOn(resolvers.Query, 'song').mockReturnValue(dummySong);
const categoriesSpy = jest
  .spyOn(resolvers.Query, 'categories')
  .mockReturnValue(dummyCategories);
const createSongSpy = jest
  .spyOn(resolvers.Mutation, 'createSong')
  .mockReturnValue(returnCreateSong);

describe('GraphQL API', () => {
  let server;
  beforeAll((done) => {
    server = new ApolloServer({ typeDefs, resolvers });
    server.applyMiddleware({ app });

    app.listen(() => {
      done();
    });
  });

  afterAll(async () => {
    await server.stop();
  });

  test('GetArtists', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: `query {
          artists(name: "ac", limit: 10) {
            _id
            name
          }
        }`,
      });

    expect(res.statusCode).toBe(200);
    expect(artistsSpy).toHaveBeenLastCalledWith(
      undefined,
      { limit: 10, name: 'ac' },
      expect.anything(),
      expect.anything()
    );
    expect(res.body.data.artists).toEqual(dummyArtist);
  });

  test('GetSongs', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: `query {
          songs(
            searchString: "all"
            filter: { categories: ["overgivelse"] }
            limit: 20
            page: 1
            sorting: { order: ${SortOrder.DESC}, sortType: ${SortType.TITLE} }
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
        }`,
      });

    expect(res.statusCode).toBe(200);
    expect(songsSpy).toHaveBeenLastCalledWith(
      undefined,
      {
        searchString: 'all',
        filter: { categories: ['overgivelse'] },
        limit: 20,
        page: 1,
        sorting: { order: 'desc', sortType: 'title' },
      },
      expect.anything(),
      expect.anything()
    );
    expect(res.body.data.songs).toEqual(dummySongs);
  });

  test('GetAlbums', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: `query {
          albums(artist: "David", title: "Eksplosjon", limit: 5) {
            _id
            title
            picture
          }
        }`,
      });

    expect(res.statusCode).toBe(200);
    expect(albumsSpy).toHaveBeenLastCalledWith(
      undefined,
      { artist: 'David', title: 'Eksplosjon', limit: 5 },
      expect.anything(),
      expect.anything()
    );
    expect(res.body.data.albums).toEqual(dummyAlbums);
  });

  test('GetSong', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: `query {
          song(id: "all-pris-acta-lovsang"){
            _id
            title
            album {
              title
              picture
              releaseDate
            }
            key
            artists {
              name
            }
            tempo
            time
            writers
            contributors
            producers
            iTunes
            spotify
            categories {
              _id
              title
            }
          }
        }`,
      });

    expect(res.statusCode).toBe(200);
    expect(songSpy).toHaveBeenLastCalledWith(
      undefined,
      { id: 'all-pris-acta-lovsang' },
      expect.anything(),
      expect.anything()
    );
    expect(res.body.data.song).toEqual(dummySong);
  });

  test('GetThemes', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: `query  {
          categories {
            _id
            title
          }
        }`,
      });

    expect(res.statusCode).toBe(200);
    expect(categoriesSpy).toHaveBeenLastCalledWith(
      undefined,
      {},
      expect.anything(),
      expect.anything()
    );
    expect(res.body.data.categories).toEqual(dummyCategories);
  });

  test('GetThemes', async () => {
    const res = await request(app)
      .post('/graphql')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        query: `mutation {
          createSong(
            album: "motepunkt-acta-lovsang"
            artists: ["acta-lovsang"]
            categories: ["nade-og-kross", "takk-og-lovprisning", "fornyelse", "overgivelse"]
            contributors: ["Tobias Valdal Høssung (trommer)", "Ruben Strømme (bass)", "Anders Kjøllesdal Hansen (keys)", "Vemund Aasemoen Aardal (keys)", "Samuel Hilleren (keys)", "Aleksander Øvergaard (gitar)", "Mads Even Vold (gitar)", "Mathilde Eriksen (vokal)", "Eline Walderhaug (kor)", "Vemund Aasemoen Aardal (kor)"]
            iTunes: "https://music.apple.com/no/album/møtepunkt-single/1520693028"
            key: "F#"
            producers: ["Tore Kulleseid"]
            releaseDate: "2020-07-10T00:00:00.000Z"
            spotify: "https://open.spotify.com/track/7kXJtTxucwufmP2f32yeJo"
            tempo: "68"
            time: "4/4"
            title: "All pris"
            writers: ["Eline Walderhaug", "Thomas Wilhelmsen", "Tore Kulleseid"]
          ) {
            _id
            title
          }
        }`,
      });

    expect(res.statusCode).toBe(200);
    expect(createSongSpy).toHaveBeenLastCalledWith(
      undefined,
      {
        album: 'motepunkt-acta-lovsang',
        artists: ['acta-lovsang'],
        categories: [
          'nade-og-kross',
          'takk-og-lovprisning',
          'fornyelse',
          'overgivelse',
        ],
        contributors: [
          'Tobias Valdal Høssung (trommer)',
          'Ruben Strømme (bass)',
          'Anders Kjøllesdal Hansen (keys)',
          'Vemund Aasemoen Aardal (keys)',
          'Samuel Hilleren (keys)',
          'Aleksander Øvergaard (gitar)',
          'Mads Even Vold (gitar)',
          'Mathilde Eriksen (vokal)',
          'Eline Walderhaug (kor)',
          'Vemund Aasemoen Aardal (kor)',
        ],
        iTunes: 'https://music.apple.com/no/album/møtepunkt-single/1520693028',
        key: 'F#',
        producers: ['Tore Kulleseid'],
        releaseDate: '2020-07-10T00:00:00.000Z',
        spotify: 'https://open.spotify.com/track/7kXJtTxucwufmP2f32yeJo',
        tempo: '68',
        time: '4/4',
        title: 'All pris',
        writers: ['Eline Walderhaug', 'Thomas Wilhelmsen', 'Tore Kulleseid'],
      },
      expect.anything(),
      expect.anything()
    );
    expect(res.body.data.createSong).toEqual(returnCreateSong);
  });
});

/**
 * Dummy data used in tests.
 */

export const dummyArtist: any = [
  {
    _id: 'acta',
    name: 'Acta',
  },
];

export const dummyAlbums: any = [
  {
    _id: 'motepunkt-acta-lovsang',
    title: 'Møtepunkt',
    picture:
      'https://uploads-ssl.webflow.com/5ed95215f8138049de460b43/604374cdc48ec430aa6d4894_M%C3%B8tepunkt%20-%20cover.jpeg',
  },
  {
    _id: 'eksplosjon-david-andre-ostby',
    title: 'Eksplosjon',
    picture:
      'https://uploads-ssl.webflow.com/5ed95215f8138049de460b43/60eb20ce10d33318a71462ab_Coverbilde.jpeg',
  },
];

export const dummySong: any = {
  _id: 'all-pris-acta-lovsang',
  title: 'All pris',
  album: {
    picture:
      'https://uploads-ssl.webflow.com/5ed95215f8138049de460b43/604374cdc48ec430aa6d4894_M%C3%B8tepunkt%20-%20cover.jpeg',
    releaseDate: new Date(
      'Fri Jul 10 2020 00:00:00 GMT+0000 (Coordinated Universal Time)'
    ).toISOString(),
    title: 'Møtepunkt',
  },
  tempo: '68',
  key: 'F#',
  time: '4/4',
  artists: [{ name: 'Acta Lovsang' }],
  writers: ['Eline Walderhaug', 'Thomas Wilhelmsen', 'Tore Kulleseid'],
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
  producers: ['Tore Kulleseid'],
  iTunes: 'https://music.apple.com/no/album/møtepunkt-single/1520693028',
  spotify: 'https://open.spotify.com/track/7kXJtTxucwufmP2f32yeJo',
  categories: [
    { _id: 'han', title: 'Han' },
    { _id: 'sang', title: 'Sang' },
    { _id: 'glede', title: 'Glede' },
  ],
};

export const dummySongs: any = {
  pages: 1,
  songs: [
    {
      _id: 'alltid-god-david-andre-ostby',
      artists: [
        {
          name: 'David André Østby',
        },
      ],
      title: 'Alltid God',
      album: {
        picture:
          'https://uploads-ssl.webflow.com/5ed95215f8138049de460b43/60e388285db99112d5eea833_Coverbilde.jpg',
      },
    },
    {
      _id: 'all-pris-acta-lovsang',
      artists: [
        {
          name: 'Acta Lovsang',
        },
      ],
      title: 'All pris',
      album: {
        picture:
          'https://uploads-ssl.webflow.com/5ed95215f8138049de460b43/604374cdc48ec430aa6d4894_M%C3%B8tepunkt%20-%20cover.jpeg',
      },
    },
  ],
};

export const dummyCategories: any = [
  { _id: 'han', title: 'Han' },
  { _id: 'er', title: 'Er' },
  { _id: 'min', title: 'Min' },
  { _id: 'sang', title: 'Sang' },
  { _id: 'og', title: 'Og' },
  { _id: 'ein', title: 'Ein' },
  { _id: 'glede', title: 'Glede' },
];

export const returnCreateSong: any = {
  _id: 'all-pris-acta-lovsang',
  title: 'All pris',
};

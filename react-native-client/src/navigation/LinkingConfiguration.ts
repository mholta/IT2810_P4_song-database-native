/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types/navigation.types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          SongsTab: {
            screens: {
              SongsScreen: "one",
              SongScreen: "song",
            },
          },
          SubmitTab: {
            screens: {
              SubmitSongScreen: "Send inn en sang",
            },
          },
        },
      },
      Info: "modal",
      NotFound: "*",
    },
  },
};

export default linking;

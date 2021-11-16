import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { Provider as StoreProvider } from "react-redux";
import store from "./redux/store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSlidersH, faTimes } from "@fortawesome/free-solid-svg-icons";
import StaticContentProvider from "./hooks/StaticContent";
import { ThemeProvider as RNElementsThemeProvider } from "react-native-elements";
import {
  DefaultTheme,
  Provider as RNPaperThemeProvider,
} from "react-native-paper";
import { useChooseTheme } from "./hooks/useChooseTheme";

const client = new ApolloClient({
  link: createUploadLink({ uri: "http://it2810-21.idi.ntnu.no:4001/graphql" }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          songs: {
            keyArgs: ["searchString", "filter", "sorting"],
            merge(existing, incoming) {
              if (!incoming) return existing;
              if (!existing) return incoming;
              const { songs, ...res } = incoming;
              let result = res;
              result.songs = [...existing.songs, ...songs];
              return { ...result };
            },
          },
          artists: {
            keyArgs: ["name"],
            merge(existing, incoming) {
              if (!incoming) return existing;
              if (!existing) return incoming;
              return [...existing, ...incoming];
            },
          },
          albums: {
            keyArgs: ["title"],
            merge(existing, incoming) {
              if (!incoming) return existing;
              if (!existing) return incoming;
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
  headers: {
    mode: "no-cors",
  },
});

library.add(faSlidersH, faTimes);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const theme = useChooseTheme(colorScheme);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <StoreProvider store={store}>
            <RNElementsThemeProvider theme={theme}>
              <RNPaperThemeProvider
                theme={{
                  ...DefaultTheme,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: theme.colors?.primary ?? "white",
                    text: theme.colors?.text ?? "white",
                  },
                }}
              >
                <StaticContentProvider>
                  <Navigation colorScheme={colorScheme} />
                  <StatusBar />
                </StaticContentProvider>
              </RNPaperThemeProvider>
            </RNElementsThemeProvider>
          </StoreProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    );
  }
}

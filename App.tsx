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
import { faSlidersH } from "@fortawesome/free-solid-svg-icons";

const client = new ApolloClient({
  link: createUploadLink({ uri: "http://it2810-21.idi.ntnu.no:4000/graphql" }),
  cache: new InMemoryCache(),
  headers: {
    mode: "no-cors",
  },
});

library.add(faSlidersH);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <SafeAreaProvider>
      <ApolloProvider client={client}>
        <StoreProvider store={store}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </StoreProvider>
      </ApolloProvider>
        </SafeAreaProvider>
      
    );
  }
}

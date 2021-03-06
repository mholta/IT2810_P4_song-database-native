import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import { baseColors } from "../utils/Colors";
import useColorScheme from "../hooks/useColorScheme";
import NotFoundScreen from "../screens/NotFoundScreen";
import SongScreen from "../screens/SongScreen";
import SongsScreen from "../screens/SongsScreen";
import SubmitSongScreen from "../screens/SubmitSongScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types/navigation.types";
import LinkingConfiguration from "./LinkingConfiguration";

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => (
  <NavigationContainer
    linking={LinkingConfiguration}
    theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
  >
    <RootNavigator />
  </NavigationContainer>
);

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Root"
      component={BottomTabNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="SongScreen"
      component={SongScreen}
      options={{ title: "Sang" }}
    />
    <Stack.Screen
      name="NotFound"
      component={NotFoundScreen}
      options={{ title: "Ikke funnet" }}
    />
  </Stack.Navigator>
);

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="SongsTab"
      screenOptions={{
        tabBarActiveTintColor: baseColors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="SongsTab"
        component={SongsScreen}
        options={({ navigation }: RootTabScreenProps<"SongsTab">) => ({
          title: "Sanger",
          tabBarIcon: ({ color }) => <TabBarIcon name="music" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="SubmitTab"
        component={SubmitSongScreen}
        options={{
          title: "Send inn en sang",
          tabBarIcon: ({ color }) => <TabBarIcon name="send" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) => <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;

export default Navigation;

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Importe suas telas aqui
import HomeScreen from "../screens/Home";
import ProfileScreen from "../screens/Profile";
import BookScreen from "../screens/Book";
import {
  StackNavigationProp,
  createStackNavigator,
} from "@react-navigation/stack";
import ChallengesScreen from "../screens/Challenges";
import JourneysScreen from "../screens/Journeys";
import { useTheme } from "../contexts/theme.context";
import SettingsScreen from "../screens/Profile/settings";
import { Journey } from "../utils/types";
import JourneyCollectionScreen from "../screens/Journeys/collection";
import InfoScreen from "../screens/Profile/info";
import JourneyContentScreen from "../screens/Journeys/components/JourneyContent";

const Tab = createBottomTabNavigator();

export type authScreenProp = StackNavigationProp<StackNavigatorParams, "Tab">;

export type StackNavigatorParams = {
  Tab: undefined; // For the TabNavigator screen
  Book: {
    id: number;
    name: string;
    title?: string;
    resume?: string;
  }; // For the BookScreen screen
  Settings: undefined;
  Info: undefined;
  JourneyContentScreen: undefined;
  JourneyCollection: {
    journeys: Journey[];
    description: string;
    id: string;
    name: string;
  };
};

const Stack = createStackNavigator<StackNavigatorParams>(); // Use the defined type

const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Início") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          } else if (route.name === "Perfil") {
            iconName = focused ? "ios-person" : "ios-person-outline";
          } else if (route.name === "Jornadas") {
            iconName = focused ? "ios-compass" : "ios-compass-outline";
          } else if (route.name === "Deafios") {
            iconName = focused ? "ios-trophy" : "ios-trophy-outline";
          } else if (route.name === "Orações") {
            iconName = focused ? "ios-chatbox" : "ios-chatbox-outline";
          }

          // Você pode retornar qualquer componente aqui!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: theme === "light" ? "#FFF" : "#111",
          borderTopColor: theme === "light" ? "#EEE" : "#333",
        }, // Customiza o fundo
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Início"
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Jornadas"
        component={JourneysScreen}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Deafios"
        component={ChallengesScreen}
      />
      {/* <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Orações"
        component={ProfileScreen}
      /> */}
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Perfil"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export function UserRoutes() {
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Tab"
        component={TabNavigator}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Book"
          component={BookScreen}
          initialParams={{ id: 1, name: "", title: "", resume: "" }}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Settings"
          component={SettingsScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="Info"
          component={InfoScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="JourneyContentScreen"
          component={JourneyContentScreen}
        />
      </Stack.Group>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="JourneyCollection"
        component={JourneyCollectionScreen}
      />
    </Stack.Navigator>
  );
}

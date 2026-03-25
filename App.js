import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import BlogDetail from "./screens/BlogDetail";
import ProductDetail from "./screens/ProductDetail";

const Stack = createNativeStackNavigator();

const products = [
  {
    id: 1,
    title: "Nova X1 Earbuds",
    description: "Noise-cancelling earbuds met spatial audio en ultra-low latency.",
    price: "EUR 179",
    details:
      "De Nova X1 combineert adaptive noise cancelling, transparantiemodus en een batterijduur tot 32 uur met case. Ideaal voor onderweg, calls en mobiel gamen.",
    image: require("./assets/ring.png"),
  },
  {
    id: 2,
    title: "Pulse Watch GT",
    description: "Slimme smartwatch met AMOLED-display, GPS en health tracking.",
    price: "EUR 249",
    details:
      "De Pulse Watch GT geeft meldingen, hartslag, slaapinzichten en workout-modes in een strak horloge dat vlot synchroniseert met je smartphone.",
    image: require("./assets/ring.png"),
  },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#07111f" },
          headerTintColor: "#f5fbff",
          headerShadowVisible: false,
          contentStyle: { backgroundColor: "#07111f" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ products }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetail}
          options={{ title: "Device Details" }}
        />
        <Stack.Screen
          name="BlogDetail"
          component={BlogDetail}
          options={{ title: "Blog" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

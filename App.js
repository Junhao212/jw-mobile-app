import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./screens/ProductDetail";

const Stack = createNativeStackNavigator();

const products = [
  {
    id: 1,
    title: "Smart Ring",
    description: "Een slimme ring voor gezondheid, slaap en dagelijkse tracking.",
    price: "EUR 299",
    details:
      "Volg je slaap, hartslag en activiteit op in een compact ontwerp dat de hele dag comfortabel blijft.",
    image: require("./assets/ring.png"),
  },
  {
    id: 2,
    title: "Health Ring Pro",
    description: "Premium model met extra inzichten voor herstel en prestaties.",
    price: "EUR 349",
    details:
      "Geeft uitgebreidere analyses van herstel, inspanning en dagelijkse gewoontes voor een actiever leven.",
    image: require("./assets/ring.png"),
  },
  {
    id: 3,
    title: "Smart Ring Lite",
    description: "Lichter instapmodel met focus op comfort en basisstatistieken.",
    price: "EUR 199",
    details:
      "Ideaal als eerste slimme ring voor stappen, slaap en meldingen zonder ingewikkelde instellingen.",
    image: require("./assets/ring.png"),
  },
  {
    id: 4,
    title: "Sport Ring X",
    description: "Stevig model voor sporters die activiteit en herstel willen meten.",
    price: "EUR 329",
    details:
      "Ontworpen voor dagelijks sporten met sterke batterijduur en duidelijke inzichten in je trainingsbelasting.",
    image: require("./assets/ring.png"),
  },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          initialParams={{ products }}
          options={{ title: "Onze modellen" }}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetail}
          options={{ title: "Product details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

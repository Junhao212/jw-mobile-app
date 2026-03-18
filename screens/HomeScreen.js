import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  Switch,
  Image,
} from "react-native";

import ProductCard from "../components/ProductCard";

const HomeScreen = ({ route }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [searchText, setSearchText] = useState("");
  const products = route.params?.products ?? [];

  const filteredProducts = useMemo(() => {
    const query = searchText.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );
  }, [products, searchText]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style={isEnabled ? "light" : "dark"} />

      <View style={styles.hero}>
        <Text style={styles.kicker}>New Collection</Text>
        <Text style={styles.title}>Onze modellen</Text>
        <Text style={styles.subtitle}>
          Ontdek slimme producten in een rustige, moderne stijl.
        </Text>

        <Image source={require("../assets/ring.png")} style={styles.heroImage} />
      </View>

      <TextInput
        placeholder="Zoek product..."
        placeholderTextColor="#8b7f76"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.search}
      />

      <View style={styles.controls}>
        <View>
          <Text style={styles.controlTitle}>Donkere modus</Text>
          <Text style={styles.controlText}>Demo-switch voor de opdracht</Text>
        </View>

        <Switch
          value={isEnabled}
          onValueChange={setIsEnabled}
          trackColor={{ false: "#d8c8bc", true: "#d28a63" }}
          thumbColor="#ffffff"
        />
      </View>

      <View style={styles.buttonWrap}>
        <Button title="Filter producten" color="#b85c38" onPress={() => {}} />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Populaire producten</Text>
        <Text style={styles.sectionText}>
          Klik op een kaart om de details van het product te bekijken.
        </Text>
      </View>

      <View style={styles.grid}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            image={product.image}
            details={product.details}
          />
        ))}
      </View>

      {filteredProducts.length === 0 ? (
        <Text style={styles.emptyState}>Geen producten gevonden voor je zoekopdracht.</Text>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4ede6",
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  hero: {
    backgroundColor: "#fffaf5",
    borderRadius: 28,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  kicker: {
    color: "#b85c38",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  title: {
    color: "#2f241f",
    fontSize: 30,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6d5f56",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  heroImage: {
    width: "100%",
    height: 190,
    borderRadius: 20,
    resizeMode: "contain",
    backgroundColor: "#f2e4d7",
  },
  search: {
    backgroundColor: "#fffaf5",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 14,
    color: "#2f241f",
    fontSize: 15,
  },
  controls: {
    backgroundColor: "#fffaf5",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlTitle: {
    color: "#2f241f",
    fontSize: 16,
    fontWeight: "800",
  },
  controlText: {
    color: "#7a6e66",
    marginTop: 4,
    fontSize: 13,
  },
  buttonWrap: {
    marginBottom: 18,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#2f241f",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 4,
  },
  sectionText: {
    color: "#6d5f56",
    fontSize: 14,
    lineHeight: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  emptyState: {
    marginTop: 20,
    textAlign: "center",
    color: "#6d5f56",
    fontSize: 14,
  },
});

export default HomeScreen;

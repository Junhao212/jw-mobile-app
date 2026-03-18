import React, { useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ProductCard from "../components/ProductCard";

const blogs = [
  {
    id: 1,
    tag: "Guide",
    title: "Welke wearable past bij jouw routine?",
    excerpt:
      "Vergelijk batterijduur, comfort en health features voor dagelijks gebruik.",
  },
  {
    id: 2,
    tag: "Launch",
    title: "Top gadgets van deze maand",
    excerpt:
      "Onze selectie van compacte tech die stijl en prestaties combineren.",
  },
];

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
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
      <StatusBar style="light" />

      <View style={styles.hero}>
        <View style={styles.heroBadge}>
          <Text style={styles.heroBadgeText}>TECH DROP 04</Text>
        </View>
        <Text style={styles.kicker}>Future-ready gadgets</Text>
        <Text style={styles.title}>Volt Market</Text>
        <Text style={styles.subtitle}>
          Slimme gadgets, strakke specs en een storefront die voelt als een nieuwe product launch.
        </Text>

        <View style={styles.heroPanel}>
          <View style={styles.heroCopy}>
            <Text style={styles.heroMetricLabel}>Trending now</Text>
            <Text style={styles.heroMetricValue}>02 devices</Text>
            <Text style={styles.heroMetricText}>
              Audio en wearables met een premium tech vibe.
            </Text>
          </View>

          <Image source={require("../assets/ring.png")} style={styles.heroImage} />
        </View>
      </View>

      <TextInput
        placeholder="Zoek gadgets..."
        placeholderTextColor="#7f97b7"
        value={searchText}
        onChangeText={setSearchText}
        style={styles.search}
      />

      <View style={styles.quickRow}>
        <View style={styles.quickCard}>
          <Text style={styles.quickLabel}>Fast shipping</Text>
          <Text style={styles.quickValue}>24H dispatch</Text>
        </View>

        <View style={styles.quickCard}>
          <Text style={styles.quickLabel}>Editor's pick</Text>
          <Text style={styles.quickValue}>Wearables</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Shop</Text>
        <Text style={styles.sectionTitle}>Featured gadgets</Text>
        <Text style={styles.sectionText}>
          Tik op een product om de detailpagina te openen.
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

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionEyebrow}>Reads</Text>
        <Text style={styles.sectionTitle}>Latest blogs</Text>
        <Text style={styles.sectionText}>
          Twee blogcards om de shop meer inhoud en tech-context te geven.
        </Text>
      </View>

      <View style={styles.blogList}>
        {blogs.map((blog, index) => (
          <Pressable
            key={blog.id}
            style={styles.blogCard}
            onPress={() => navigation.navigate("BlogDetail", { blog })}
          >
            <View style={styles.blogTop}>
              <Text style={styles.blogTag}>{blog.tag}</Text>
              <Text style={styles.blogIndex}>0{index + 1}</Text>
            </View>
            <Text style={styles.blogTitle}>{blog.title}</Text>
            <Text style={styles.blogExcerpt}>{blog.excerpt}</Text>
            <Text style={styles.blogLink}>Lees artikel</Text>
          </Pressable>
        ))}
      </View>

      {filteredProducts.length === 0 ? (
        <Text style={styles.emptyState}>
          Geen gadgets gevonden voor je zoekopdracht.
        </Text>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#07111f",
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: "#0c1b30",
    borderRadius: 30,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#183252",
  },
  heroBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#132845",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  heroBadgeText: {
    color: "#8ec5ff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
  },
  kicker: {
    color: "#8ec5ff",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 6,
    letterSpacing: 1.2,
  },
  title: {
    color: "#f5fbff",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 8,
  },
  subtitle: {
    color: "#96aac5",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  heroPanel: {
    backgroundColor: "#081423",
    borderRadius: 24,
    padding: 16,
  },
  heroCopy: {
    marginBottom: 14,
  },
  heroMetricLabel: {
    color: "#6e86a6",
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  heroMetricValue: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 4,
  },
  heroMetricText: {
    color: "#90a4bf",
    fontSize: 14,
    lineHeight: 20,
  },
  heroImage: {
    width: "100%",
    height: 170,
    borderRadius: 18,
    resizeMode: "contain",
    backgroundColor: "#0f2138",
  },
  search: {
    backgroundColor: "#0c1b30",
    borderWidth: 1,
    borderColor: "#173250",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 14,
    color: "#f5fbff",
    fontSize: 15,
  },
  quickRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  quickCard: {
    width: "48%",
    backgroundColor: "#0c1b30",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#173250",
  },
  quickLabel: {
    color: "#7b94b5",
    fontSize: 12,
    marginBottom: 8,
  },
  quickValue: {
    color: "#f5fbff",
    fontSize: 18,
    fontWeight: "800",
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionEyebrow: {
    color: "#57d1ff",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.1,
    marginBottom: 4,
  },
  sectionTitle: {
    color: "#f5fbff",
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 4,
  },
  sectionText: {
    color: "#90a4bf",
    fontSize: 14,
    lineHeight: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  blogList: {
    gap: 14,
  },
  blogCard: {
    backgroundColor: "#0c1b30",
    borderRadius: 22,
    padding: 18,
    borderWidth: 1,
    borderColor: "#173250",
  },
  blogTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  blogTag: {
    color: "#57d1ff",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  blogIndex: {
    color: "#49617f",
    fontSize: 12,
    fontWeight: "700",
  },
  blogTitle: {
    color: "#f5fbff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 8,
  },
  blogExcerpt: {
    color: "#90a4bf",
    fontSize: 14,
    lineHeight: 21,
  },
  blogLink: {
    color: "#57d1ff",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 12,
  },
  emptyState: {
    marginTop: 20,
    textAlign: "center",
    color: "#90a4bf",
    fontSize: 14,
  },
});

export default HomeScreen;

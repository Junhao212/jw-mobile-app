import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";

const getImageUrl = (fieldData = {}) => {
  const possibleImage =
    fieldData["main-image"] ||
    fieldData["thumbnail-image"] ||
    fieldData["featured-image"] ||
    fieldData["cover-image"] ||
    fieldData["post-image"] ||
    fieldData.image;

  if (typeof possibleImage === "string") {
    return possibleImage;
  }

  return possibleImage?.url || null;
};

const WEBFLOW_TOKEN = process.env.EXPO_PUBLIC_WEBFLOW_TOKEN;

const HomeScreen = ({ navigation, route }) => {
  const [products, setProducts] = useState(route.params?.products ?? []);
  const [blogs, setBlogs] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    if (!WEBFLOW_TOKEN) {
      return;
    }

    fetch(
      "https://api.webflow.com/v2/sites/698c7fdc4b1384bc81c91304/products",
      {
        headers: {
          Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(
          (data.items || []).map((item) => ({
            id: item.product.id,
            title: item.product.fieldData.name,
            subtitle: item.product.fieldData.description,
            price: (item.skus[0]?.fieldData.price.value || 0) / 100,
            image: { uri: item.skus[0]?.fieldData["main-image"]?.url },
            category:
              item.product.fieldData.category?.[0] === "699efb8fb33f0d8de566e3b3"
                ? "gadgets"
                : "Onbekende categorie",
          }))
        );
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    if (!WEBFLOW_TOKEN) {
      return;
    }

    fetch(
      "https://api.webflow.com/v2/collections/699efb571075dc4582bf4f32/items",
      {
        headers: {
          Authorization: `Bearer ${WEBFLOW_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setBlogs(
          (data.items || []).map((item) => ({
            id: item.id,
            tag: item.fieldData?.category || item.fieldData?.slug || "Blog",
            title: item.fieldData?.name || "Untitled blog",
            excerpt:
              item.fieldData?.summary ||
              item.fieldData?.description ||
              item.fieldData?.postSummary ||
              "Open dit artikel voor meer details.",
            image: getImageUrl(item.fieldData),
          }))
        );
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our offer</Text>
      <TextInput placeholder="Search a product..." style={styles.input} />
      <View style={styles.pickerWrap}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          dropdownIconColor="#000"
          style={styles.picker}
        >
          <Picker.Item label="Alle categorieen" value="" />
          <Picker.Item label="gadgets" value="gadgets" />
        </Picker>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 12,
          justifyContent: "space-between",
        }}
      >
        <Text style={{ color: "#fff", marginLeft: 8 }}>
          Only show promotions
        </Text>
        <Switch
          style={styles.switch}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isEnabled ? "#81b0ff" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.list}>
        {products
          .filter(
            (product) =>
              selectedCategory === "" ||
              product.category === selectedCategory
          )
          .map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.subtitle}
            price={product.price}
            image={product.image}
            onPress={() => navigation.navigate("Details", { product })}
          />
        ))}

        <View style={styles.blogSection}>
          <Text style={styles.blogHeading}>Latest blogs</Text>

          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              tag={blog.tag}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.image}
              onPress={() => navigation.navigate("BlogDetail", { blog })}
            />
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  heading: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 64,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  switch: {
    marginVertical: 12,
  },
  input: {
    marginVertical: 12,
    backgroundColor: "#fff",
    borderColor: "#555",
    borderWidth: 1,
    color: "#737373",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pickerWrap: {
    marginBottom: 12,
    backgroundColor: "#fff",
    marginHorizontal: 0,
    borderRadius: 4,
  },
  picker: {
    color: "#000",
    backgroundColor: "#fff",
  },
  blogSection: {
    width: "100%",
    marginTop: 16,
  },
  blogHeading: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
  },
});

export default HomeScreen;

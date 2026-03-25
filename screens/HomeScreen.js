import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  TextInput,
  Pressable,
  Image,
} from "react-native";
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

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/sites/698c7fdc4b1384bc81c91304/products",
      {
        headers: {
          Authorization: "Bearer 3cbb40de0df9e12bd3be24b4fdc7a30bd544bbdcf69c32fce84b0a28a4716b83",
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
          }))
        );
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    fetch(
      "https://api.webflow.com/v2/collections/699efb571075dc4582bf4f32/items",
      {
        headers: {
          Authorization: "Bearer 3cbb40de0df9e12bd3be24b4fdc7a30bd544bbdcf69c32fce84b0a28a4716b83",
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
        {products.map((product) => (
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
            <Pressable
              key={blog.id}
              style={styles.blogCard}
              onPress={() => navigation.navigate("BlogDetail", { blog })}
            >
              {blog.image ? (
                <Image source={{ uri: blog.image }} style={styles.blogImage} />
              ) : null}
              <Text style={styles.blogTag}>{blog.tag}</Text>
              <Text style={styles.blogTitle}>{blog.title}</Text>
              <Text style={styles.blogExcerpt}>{blog.excerpt}</Text>
            </Pressable>
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
  blogCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  blogImage: {
    width: "100%",
    height: 170,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#1f2937",
  },
  blogTag: {
    color: "#81b0ff",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  blogTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  blogExcerpt: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default HomeScreen;

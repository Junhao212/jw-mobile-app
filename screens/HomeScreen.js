import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
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

const CATEGORY_ID_MAP = {
  "699efb8fb33f0d8de566e3b3": "gadgets",
  "edc21b3a2860af30fb9382bab29be147": "gadgets",
  "932224a02b53e70aa470ce043d8a75b0": "tech",
  "bb177a7db8497a6b0130ef4beb905118": "tech",
  "eb1c9a3d36c29abde5307568ae0ba36a": "tech",
};

const CATEGORY_LABELS = {
  tech: "Tech",
  gadgets: "Gadgets",
};

const BLOG_CATEGORY_LABELS = {
  trends: "Trends",
  reviews: "Reviews",
};

const BLOG_CATEGORY_ID_MAP = {
  trends: "trends",
  reviews: "reviews",
};

const PRODUCT_SORT_LABELS = {
  featured: "Aanbevolen",
  priceLow: "Prijs laag-hoog",
  priceHigh: "Prijs hoog-laag",
  name: "Naam A-Z",
  nameDesc: "Naam Z-A",
};

const BLOG_SORT_LABELS = {
  newest: "Nieuwste eerst",
  title: "Titel A-Z",
};

const normalizeCategory = (value) => {
  if (!value) {
    return "";
  }

  const normalizedValue = String(value).trim().toLowerCase();

  if (CATEGORY_ID_MAP[normalizedValue]) {
    return CATEGORY_ID_MAP[normalizedValue];
  }

  if (normalizedValue === "tech" || normalizedValue === "gadgets") {
    return normalizedValue;
  }

  return normalizedValue.replace(/\s+/g, "");
};

const getCategoryFromFieldData = (fieldData = {}) => {
  const possibleFields = [
    fieldData["tech-gadgets"],
    fieldData.physical,
    fieldData.category,
    fieldData.categories,
    fieldData.catogory,
  ];

  for (const field of possibleFields) {
    if (Array.isArray(field) && field.length > 0) {
      const category = normalizeCategory(field[0]);
      if (category) {
        return category;
      }
    }

    if (typeof field === "string" && field.trim()) {
      const category = normalizeCategory(field);
      if (category) {
        return category;
      }
    }
  }

  return "";
};

const normalizeBlogCategory = (value) => {
  if (!value) {
    return "";
  }

  const normalizedValue = String(value).trim().toLowerCase();

  if (BLOG_CATEGORY_ID_MAP[normalizedValue]) {
    return BLOG_CATEGORY_ID_MAP[normalizedValue];
  }

  if (normalizedValue.includes("review")) {
    return "reviews";
  }

  if (normalizedValue.includes("trend")) {
    return "trends";
  }

  return "";
};

const getBlogCategoryFromFieldData = (fieldData = {}) => {
  const possibleFields = [
    fieldData["blog-category"],
    fieldData["post-category"],
    fieldData.category,
    fieldData.catogory,
    fieldData.tags,
  ];

  for (const field of possibleFields) {
    if (Array.isArray(field) && field.length > 0) {
      const category = normalizeBlogCategory(field[0]);
      if (category) {
        return category;
      }
    }

    if (typeof field === "string" && field.trim()) {
      const category = normalizeBlogCategory(field);
      if (category) {
        return category;
      }
    }
  }

  return "";
};

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

const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const WEBFLOW_TOKEN = process.env.EXPO_PUBLIC_WEBFLOW_TOKEN;

const HomeScreen = ({ navigation }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBlogCategory, setSelectedBlogCategory] = useState("");
  const [productSort, setProductSort] = useState("featured");
  const [blogSort, setBlogSort] = useState("newest");
  const [loadError, setLoadError] = useState("");

  const toggleSwitch = () => setIsEnabled((current) => !current);

  useEffect(() => {
    if (!WEBFLOW_TOKEN) {
      setLoadError("Webflow token ontbreekt. Voeg EXPO_PUBLIC_WEBFLOW_TOKEN toe.");
      return;
    }

    fetch("https://api.webflow.com/v2/sites/698c7fdc4b1384bc81c91304/products", {
      headers: {
        Authorization: `Bearer ${WEBFLOW_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Webflow request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const mappedProducts = (data.items || []).map((item) => {
          const fieldData = item.product?.fieldData || {};
          const skuFieldData = item.skus?.[0]?.fieldData || {};

          return {
            id: item.product?.id,
            title: fieldData.name || "Unnamed product",
            subtitle: fieldData.description || "",
            description: fieldData.description || "",
            details: fieldData.description || "",
            price: (skuFieldData.price?.value || 0) / 100,
            createdOn: item.product?.createdOn || "",
            lastPublished: item.product?.lastPublished || "",
            image: skuFieldData["main-image"]?.url
              ? { uri: skuFieldData["main-image"].url }
              : undefined,
            category: getCategoryFromFieldData(fieldData),
            onSale: Boolean(
              fieldData.sale ||
                fieldData.promotion ||
                fieldData.promoted ||
                skuFieldData.sale ||
                skuFieldData["compare-at-price"]
            ),
          };
        });

        setProducts(mappedProducts);
        setLoadError("");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoadError(
          "Webflow products konden niet geladen worden. Controleer je token en site ID."
        );
      });
  }, []);

  useEffect(() => {
    if (!WEBFLOW_TOKEN) {
      return;
    }

    fetch("https://api.webflow.com/v2/collections/699efb571075dc4582bf4f32/items", {
      headers: {
        Authorization: `Bearer ${WEBFLOW_TOKEN}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Webflow request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const mappedBlogs = (data.items || []).map((item) => {
          const fieldData = item.fieldData || {};
          const blogCategory =
            getBlogCategoryFromFieldData(fieldData) ||
            normalizeBlogCategory(fieldData.catogory) ||
            normalizeBlogCategory(fieldData.category) ||
            normalizeBlogCategory(fieldData["post-category"]) ||
            normalizeBlogCategory(fieldData["blog-category"]) ||
            normalizeBlogCategory(fieldData.name) ||
            normalizeBlogCategory(fieldData.slug) ||
            (fieldData.featured ? "trends" : "reviews");

          return {
            id: item.id,
            tag: BLOG_CATEGORY_LABELS[blogCategory] || "Blog",
            title: fieldData.name || "Untitled blog",
            excerpt:
              fieldData["post-summary"] ||
              fieldData.summary ||
              fieldData.description ||
              "Open dit artikel voor meer details.",
            body: stripHtml(fieldData["post-body"] || ""),
            image: getImageUrl(fieldData),
            category: blogCategory,
            featured: Boolean(fieldData.featured),
            createdOn: item.createdOn || "",
            lastPublished: item.lastPublished || "",
          };
        });

        setBlogs(mappedBlogs);
      })
      .catch((error) => console.error("Error fetching blogs:", error));
  }, []);

  const availableCategories = useMemo(() => {
    return [
      ...new Set(
        products.map((product) => product.category).filter(Boolean)
      ),
    ];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const nextProducts = products.filter((product) => {
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      const matchesSearch =
        !searchQuery ||
        product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPromotion = !isEnabled || product.onSale;

      return matchesCategory && matchesSearch && matchesPromotion;
    });

    return [...nextProducts].sort((left, right) => {
      if (productSort === "priceLow") {
        return left.price - right.price;
      }

      if (productSort === "priceHigh") {
        return right.price - left.price;
      }

      if (productSort === "name") {
        return left.title.localeCompare(right.title);
      }

      if (productSort === "nameDesc") {
        return right.title.localeCompare(left.title);
      }

      if (left.onSale !== right.onSale) {
        return left.onSale ? -1 : 1;
      }

      return right.title.localeCompare(left.title);
    });
  }, [isEnabled, productSort, products, searchQuery, selectedCategory]);

  const filteredBlogs = useMemo(() => {
    const nextBlogs = blogs.filter((blog) => {
      const matchesCategory =
        !selectedBlogCategory || blog.category === selectedBlogCategory;
      const matchesSearch =
        !searchQuery || blog.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPromotion = !isEnabled || blog.featured;

      return matchesCategory && matchesSearch && matchesPromotion;
    });

    return [...nextBlogs].sort((left, right) => {
      if (blogSort === "title") {
        return left.title.localeCompare(right.title);
      }

      return (
        new Date(right.lastPublished || right.createdOn || 0).getTime() -
        new Date(left.lastPublished || left.createdOn || 0).getTime()
      );
    });
  }, [blogSort, blogs, isEnabled, searchQuery, selectedBlogCategory]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.list}>
        <Text style={styles.heading}>JW Shop</Text>
        <Text style={styles.subheading}>Tech en gadgets, helder gefilterd.</Text>

        <TextInput
          placeholder="Zoek een product of blog..."
          placeholderTextColor="#737373"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Only show promotions</Text>
          <Switch
            style={styles.switch}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#81b0ff" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Producten</Text>
          <Text style={styles.sectionMeta}>{filteredProducts.length} resultaten</Text>
        </View>

        <View style={styles.filterPanel}>
          <Text style={styles.panelLabel}>Categorie</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={selectedCategory}
              onValueChange={setSelectedCategory}
              dropdownIconColor="#000"
              style={styles.picker}
            >
              <Picker.Item label="Alle categorieen" value="" />
              {availableCategories.map((category) => (
                <Picker.Item
                  key={category}
                  label={CATEGORY_LABELS[category] || category}
                  value={category}
                />
              ))}
            </Picker>
          </View>

          <Text style={styles.panelLabel}>Sorteer producten</Text>
          <View style={styles.pickerWrap}>
            <Picker
              selectedValue={productSort}
              onValueChange={setProductSort}
              dropdownIconColor="#000"
              style={styles.picker}
            >
              {Object.entries(PRODUCT_SORT_LABELS).map(([value, label]) => (
                <Picker.Item key={value} label={label} value={value} />
              ))}
            </Picker>
          </View>
        </View>

        {loadError ? <Text style={styles.notice}>{loadError}</Text> : null}

        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.subtitle}
            price={product.price}
            image={product.image}
            category={CATEGORY_LABELS[product.category] || product.category}
            onPress={() => navigation.navigate("Details", { product })}
          />
        ))}

        <View style={styles.blogSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.blogHeading}>Blogs</Text>
            <Text style={styles.sectionMeta}>{filteredBlogs.length} artikelen</Text>
          </View>

          <View style={styles.filterPanel}>
            <Text style={styles.panelLabel}>Blogcategorie</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={selectedBlogCategory}
                onValueChange={setSelectedBlogCategory}
                dropdownIconColor="#000"
                style={styles.picker}
              >
                <Picker.Item label="Alle blogs" value="" />
                <Picker.Item label="Trends" value="trends" />
                <Picker.Item label="Reviews" value="reviews" />
              </Picker>
            </View>

            <Text style={styles.panelLabel}>Sorteer blogs</Text>
            <View style={styles.pickerWrap}>
              <Picker
                selectedValue={blogSort}
                onValueChange={setBlogSort}
                dropdownIconColor="#000"
                style={styles.picker}
              >
                {Object.entries(BLOG_SORT_LABELS).map(([value, label]) => (
                  <Picker.Item key={value} label={label} value={value} />
                ))}
              </Picker>
            </View>
          </View>

          {filteredBlogs.map((blog) => (
            <BlogCard
              key={blog.id}
              tag={blog.tag}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.image}
              onPress={() => navigation.navigate("BlogDetail", { blog })}
            />
          ))}

          {filteredBlogs.length === 0 ? (
            <Text style={styles.emptyState}>Geen blogs gevonden voor deze filter.</Text>
          ) : null}
        </View>

        {filteredProducts.length === 0 && filteredBlogs.length === 0 ? (
          <Text style={styles.emptyState}>
            Geen resultaten gevonden voor deze filter.
          </Text>
        ) : null}
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
    fontSize: 32,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 48,
    marginBottom: 6,
  },
  subheading: {
    color: "#8ca3c4",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 18,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  filterLabel: {
    color: "#fff",
    marginLeft: 8,
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
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderColor: "#555",
    borderWidth: 1,
    color: "#737373",
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  pickerWrap: {
    marginBottom: 12,
    marginHorizontal: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
  },
  picker: {
    color: "#000",
    backgroundColor: "#fff",
  },
  notice: {
    color: "#ffb4b4",
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  sectionHeader: {
    width: "100%",
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#f5fbff",
    fontSize: 20,
    fontWeight: "800",
  },
  sectionMeta: {
    color: "#6e88a9",
    fontSize: 13,
    fontWeight: "600",
  },
  filterPanel: {
    width: "100%",
    backgroundColor: "#081423",
    borderColor: "#173250",
    borderWidth: 1,
    borderRadius: 18,
    paddingTop: 14,
    paddingBottom: 6,
    marginBottom: 14,
  },
  panelLabel: {
    color: "#8ca3c4",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 6,
    marginHorizontal: 12,
  },
  blogSection: {
    width: "100%",
    marginTop: 16,
  },
  blogHeading: {
    color: "#f5fbff",
    fontSize: 20,
    fontWeight: "800",
  },
  emptyState: {
    width: "100%",
    color: "#fff",
    textAlign: "center",
    marginTop: 16,
    opacity: 0.8,
  },
});

export default HomeScreen;

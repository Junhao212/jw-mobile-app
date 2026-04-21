import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  Button,
} from "react-native";

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params || {};
  const [quantity, setQuantity] = useState(1);
  const productPrice =
    typeof product?.price === "number"
      ? product.price
      : Number(String(product?.price || "0").replace(/[^0-9.,]/g, "").replace(",", "."));
  const totalPrice = Number.isFinite(productPrice) ? productPrice * quantity : 0;

  const decreaseQuantity = () => setQuantity((current) => Math.max(1, current - 1));
  const increaseQuantity = () => setQuantity((current) => current + 1);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <Image
        source={product?.image || require("../assets/ring.png")}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Device overview</Text>
        <Text style={styles.title}>{product?.title || "Tech gadget"}</Text>
        <Text style={styles.price}>{product?.price || "EUR 199"}</Text>

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.description}>
          {product?.description || "Compacte gadget met slimme features."}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Specs & highlights</Text>
          <Text style={styles.infoText}>
            {product?.details ||
              "Ontworpen voor dagelijkse tech-liefhebbers die stijl en prestaties willen combineren."}
          </Text>
        </View>

        <View style={styles.quantityBox}>
          <Text style={styles.quantityLabel}>Aantal</Text>

          <View style={styles.quantityControls}>
            <Pressable style={styles.quantityButton} onPress={decreaseQuantity}>
              <Text style={styles.quantityButtonText}>-</Text>
            </Pressable>

            <Text style={styles.quantityValue}>{quantity}</Text>

            <Pressable style={styles.quantityButton} onPress={increaseQuantity}>
              <Text style={styles.quantityButtonText}>+</Text>
            </Pressable>
          </View>

          <Text style={styles.totalText}>
            Totaal: ${totalPrice.toFixed(2)}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Battery</Text>
            <Text style={styles.statValue}>All day</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Sync</Text>
            <Text style={styles.statValue}>Instant</Text>
          </View>
        </View>

        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Add to cart</Text>
        </Pressable>

        <View style={styles.helpButton}>
          <Button
            title="Vraag advies"
            color="#57d1ff"
            onPress={() => console.log("Advies gevraagd voor", product?.title)}
          />
        </View>
      </View>
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
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#102139",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1a3658",
  },
  backText: {
    color: "#d9ecff",
    textAlign: "center",
    fontWeight: "700",
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 24,
    marginBottom: 18,
    resizeMode: "contain",
    backgroundColor: "#0c1b30",
  },
  card: {
    backgroundColor: "#0c1b30",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#173250",
  },
  label: {
    color: "#57d1ff",
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  title: {
    color: "#f5fbff",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 8,
  },
  price: {
    color: "#57d1ff",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: "#f5fbff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 6,
  },
  description: {
    color: "#90a4bf",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#081423",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  infoTitle: {
    fontWeight: "800",
    fontSize: 16,
    color: "#f5fbff",
    marginBottom: 6,
  },
  infoText: {
    color: "#90a4bf",
    lineHeight: 21,
    fontSize: 14,
  },
  quantityBox: {
    backgroundColor: "#081423",
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  quantityLabel: {
    color: "#f5fbff",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    backgroundColor: "#102139",
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#1a3658",
  },
  quantityButtonText: {
    color: "#f5fbff",
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 26,
  },
  quantityValue: {
    color: "#f5fbff",
    fontSize: 22,
    fontWeight: "900",
  },
  totalText: {
    color: "#57d1ff",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 14,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#081423",
    borderRadius: 16,
    padding: 15,
  },
  statLabel: {
    color: "#6f88aa",
    fontSize: 12,
    marginBottom: 6,
  },
  statValue: {
    color: "#f5fbff",
    fontSize: 18,
    fontWeight: "800",
  },
  buyButton: {
    backgroundColor: "#57d1ff",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#07111f",
    fontWeight: "800",
    fontSize: 15,
  },
  helpButton: {
    marginTop: 12,
  },
});

export default ProductDetail;

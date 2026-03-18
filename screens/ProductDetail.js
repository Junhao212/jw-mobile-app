import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProductDetail = ({ route }) => {
  const { title, description, price, image } = route.params || {};
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      <Text style={styles.price}>{price}</Text>

      <View style={styles.quantityContainer}>
        <Text style={styles.quantityButton} onPress={decreaseQuantity}>
          -
        </Text>
        <Text style={styles.quantityValue}>{quantity}</Text>
        <Text style={styles.quantityButton} onPress={increaseQuantity}>
          +
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },

  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
  },

  description: {
    color: "gray",
    marginVertical: 10,
    textAlign: "center",
  },

  price: {
    color: "red",
    fontSize: 20,
    fontWeight: "bold",
  },

  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginTop: 20,
  },

  quantityButton: {
    color: "black",
    fontSize: 28,
    fontWeight: "bold",
    minWidth: 24,
    textAlign: "center",
  },

  quantityValue: {
    fontSize: 20,
    fontWeight: "600",
  },
});

export default ProductDetail;

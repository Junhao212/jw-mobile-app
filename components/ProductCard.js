import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ProductCard({ title, description, price, image, details }) {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <View style={styles.visualWrap}>
        <Text style={styles.visualTag}>GADGET</Text>
        <Image
          source={image || require("../assets/ring.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.overline}>Featured tech</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("Details", {
              product: { title, description, price, image, details },
            })
          }
        >
          <Text style={styles.buttonText}>Open details</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#0c1b30",
    borderRadius: 22,
    width: "48%",
    marginBottom: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#173250",
  },
  visualWrap: {
    backgroundColor: "#081423",
    padding: 12,
  },
  visualTag: {
    color: "#57d1ff",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 130,
    resizeMode: "contain",
    borderRadius: 16,
    backgroundColor: "#102139",
  },
  content: {
    padding: 14,
  },
  overline: {
    color: "#7b94b5",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  title: {
    fontWeight: "800",
    fontSize: 17,
    color: "#f5fbff",
    marginBottom: 6,
  },
  description: {
    color: "#90a4bf",
    fontSize: 13,
    lineHeight: 18,
    minHeight: 54,
    marginBottom: 10,
  },
  price: {
    color: "#57d1ff",
    fontWeight: "800",
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#57d1ff",
    paddingVertical: 11,
    borderRadius: 12,
  },
  buttonText: {
    color: "#07111f",
    textAlign: "center",
    fontWeight: "800",
    fontSize: 13,
  },
});

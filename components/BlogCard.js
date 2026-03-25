import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function BlogCard({ tag, title, excerpt, image, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {image ? <Image source={{ uri: image }} style={styles.image} /> : null}

      <View style={styles.content}>
        <Text style={styles.tag}>{tag}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.excerpt}>{excerpt}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 170,
    backgroundColor: "#1f2937",
  },
  content: {
    padding: 16,
  },
  tag: {
    color: "#81b0ff",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  excerpt: {
    color: "#cbd5e1",
    fontSize: 14,
    lineHeight: 20,
  },
});

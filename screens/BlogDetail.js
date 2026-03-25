import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

const BlogDetail = ({ route }) => {
  const { blog } = route.params || {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="light" />

      <View style={styles.hero}>
        {blog?.image ? (
          <Image source={{ uri: blog.image }} style={styles.image} />
        ) : null}
        <Text style={styles.tag}>{blog?.tag || "Blog"}</Text>
        <Text style={styles.title}>{blog?.title || "Tech artikel"}</Text>
        <Text style={styles.excerpt}>
          {blog?.excerpt || "Korte inzichten over gadgets, wearables en nieuwe tech."}
        </Text>
      </View>

      <View style={styles.article}>
        <Text style={styles.heading}>Waarom dit belangrijk is</Text>
        <Text style={styles.paragraph}>
          Moderne gadget-shops werken beter wanneer producten worden ondersteund
          door duidelijke content. Blogs helpen bezoekers sneller begrijpen welk
          toestel past bij hun gebruik, budget en dagelijkse routine.
        </Text>

        <Text style={styles.heading}>Waarop letten</Text>
        <Text style={styles.paragraph}>
          Kijk naar batterijduur, comfort, ecosysteem, notificaties en hoe goed
          een device past bij werk, sport of reizen. Een goede mix van specs en
          praktische uitleg maakt de shop sterker.
        </Text>
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
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: "#0c1b30",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#173250",
    marginBottom: 18,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#1f2937",
  },
  tag: {
    color: "#57d1ff",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  title: {
    color: "#f5fbff",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 10,
  },
  excerpt: {
    color: "#90a4bf",
    fontSize: 15,
    lineHeight: 22,
  },
  article: {
    backgroundColor: "#0c1b30",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#173250",
  },
  heading: {
    color: "#f5fbff",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
  },
  paragraph: {
    color: "#90a4bf",
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 18,
  },
});

export default BlogDetail;

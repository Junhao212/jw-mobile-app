import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ProductCard({ title, description, price, image, details }) {
  const navigation = useNavigation();

  return (
    <View style={styles.card}>
      <Image
        source={image || require('../assets/ring.png')}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>{price}</Text>

        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate('Details', {
              product: { title, description, price, image, details },
            })
          }
        >
          <Text style={styles.buttonText}>Bekijk product</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fffaf5',
    borderRadius: 22,
    width: '48%',
    marginBottom: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
  },
  content: {
    padding: 14,
  },
  title: {
    fontWeight: '800',
    fontSize: 17,
    color: '#2f241f',
    marginBottom: 6,
  },
  description: {
    color: '#6d5f56',
    fontSize: 13,
    lineHeight: 18,
    minHeight: 54,
    marginBottom: 10,
  },
  price: {
    color: '#b85c38',
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#2f241f',
    paddingVertical: 11,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fffaf5',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 13,
  },
});

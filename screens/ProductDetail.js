import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';

const ProductDetail = ({ route, navigation }) => {
  const { product } = route.params || {};

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <StatusBar style="dark" />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>Terug</Text>
      </Pressable>

      <Image
        source={product?.image || require('../assets/ring.png')}
        style={styles.image}
      />

      <View style={styles.card}>
        <Text style={styles.label}>Product details</Text>
        <Text style={styles.title}>{product?.title || 'Smart Ring'}</Text>
        <Text style={styles.price}>{product?.price || 'EUR 299'}</Text>

        <Text style={styles.sectionTitle}>Beschrijving</Text>
        <Text style={styles.description}>
          {product?.description || 'Slimme ring voor gezondheid en tracking'}
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Alle details</Text>
          <Text style={styles.infoText}>
            {product?.details ||
              'Dit model helpt je je gezondheid en dagelijkse activiteit eenvoudig op te volgen.'}
          </Text>
        </View>

        <View style={styles.quantityBox}>
          <Text style={styles.quantityLabel}>Aantal</Text>

          <View style={styles.quantityControls}>
            <View style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </View>

            <Text style={styles.quantityText}>1</Text>

            <View style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Toevoegen</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4ede6',
  },
  content: {
    padding: 18,
    paddingBottom: 36,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#2f241f',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 14,
    marginBottom: 16,
  },
  backText: {
    color: '#fffaf5',
    textAlign: 'center',
    fontWeight: '700',
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 24,
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#fffaf5',
    padding: 20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  label: {
    color: '#b85c38',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  title: {
    color: '#2f241f',
    fontSize: 30,
    fontWeight: '800',
    marginBottom: 8,
  },
  price: {
    color: '#b85c38',
    fontWeight: '800',
    fontSize: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    color: '#2f241f',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  description: {
    color: '#6c5e56',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#f2e4d7',
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  infoTitle: {
    fontWeight: '800',
    fontSize: 16,
    color: '#2f241f',
    marginBottom: 6,
  },
  infoText: {
    color: '#6c5e56',
    lineHeight: 21,
    fontSize: 14,
  },
  quantityBox: {
    backgroundColor: '#f8f1ea',
    borderRadius: 18,
    padding: 15,
    marginBottom: 18,
  },
  quantityLabel: {
    color: '#2f241f',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 10,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityButton: {
    backgroundColor: '#2f241f',
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    color: '#fffaf5',
    fontSize: 20,
    fontWeight: '800',
  },
  quantityText: {
    color: '#2f241f',
    fontSize: 20,
    fontWeight: '800',
  },
  buyButton: {
    backgroundColor: '#b85c38',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fffaf5',
    fontWeight: '800',
    fontSize: 15,
  },
});

export default ProductDetail;

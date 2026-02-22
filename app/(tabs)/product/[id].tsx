import { View, Text, Image, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(r => r.json())
      .then(setProduct);
  }, [id]);

  if (!product) return null;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { height: 250, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold' },
  price: { color: '#2437AB', fontSize: 20, marginVertical: 10 },
});
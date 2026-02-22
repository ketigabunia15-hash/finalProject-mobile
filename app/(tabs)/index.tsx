import { FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(r => r.json())
      .then(setProducts);
  }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={i => i.id.toString()}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => router.push(`/product/${item.id}`)}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text numberOfLines={2}>{item.title}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#F5F5F5', padding: 15, borderRadius: 12, marginBottom: 20 },
  image: { height: 120, resizeMode: 'contain', marginBottom: 10 },
  price: { color: '#2437AB', fontWeight: 'bold' },
});


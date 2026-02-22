import {
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Button,
} from 'react-native';

import { useEffect, useState } from 'react';
import { useStore } from '../../context/StoreContext';

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const { addToCart, addToSaved } = useStore();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(r => r.json())
      .then(setProducts);
  }, []);

  if (selectedProduct) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedProduct.image }} style={styles.detailImage} />

        <Text style={styles.title}>{selectedProduct.title}</Text>

        <Text style={styles.description}>
          {selectedProduct.description}
        </Text>

        <Text style={styles.price}>
          ${selectedProduct.price}
        </Text>

        <Button title="Add to Cart" onPress={() => addToCart(selectedProduct)} />

        <Button title="Save" onPress={() => addToSaved(selectedProduct)} />

        <Button title="Back" onPress={() => setSelectedProduct(null)} />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => setSelectedProduct(item)}
        >
          <Image source={{ uri: item.image }} style={styles.image} />

          <Text numberOfLines={2}>{item.title}</Text>

          <Text style={styles.price}>${item.price}</Text>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.buttonText}>Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => addToSaved(item)}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  card: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },

  image: {
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  detailImage: {
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  description: {
    marginBottom: 10,
  },

  price: {
    color: '#2437AB',
    fontWeight: 'bold',
    marginBottom: 10,
  },

  row: {
    flexDirection: 'row',
    gap: 10,
  },

  button: {
    backgroundColor: '#2437AB',
    padding: 8,
    borderRadius: 8,
  },

  buttonText: {
    color: '#fff',
  },
});
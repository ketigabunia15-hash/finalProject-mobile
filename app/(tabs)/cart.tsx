import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

type CartProduct = {
  productId: number;
  quantity: number;
};

type Cart = {
  products: CartProduct[];
};

export default function Cart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/carts/2')
      .then(res => res.json())
      .then(data => setCart(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2437AB" />
      </View>
    );
  }

  if (!cart) return null;

  return (
    <FlatList
      data={cart.products}
      keyExtractor={(item) => item.productId.toString()}
      contentContainerStyle={{ padding: 20 }}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.product}>
            Product ID: {item.productId}
          </Text>
          <Text style={styles.qty}>
            Quantity: {item.quantity}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
  },
  product: {
    fontWeight: '600',
    marginBottom: 6,
  },
  qty: {
    color: '#2437AB',
    fontWeight: 'bold',
  },
});
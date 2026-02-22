import { View, Text, FlatList, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { useStore, Product } from '../../context/StoreContext';
import { Ionicons } from '@expo/vector-icons';

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useStore();

  // პროდუქტის რაოდენობის შეცვლა
  const changeQuantity = (productId: number, delta: number) => {
  setCart(prev =>
    prev
      .map(p =>
        p.id === productId ? { ...p, quantity: (p.quantity || 1) + delta } : p
      )
      .filter(p => (p.quantity || 0) > 0) // ავტომატურად წაშლის, თუ quantity 0-ზე ნაკლებია
  );
};

  // პროდუქტის წაშლა
  const removeItem = (productId: number) => {
    removeFromCart(productId);
  };

  const total = cart.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>

              <View style={styles.row}>
                <TouchableOpacity onPress={() => changeQuantity(item.id, -1)}>
                  <Ionicons name="remove-circle-outline" size={24} color="#2437AB" />
                </TouchableOpacity>
                <Text style={styles.qty}>{item.quantity || 1}</Text>
                <TouchableOpacity onPress={() => changeQuantity(item.id, 1)}>
                  <Ionicons name="add-circle-outline" size={24} color="#2437AB" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => removeItem(item.id)} style={{ marginLeft: 20 }}>
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
            <View style={styles.payButton}>
              <Text style={styles.payText}>Proceed to Pay</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  listContent: { padding: 20, paddingBottom: 100 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, resizeMode: 'contain', marginRight: 10 },
  info: { flex: 1 },
  title: { fontWeight: '600', marginBottom: 5 },
  price: { fontWeight: 'bold', color: '#2437AB', marginBottom: 5 },
  row: { flexDirection: 'row', alignItems: 'center' },
  qty: { marginHorizontal: 10, fontWeight: 'bold', fontSize: 16 },
  footer: { marginTop: 20, alignItems: 'center' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
  payButton: {
    backgroundColor: '#BFA150',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  payText: { color: '#fff', fontWeight: 'bold' },
});

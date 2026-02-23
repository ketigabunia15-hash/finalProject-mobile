import { Ionicons } from "@expo/vector-icons";
import { FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { useStore } from '../../context/StoreContext';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useStore();

  // სულ ჯამი
  const total = cart.reduce(
    (sum, p) => sum + p.price * (p.quantity || 1),
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* პროდუქტის ფოტო */}
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* ინფო */}
            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>

              {/* row: - quantity + 🗑 */}
              <View style={styles.row}>
                {/* - quantity */}
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                  <Ionicons
                    name="remove-circle-outline"
                    size={24}
                    color="#2437AB"
                  />
                </TouchableOpacity>

                {/* quantity */}
                <Text style={styles.qty}>{item.quantity || 1}</Text>

                {/* + quantity */}
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                  <Ionicons
                    name="add-circle-outline"
                    size={24}
                    color="#2437AB"
                  />
                </TouchableOpacity>

                {/* 🗑 Remove */}
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                  style={{ marginLeft: 20 }}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>

            <TouchableOpacity style={styles.payButton}>
              <Text style={styles.payText}>Proceed to Pay</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  listContent: { padding: 20, paddingBottom: 100 },
  card: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  image: { width: 80, height: 80, resizeMode: "contain", marginRight: 10 },
  info: { flex: 1 },
  title: { fontWeight: "600", marginBottom: 5 },
  price: { fontWeight: "bold", color: "#2437AB", marginBottom: 5 },
  row: { flexDirection: "row", alignItems: "center" },
  qty: { marginHorizontal: 10, fontWeight: "bold", fontSize: 16 },
  footer: { marginTop: 20, alignItems: "center" },
  total: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  payButton: {
    backgroundColor: "#BFA150",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  payText: { color: "#fff", fontWeight: "bold" },
});


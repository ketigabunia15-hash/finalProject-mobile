import { useStore, Product } from "../../context/StoreContext";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Saved() {
  const { saved, addToCart, removeFromSaved } = useStore();

  // move to cart
  const moveToCart = (item: Product) => {
    addToCart(item); // ვამატებთ cart-ში
    removeFromSaved(item.id); // ვშლით saved-დან
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Product Image */}
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.info}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>

              <View style={styles.actions}>
                {/* ❤️ Add back to cart */}
                <TouchableOpacity
                  style={styles.cartBtn}
                  onPress={() => moveToCart(item)}
                >
                  <Ionicons name="cart-outline" size={18} color="#fff" />
                  <Text style={styles.btnText}>Add to cart</Text>
                </TouchableOpacity>

                {/* 🗑 Remove from saved */}
                <TouchableOpacity onPress={() => removeFromSaved(item.id)}>
                  <Ionicons name="trash-outline" size={22} color="red" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No saved items yet 🤍</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontWeight: "bold",
    color: "#2437AB",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cartBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2437AB",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "600",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
  },
});

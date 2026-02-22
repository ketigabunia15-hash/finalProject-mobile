import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useStore } from "../../context/storeContext";

export default function Saved() {
  const { saved } = useStore();

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        )}
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
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontWeight: "600",
    marginBottom: 5,
  },
  price: {
    fontWeight: "bold",
    color: "#2437AB",
  },
});

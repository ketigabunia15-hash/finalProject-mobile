import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type User = {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  username: string;
  phone: string;
};

export default function Profile() {

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/users/3");
      const data = await res.json();
      setUser(data);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/(auth)/login");
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#2437AB" />
      </View>
    );
  }

  if (!user) return null;

  return (
    <View style={styles.container}>

      {/* Avatar */}
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name.firstname[0].toUpperCase()}
        </Text>
      </View>

      {/* Name */}
      <Text style={styles.name}>
        {user.name.firstname} {user.name.lastname}
      </Text>

      {/* User info + logout button */}
      <View style={styles.card}>

        <Text style={styles.label}>Username</Text>
        <Text>{user.username}</Text>

        <Text style={styles.label}>Email</Text>
        <Text>{user.email}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text>{user.phone}</Text>

        {/* Logout button inside profile info */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },

  container: {
    flex: 1,
    padding: 25,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center"
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2437AB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    elevation: 5
  },

  avatarText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold"
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25
  },

  card: {
    width: "100%",
    backgroundColor: "#F5F7FB",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3
  },

  label: {
    marginTop: 12,
    fontWeight: "600",
    color: "#2437AB"
  },

  logoutButton: {
    marginTop: 30,
    backgroundColor: "#BFA150",
    paddingVertical: 14,
    borderRadius: 12
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }

});
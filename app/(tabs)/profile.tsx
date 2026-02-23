import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
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
  const [image, setImage] = useState<string | null>(null);

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

  // Gallery open
  const pickImage = async () => {

    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Gallery permission required");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
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

      {/* User Name */}
      <Text style={styles.name}>
        {user.name.firstname} {user.name.lastname}
      </Text>

      {/* Photo Button */}
      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Change Profile Photo
        </Text>
      </TouchableOpacity>

      {/* Info Card */}
      <View style={styles.card}>

        <Text style={styles.label}>Username</Text>
        <Text>{user.username}</Text>

        <Text style={styles.label}>Email</Text>
        <Text>{user.email}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text>{user.phone}</Text>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  container: {
  flex: 1,
  paddingHorizontal: 25,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#fff",
},

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#2437AB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15
  },

  avatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold"
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15
  },

  photoButton: {
    backgroundColor: "#2437AB",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 25
  },

  card: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    padding: 20
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
    borderRadius: 10
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  }

});

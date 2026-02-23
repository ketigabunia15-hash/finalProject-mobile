import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { authStyles } from "../styles/authStyles";

export default function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {

    if (!username || !password) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://fakestoreapi.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) throw new Error();

      // თუ remember me ჩართულია
      if (rememberMe) {
        await AsyncStorage.setItem("token", data.token);
      }

      // მთავარი გვერდზე გადასვლა
      router.replace("/(tabs)");

    } catch (error) {
      Alert.alert("Login failed", "Incorrect username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>

      <View style={authStyles.card}>

        <Text style={authStyles.title}>Login</Text>

        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={authStyles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={authStyles.input}
        />

        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text style={{ marginLeft: 8 }}>Remember me</Text>
        </View>

        <TouchableOpacity
          style={authStyles.button}
          onPress={handleLogin}
        >
          <Text style={authStyles.buttonText}>
            {loading ? "Loading..." : "Login"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={authStyles.linkText}>
            Don't have an account? Register
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
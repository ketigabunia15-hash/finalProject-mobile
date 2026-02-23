import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import Checkbox from "expo-checkbox";
import { router } from "expo-router";
import { authStyles } from "../styles/authStyles";

export default function Login() {

  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={authStyles.container}>

      <View style={authStyles.card}>

        <Text style={authStyles.title}>Login</Text>

        <TextInput
          placeholder="Username"
          style={authStyles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={authStyles.input}
        />

        {/* Remember Me Row */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
          />
          <Text style={{ marginLeft: 8 }}>Remember me</Text>
        </View>

        <TouchableOpacity style={authStyles.button}>
          <Text style={authStyles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

        {/* Register navigation */}
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
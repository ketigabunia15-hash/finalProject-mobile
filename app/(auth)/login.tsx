import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";

const schema = yup.object({
  username: yup.string().required("Username required"),
  password: yup.string().required("Password required"),
});

export default function Login() {

  const [rememberMe, setRememberMe] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  // ავტო login check
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) router.replace("/(tabs)");
  };

  const onSubmit = async (data: any) => {
    try {

      const response = await fetch(
        "https://fakestoreapi.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.username,
            password: data.password
          })
        }
      );

      const result = await response.json();

      if (!response.ok) throw new Error();

      // Remember me logic
      if (rememberMe) {
        await AsyncStorage.setItem("token", result.token);
      }

      router.replace("/(tabs)");

    } catch {
      Alert.alert("Login failed");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>

      <Text style={{ fontSize: 26, marginBottom: 25 }}>Login</Text>

      {/* Username */}
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Username"
              value={value}
              onChangeText={onChange}
              style={{ borderWidth: 1, padding: 12, marginBottom: 6 }}
            />
            {errors.username &&
              <Text style={{ color: "red" }}>{errors.username.message}</Text>}
          </>
        )}
      />

      {/* Password */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Password"
              secureTextEntry
              value={value}
              onChangeText={onChange}
              style={{ borderWidth: 1, padding: 12, marginTop: 10 }}
            />
            {errors.password &&
              <Text style={{ color: "red" }}>{errors.password.message}</Text>}
          </>
        )}
      />

      {/* Remember me */}
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 15 }}>
        <Checkbox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={{ marginLeft: 8 }}>Remember me</Text>
      </View>

      {/* Login button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{
          backgroundColor: "#4A6CF7",
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Login
        </Text>
      </TouchableOpacity>

      {/* Register suggestion */}
      <TouchableOpacity
        onPress={() => router.push("/(auth)/register")}
        style={{ marginTop: 20 }}
      >
        <Text style={{ textAlign: "center", color: "#2437AB" }}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>

    </View>
  );
}


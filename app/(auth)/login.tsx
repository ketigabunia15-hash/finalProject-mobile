import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);

  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // 👉 ჩავსვათ შენახული მონაცემები input-ში
  useEffect(() => {
    const loadSavedUser = async () => {
      const savedUser = await AsyncStorage.getItem("userData");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setValue("username", parsed.username);
        setValue("password", parsed.password);
        setRememberMe(true);
      }
    };
    loadSavedUser();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch(
        "https://fakestoreapi.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        Alert.alert("Login failed");
        return;
      }

      // 👉 Remember Me
      if (rememberMe) {
        await AsyncStorage.setItem("userData", JSON.stringify(data));
      } else {
        await AsyncStorage.removeItem("userData");
      }

      router.replace("/(tabs)");
    } catch {
      Alert.alert("Error");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Username"
            value={value}
            onChangeText={onChange}
            style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
          />
        )}
      />

      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
        <Checkbox value={rememberMe} onValueChange={setRememberMe} />
        <Text style={{ marginLeft: 8 }}>Remember me</Text>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{ backgroundColor: "#2437AB", padding: 15, borderRadius: 10 }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

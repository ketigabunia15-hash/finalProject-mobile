import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { authStyles } from "../styles/authStyles";

export default function Register() {

  return (
    <View style={authStyles.container}>

      <View style={authStyles.card}>

        <Text style={authStyles.title}>Register</Text>

        <TextInput
          placeholder="Full Name"
          style={authStyles.input}
        />

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={authStyles.input}
        />

        <TextInput
          placeholder="Username"
          style={authStyles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={authStyles.input}
        />

        <TouchableOpacity style={authStyles.button}>
          <Text style={authStyles.buttonText}>
            Create Account
          </Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <Text style={authStyles.linkText}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}


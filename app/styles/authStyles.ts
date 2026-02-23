import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    backgroundColor: "#fff"
  },

  card: {
    backgroundColor: "#F5F7FB",
    padding: 25,
    borderRadius: 18,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
    color: "#2437AB"
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#fff"
  },

  button: {
    backgroundColor: "#4A6CF7",
    padding: 15,
    borderRadius: 12,
    marginTop: 15
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold"
  },

  linkText: {
    textAlign: "center",
    marginTop: 20,
    color: "#2437AB",
    fontWeight: "600"
  }

});
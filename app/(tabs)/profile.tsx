import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type User = {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  username: string;
  phone: string;
};

type RootStackParamList = {
  Login: undefined;
};

export default function Profile() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/users/3')
      .then(res => res.json())
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }, []);

  // Log Out ღილაკის ფუნქცია
  const handleLogout = () => {
    // აქ შეგიძლიათ დაასუფთაოთ user state ან token, თუ გაქვთ
    setUser(null);
    // გადაჰყავს Login screen-ზე და history წაშლის
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }], // თქვენი Log In screen-ის name
    });
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
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {user.name.firstname[0].toUpperCase()}
        </Text>
      </View>

      <Text style={styles.name}>
        {user.name.firstname} {user.name.lastname}
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Username</Text>
        <Text>{user.username}</Text>

        <Text style={styles.label}>Email</Text>
        <Text>{user.email}</Text>

        <Text style={styles.label}>Phone</Text>
        <Text>{user.phone}</Text>
      </View>

      {/* Log Out ღილაკი */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#2437AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
    fontWeight: '600',
    color: '#2437AB',
  },
  logoutButton: {
    backgroundColor: '#BFA150',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
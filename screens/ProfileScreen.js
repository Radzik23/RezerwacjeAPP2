import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  // Mockowane dane użytkownika
  const user = {
    id: 1,
    name: 'Jan Kowalski',
    email: 'jan.kowalski@example.com'
  };

  const handleLogout = async () => {
    try {
        await AsyncStorage.removeItem('token');
        Alert.alert('Wylogowano', 'Zostałeś wylogowany');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się wylogować');
    }
  };

  const goToReservations = () => {
    navigation.navigate('Reservations');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil użytkownika</Text>

      <Text style={styles.label}>Imię i nazwisko:</Text>
      <Text style={styles.value}>{user.name}</Text>

      <Text style={styles.label}>E-mail:</Text>
      <Text style={styles.value}>{user.email}</Text>

      <Text style={styles.label}>ID użytkownika:</Text>
      <Text style={styles.value}>{user.id}</Text>

      <View style={styles.button}>
        <Button title="Zobacz rezerwacje" onPress={goToReservations} />
      </View>

      <View style={styles.logout}>
        <Button title="Wyloguj się" onPress={handleLogout} color="#cc0000" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    marginTop: 60
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 12
  },
  value: {
    fontSize: 18,
    marginBottom: 4
  },
  button: {
    marginTop: 32
  },
  logout: {
    marginTop: 16
  }
});

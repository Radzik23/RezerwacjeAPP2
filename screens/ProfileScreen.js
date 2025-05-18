import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';

export default function ProfileScreen({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    console.log("Token JWT:", token);

    if (!token) {
      Alert.alert('Błąd', 'Brak tokenu – zaloguj się ponownie');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
      return;
    }

    const response = await fetch(`${BASE_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(`Błąd serwera: ${response.status}`);
    }

    const data = JSON.parse(responseText);
    setUser(data);

  } catch (error) {
    console.error('❌ Błąd pobierania profilu:', error);
    Alert.alert('Błąd', 'Nie udało się pobrać danych użytkownika');
  }
};


    fetchUser();
  }, []);

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

      {user ? (
        <>
          <Text style={styles.label}>Imię i nazwisko:</Text>
          <Text style={styles.value}>{user.full_name}</Text>

          <Text style={styles.label}>E-mail:</Text>
          <Text style={styles.value}>{user.email}</Text>

          <Text style={styles.label}>ID użytkownika:</Text>
          <Text style={styles.value}>{user.id}</Text>
        </>
      ) : (
        <Text>Ładowanie danych...</Text>
      )}

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

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import { useNavigation } from '@react-navigation/native';

export default function ReservationsScreen() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const fetchReservations = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log('Token JWT:', token);

      const response = await fetch(`${BASE_URL}/reservations`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Błąd serwera: ${response.status}`);
      }

      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('❌ Błąd:', error);
      Alert.alert('Błąd', 'Nie udało się pobrać rezerwacji.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>Restauracja : {item.restaurant_name}</Text>
      <Text>Godzina: {item.reservation_time}</Text>
      <Text>Liczba osób: {item.number_of_people}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007aff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Twoje rezerwacje</Text>

      {reservations.length === 0 ? (
        <Text>Brak rezerwacji</Text>
      ) : (
        <FlatList
          data={reservations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateReservation')}
      >
        <Text style={styles.addButtonText}>+ Dodaj rezerwację</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 50
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  item: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#007aff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

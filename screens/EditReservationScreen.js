// screens/EditReservationScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, Platform,  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import dayjs from 'dayjs'


const EditReservationScreen = ({ route, navigation }) => {
  const { reservation } = route.params;
  const initialDate = reservation.reservation_time || reservation.date || new Date();
  const [date, setDate] = useState(new Date(initialDate));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(reservation.restaurant_id);

const [showPicker, setShowPicker] = useState(false);

const handleDateChange = (event, selectedDate) => {
  const currentDate = selectedDate || date;
  setShowPicker(true); // zamyka kalendarz po wyborze
  setDate(currentDate);
};

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(`${BASE_URL}/restaurants`);
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      Alert.alert('Błąd', 'Nie udało się pobrać restauracji');
    }
  };

  const handleUpdate = async () => {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/reservations/${reservation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          restaurant_id: selectedRestaurant,
          reservation_time: date.toISOString()
        })
      });

      
      if (response.ok) {
        Alert.alert('Sukces', 'Rezerwacja zaktualizowana');
        navigation.goBack();
      } else {
        Alert.alert('Błąd', 'Nie udało się zaktualizować rezerwacji');
      }
    } catch (error) {
      Alert.alert('Błąd', 'Wystąpił błąd sieci');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>Edytuj Rezerwację</Text>



          <Text style={styles.label}>Data i godzina:</Text>
          <Button title={dayjs(date).format('DD/MM/YYYY HH:mm')} onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}

      <View style={{ marginTop: 32 }}>
        <Button title="Zapisz zmiany" onPress={handleUpdate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12
  },
  label: {
    marginTop: 16,
    fontSize: 16
  },
  button: {
    marginTop: 32
  }
});


export default EditReservationScreen;

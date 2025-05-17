import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CreateReservationScreen({ navigation }) {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(`${BASE_URL}/restaurants`);
        const data = await response.json();
        setRestaurants(data);
        if (data.length > 0) {
          setSelectedRestaurant(data[0].id);
        }
      } catch (error) {
        console.error('Błąd ładowania restauracji:', error);
        Alert.alert('Błąd', 'Nie udało się pobrać listy restauracji');
      }
    };
    fetchRestaurants();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false); // zamykamy picker po wyborze
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    if (!selectedRestaurant || !date || !numberOfPeople) {
      Alert.alert('Uwaga', 'Uzupełnij wszystkie pola');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          restaurant_id: selectedRestaurant,
          reservation_time: date.toISOString(),
          number_of_people: parseInt(numberOfPeople)
        })
      });

      const result = await response.json();
      if (response.status === 201) {
        Alert.alert('Sukces', 'Rezerwacja utworzona!');
        navigation.goBack();
      } else {
        Alert.alert('Błąd', result?.msg || 'Nie udało się utworzyć rezerwacji');
      }
    } catch (error) {
      console.error('Błąd tworzenia rezerwacji:', error);
      Alert.alert('Błąd', 'Coś poszło nie tak');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Nowa rezerwacja</Text>

          <Text style={styles.label}>Restauracja:</Text>
          <Picker
            selectedValue={selectedRestaurant}
            onValueChange={(itemValue) => setSelectedRestaurant(itemValue)}
            style={styles.picker}
          >
            {restaurants.map((restaurant) => (
              <Picker.Item
                key={restaurant.id}
                label={`${restaurant.name} – ${restaurant.address}`}
                value={restaurant.id}
              />
            ))}
          </Picker>

          <Text style={styles.label}>Data i godzina:</Text>
          <Button title={date.toLocaleString()} onPress={() => setShowPicker(true)} />
          {showPicker && (
            <DateTimePicker
              value={date}
              mode="datetime"
              display="default"
              onChange={handleDateChange}
            />
          )}

          <Text style={styles.label}>Liczba osób:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Np. 2"
            value={numberOfPeople}
            onChangeText={setNumberOfPeople}
          />

          <Button title="Zarezerwuj" onPress={handleSubmit} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  },
  label: {
    marginTop: 12,
    fontSize: 16
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    marginTop: 6
  },
  picker: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16
  }
});

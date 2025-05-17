import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { BASE_URL } from '../config';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');

const handleRegister = async () => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, full_name: fullName, email })
    });

    const text = await response.text();
    console.log('Odpowiedź z backendu (raw):', text);

    const data = text ? JSON.parse(text) : {}; // unikamy błędu, gdy odpowiedź pusta
    console.log('Status odpowiedzi:', response.status);
    console.log('Dane JSON:', data);

    if (response.status === 201) {
      Alert.alert('Sukces', 'Rejestracja zakończona!');
      navigation.goBack(); // wróć do logowania
    } else {
      Alert.alert('Błąd', data?.msg || 'Nie udało się zarejestrować');
    }
  } catch (error) {
    console.log('Rejestracja error:', error);
    Alert.alert('Błąd', 'Coś poszło nie tak.');
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejestracja</Text>


      
      <TextInput
      style={styles.input}
      placeholder='Email'
      value={email}
      onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
      style={styles.input}
      placeholder='Imię i Nazwisko'
      value={fullName}
      onChangeText={setFullName}
      />

    <TextInput
        style={styles.input}
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
      />



      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Zarejestruj się</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#007aff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

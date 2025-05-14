import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function ReservationsScreen() {
  // Mockowane dane rezerwacji
  const reservations = [
    {
      id: '1',
      restaurant: 'Pizzeria Roma',
      date: '2025-06-12',
      time: '18:00',
      table: 4
    },
    {
      id: '2',
      restaurant: 'Sushi Zen',
      date: '2025-06-14',
      time: '20:00',
      table: 2
    },
    {
      id: '3',
      restaurant: 'Bistro Bella',
      date: '2025-06-15',
      time: '17:30',
      table: 1
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.restaurant}</Text>
      <Text>{item.date} – godz. {item.time}</Text>
      <Text>Stolik nr: {item.table}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Twoje rezerwacje</Text>
      <FlatList
        data={reservations}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
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
  }
});

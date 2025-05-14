import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Profile' }]
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }]
        });
      }
    };

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

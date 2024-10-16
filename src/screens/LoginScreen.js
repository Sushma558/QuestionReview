import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

// Test credentials
const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'password123';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      // Use test credentials if they match, otherwise proceed with Firebase auth
      if (email === TEST_EMAIL && password === TEST_PASSWORD) {
        console.log('Logged in with test credentials');
        navigation.navigate('Home');
      } else {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        console.log('User signed in successfully');
        console.log('User data:', JSON.stringify(userCredential.user, null, 2));
        navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message);
    }
  };

//   const handleAnonymousLogin = async () => {
//     try {
//       const userCredential = await auth().signInAnonymously();
//       console.log('User signed in anonymously');
//       console.log('Anonymous user data:', JSON.stringify(userCredential.user, null, 2));
//       navigation.navigate('TestScreen');
//     } catch (error) {
//       console.error('Anonymous login error:', error);
//       Alert.alert('Error', error.message);
//     }
//   };

 

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.spacer} />
      <View style={styles.spacer} />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  spacer: {
    height: 20,
  },
  testCredentials: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
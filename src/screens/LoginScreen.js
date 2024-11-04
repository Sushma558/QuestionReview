import React, {useState} from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import VisibilityOn from '../assets/VisibilityOn';
import VisibilityOff from '../assets/VisibilityOff';

// Test credentials
const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'password123';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

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
        setLoading(true);
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        console.log('User signed in successfully');
        console.log('User data:', JSON.stringify(userCredential.user, null, 2));
        setLoading(false);
        navigation.navigate('TestScheduleScreen');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message);
      setLoading(false);
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
      <Text
        style={{
          fontSize: 20,
          color: 'black',
          fontWeight: '500',
          textAlign: 'center',
          marginVertical: 10,
        }}>
        Welcome to Question Push to Samai DB
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      /> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 12,
          paddingHorizontal: 8,
          borderRadius: 15,
          elevation: 2,
          backgroundColor: '#fefefe',
        }}>
        <TextInput
          style={{width: 300}}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible} // Toggle visibility
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {isPasswordVisible ? <VisibilityOn /> : <VisibilityOff />}
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: '98%',
            height: 50,
            backgroundColor: '#00a3f9',
            elevation: 1,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleLogin}>
          {loading ?  (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : (
            <Text style={{fontSize: 18, color: 'white', fontWeight: '400'}}>
            Login
          </Text>

          )}
        </TouchableOpacity>
      </View>
      {/* <Button title="Login" /> */}
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
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 15,
    // elevation: 2,
    backgroundColor: '#fefefe',
  },
  spacer: {
    height: 20,
  },
  testCredentials: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import VisibilityOn from '../assets/VisibilityOn';
import VisibilityOff from '../assets/VisibilityOff';
import SamAi from '../assets/SamAi.png';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { useUserData } from '../../UserContext';
// Test credentials
const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'password123';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const navigation=useNavigation();
  const {user, changeUser} = useUserData();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getUserDetails = (userId) => {
    firestore().collection("SamaiReviewUsers")
      .doc(userId)
      .get()
      .then((res) => {
        setUserData(res.data());
        // getUserDetails(res.user.uid);
        console.log(res.data());
        navigation.navigate("Home", { userdata: res.data()} );
        changeUser(res.data());
        console.log("Home", { userdata: res.data() });

      })
      .catch((err) => {
        console.log(err);
      });
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
        console.log('User data:', typeof(userCredential.user),(userCredential.user));
        console.log('User data2:', typeof(userCredential.user.uid),(userCredential.user.uid));
        getUserDetails(userCredential.user.uid);
        setLoading(false);
        
        // navigation.navigate('Home',{userdata:JSON.stringify(userCredential.user,)});
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: '#fff', elevation: 5, padding: 15, borderRadius: 8 }}>
        <View
          style={styles.centerView}>
          <Image
            style={styles.tinyLogo}
            source={SamAi}
          />
        </View>
        <Text
          style={styles.heading}>
          Welcome to SAMAI Review Board
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none" />

        <View
          style={styles.inputView}>
          <TextInput
            style={{ width: 300 }}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible} // Toggle visibility
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {isPasswordVisible ? <VisibilityOn /> : <VisibilityOff />}
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={handleLogin}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) : (
              <Text style={{ fontSize: 18, color: 'white', fontWeight: '400' }}>
                Login
              </Text>
            )}
          </TouchableOpacity>
        </View>
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
  }, heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
    marginVertical: 10,
  },
  tinyLogo: {
    width: 75,
    height: 75,
  },
  centerView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    elevation: 5,
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
  btn: {
    width: '98%',
    height: 50,
    backgroundColor: '#00a3f9',
    elevation: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  }, inputView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    elevation: 5,
    backgroundColor: '#fefefe',
  },
});

export default LoginScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Clipboard,
  Alert,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import VisibilityOff from '../../assets/VisibilityOff';
import VisibilityOn from '../../assets/VisibilityOn';

const AddUser = () => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState(null); // Store submitted details

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const copyToClipboard = text => {
    Clipboard.setString(text);
    Alert.alert('Copied to Clipboard', `${text} copied!`);
  };

  const handleSubmit = () => {
    if (name && subject && email && password) {
      setSubmittedDetails({name, subject, email, password});

      // Clear the input fields after submission
      setName('');
      setSubject('');
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Error', 'Please fill all fields!');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add User for Question Review</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Subject"
        value={subject}
        onChangeText={setSubject}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.flexInput]}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => copyToClipboard(email)}>
          <Icon name="content-copy" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, styles.flexInput]}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {/* <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#555"
          /> */}
          {isPasswordVisible?<VisibilityOff/>:<VisibilityOn/>}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => copyToClipboard(password)}>
          <Icon name="content_copy" size={24} color="#555" />
        </TouchableOpacity>
      </View>

   
      <TouchableOpacity onPress={handleSubmit} style={styles.uploadButton} >
         <Text style={styles.uploadText}>Add User</Text>
        </TouchableOpacity>

      {/* Display Submitted Details */}
      {submittedDetails && (
        <View style={styles.submittedContainer}>
          <Text style={styles.submittedTitle}>Submitted Details</Text>
          <Text style={styles.submittedText}>
            Name: {submittedDetails.name}
          </Text>
          <Text style={styles.submittedText}>
            Subject: {submittedDetails.subject}
          </Text>
          <Text style={styles.submittedText}>
            Email: {submittedDetails.email}
          </Text>
          <Text style={styles.submittedText}>
            Password: {submittedDetails.password}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  flexInput: {
    flex: 1,
    marginRight: 10,
  },
  submittedContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
  },
  submittedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796b',
  },
  submittedText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#004d40',
  },
  uploadButton: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddUser;

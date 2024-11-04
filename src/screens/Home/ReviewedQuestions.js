import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import { ListItem } from 'react-native-elements';

const ReviewedQuestions = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [expanded, setExpanded] = useState({ section1: false, section2: false, section3: false });

  const toggleAccordion = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Sample data for dropdowns and table
  const subjects = ['Mathematics', 'Physics', 'Chemistry'];
  const topics = ['Algebra', 'Calculus', 'Electromagnetism'];
  const subtopics = ['Linear Equations', 'Differentiation', 'Magnetic Fields'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviewed Question</Text>

      {/* Dropdown Row */}
      <View style={styles.dropdownRow}>
        <Picker
          selectedValue={selectedSubject}
          style={styles.picker}
          onValueChange={value => setSelectedSubject(value)}>
          <Picker.Item label="Select Subject" value="" />
          {subjects.map((subject, index) => (
            <Picker.Item key={index} label={subject} value={subject} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedTopic}
          style={styles.picker}
          onValueChange={value => setSelectedTopic(value)}>
          <Picker.Item label="Select Topic" value="" />
          {topics.map((topic, index) => (
            <Picker.Item key={index} label={topic} value={topic} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedSubtopic}
          style={styles.picker}
          onValueChange={value => setSelectedSubtopic(value)}>
          <Picker.Item label="Select Subtopic" value="" />
          {subtopics.map((subtopic, index) => (
            <Picker.Item key={index} label={subtopic} value={subtopic} />
          ))}
        </Picker>
      </View>
      <Text style={styles.data}>Subject:Subject Name() /Chapter:Chapter-Name()/ Topic:Topic-Name()</Text>


      {/* Table */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  data: {
    fontSize: 16,
    marginBottom: 8,
    color: '#101828',
    textAlign: 'center',
    fontWeight: '500',

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#101828',
  },
  dropdownRow: {
    flexDirection: 'column', // Set to column to stack dropdowns vertically
    marginBottom: 20,
  },
  picker: {
    height: 50,
    color: 'black',
    marginBottom: 10, // Adds spacing between dropdowns
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
  },
  tableContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e3e3e3',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: 'grey',
  },
});
export default ReviewedQuestions;

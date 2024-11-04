import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PushTracker = () => {
  // Define state for each dropdown
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  // Sample data for dropdowns and table
  const subjects = ['Mathematics', 'Physics', 'Chemistry'];
  const topics = ['Algebra', 'Calculus', 'Electromagnetism'];
  const subtopics = ['Linear Equations', 'Differentiation', 'Magnetic Fields'];
  const users = ['User1', 'User2', 'User3'];

  // Sample table data
  const [tableData, setTableData] = useState([
    { subject: 'Mathematics', topic: 'Algebra', subtopic: 'Linear Equations', pushedBy: 'User1' },
    { subject: 'Physics', topic: 'Electromagnetism', subtopic: 'Magnetic Fields', pushedBy: 'User2' },
  ]);

  // Filter table data based on selected dropdown values
  const filteredData = tableData.filter(
    (item) =>
      (!selectedSubject || item.subject === selectedSubject) &&
      (!selectedTopic || item.topic === selectedTopic) &&
      (!selectedSubtopic || item.subtopic === selectedSubtopic) &&
      (!selectedUser || item.pushedBy === selectedUser)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filterable Table</Text>
      
      {/* Dropdown Row */}
      <View style={styles.dropdownRow}>
        <Picker
          selectedValue={selectedSubject}
          style={styles.picker}
          onValueChange={(value) => setSelectedSubject(value)}
        >
          <Picker.Item label="Select Subject" value="" />
          {subjects.map((subject, index) => (
            <Picker.Item key={index} label={subject} value={subject} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedTopic}
          style={styles.picker}
          onValueChange={(value) => setSelectedTopic(value)}
        >
          <Picker.Item label="Select Topic" value="" />
          {topics.map((topic, index) => (
            <Picker.Item key={index} label={topic} value={topic} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedSubtopic}
          style={styles.picker}
          onValueChange={(value) => setSelectedSubtopic(value)}
        >
          <Picker.Item label="Select Subtopic" value="" />
          {subtopics.map((subtopic, index) => (
            <Picker.Item key={index} label={subtopic} value={subtopic} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedUser}
          style={styles.picker}
          onValueChange={(value) => setSelectedUser(value)}
        >
          <Picker.Item label="Select User" value="" />
          {users.map((user, index) => (
            <Picker.Item key={index} label={user} value={user} />
          ))}
        </Picker>
      </View>

      {/* Table */}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Subject</Text>
          <Text style={styles.tableHeaderText}>Topic</Text>
          <Text style={styles.tableHeaderText}>Subtopic</Text>
          <Text style={styles.tableHeaderText}>Pushed By</Text>
        </View>
        
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableRowText}>{item.subject}</Text>
              <Text style={styles.tableRowText}>{item.topic}</Text>
              <Text style={styles.tableRowText}>{item.subtopic}</Text>
              <Text style={styles.tableRowText}>{item.pushedBy}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.noDataText}>No data available</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
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

export default PushTracker;

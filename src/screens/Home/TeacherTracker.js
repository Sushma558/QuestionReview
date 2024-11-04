import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

const subjectList = ['Mathematics', 'Physics', 'Chemistry'];
const teacherList = ['Mr. Sharma', 'Ms. Verma', 'Dr. Singh'];

const TableComponent = () => {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  // Sample data for the table
  const tableData = [
    {
      title: 'Topics Assigned',
      items: [
        { name: 'Algebra', count: 3 },
        { name: 'Trigonometry', count: 2 },
        { name: 'Calculus', count: 5 },
      ],
    },
    {
      title: 'Reviewed',
      items: [
        { name: 'Linear Equations', count: 1 },
        { name: 'Polynomials', count: 2 },
        { name: 'Statistics', count: 1 },
      ],
    },
    {
      title: 'Approved',
      items: [
        { name: 'Statistics', count: 1 },
        { name: 'Geometry', count: 1 },
      ],
    },
    {
      title: 'Rejected',
      items: [
        { name: 'Differential Equations', count: 1 },
        { name: 'Complex Numbers', count: 1 },
      ],
    },
    {
      title: 'Edited',
      items: [
        { name: 'Set Theory', count: 2 },
        { name: 'Graph Theory', count: 1 },
      ],
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.dropdownContainer}>
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Select Subject:</Text>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue) => setSelectedSubject(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Subject" value="" />
            {subjectList.map((subject, index) => (
              <Picker.Item key={index} label={subject} value={subject} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Select Teacher:</Text>
          <Picker
            selectedValue={selectedTeacher}
            onValueChange={(itemValue) => setSelectedTeacher(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Teacher" value="" />
            {teacherList.map((teacher, index) => (
              <Picker.Item key={index} label={teacher} value={teacher} />
            ))}
          </Picker>
        </View>
      </View>

      {selectedSubject && selectedTeacher && (
        <View style={styles.tableContainer}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={styles.header}>Row Title</DataTable.Title>
              <DataTable.Title style={styles.header}>Details</DataTable.Title>
              <DataTable.Title style={styles.header}>Count</DataTable.Title>
            </DataTable.Header>

            {tableData.map((row, index) => (
              <React.Fragment key={index}>
                <DataTable.Row style={styles.row}>
                  <DataTable.Cell style={styles.cellTitle}>{row.title}</DataTable.Cell>
                  <DataTable.Cell style={styles.cellDetails}>
                    <Text>{row.items.map(item => item.name).join(', ')}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cellCount}>
                    <Text>{row.items.reduce((acc, item) => acc + item.count, 0)}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
                {row.items.map((item, itemIndex) => (
                  <DataTable.Row key={itemIndex} style={styles.subRow}>
                    <DataTable.Cell style={styles.subItemCell}></DataTable.Cell>
                    <DataTable.Cell style={styles.cellDetails}>{item.name}</DataTable.Cell>
                    <DataTable.Cell style={styles.cellCount}>{item.count}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </React.Fragment>
            ))}
          </DataTable>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickerWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 1,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  tableContainer: {
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 4,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  header: {
    // backgroundColor: '#6200EE',
    color: 'white',
    textAlign: 'center',
  },
  row: {
    backgroundColor: '#f8f8f8',
    elevation: 1,
  },
  cellTitle: {
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  cellDetails: {
    paddingVertical: 12,
    textAlign: 'left',
  },
  cellCount: {
    paddingVertical: 12,
    textAlign: 'center',
  },
  subRow: {
    backgroundColor: '#ffffff',
  },
  subItemCell: {
    paddingLeft: 30,
  },
});

export default TableComponent;

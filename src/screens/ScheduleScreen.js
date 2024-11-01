import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,

} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";


const ScheduleScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showTestTypeModal, setShowTestTypeModal] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState('');
  const [showClassModal, setShowClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showTopics, setShowTopics] = useState(false);

  // Define all options
  const classOptions = ['11th', '12th'];
  const testTypes = ['Daily', 'Weekly', 'Monthly'];

  const subjects = {
    '11th': ['Physics-11', 'Chemistry-11', 'Botany-11', 'Zoology-11'],
    '12th': ['Physics-12', 'Chemistry-12', 'Botany-12', 'Zoology-12'],
  };

  const chapters = {
    'Physics-11': [
      'Chapter 1: Physical World',
      'Chapter 2: Units and Measurements',
      'Chapter 3: Motion in a Straight Line',
      'Chapter 4: Motion in a Plane',
      'Chapter 5: Laws of Motion',
    ],
    'Chemistry-11': [
      'Chapter 1: Basic Concepts',
      'Chapter 2: Structure of Atom',
      'Chapter 3: Classification of Elements',
      'Chapter 4: Chemical Bonding',
      'Chapter 5: States of Matter',
    ],
    'Physics-12': [
      'Chapter 1: Electric Charges and Fields',
      'Chapter 2: Electrostatic Potential',
      'Chapter 3: Current Electricity',
      'Chapter 4: Magnetic Effects',
      'Chapter 5: Electromagnetic Induction',
    ],
    'Chemistry-12': [
      'Chapter 1: Solutions',
      'Chapter 2: Electrochemistry',
      'Chapter 3: Chemical Kinetics',
      'Chapter 4: Surface Chemistry',
      'Chapter 5: Coordination Compounds',
    ],
    'Botany-11': [
      'Chapter 1: Living World',
      'Chapter 2: Biological Classification',
      'Chapter 3: Plant Kingdom',
      'Chapter 4: Cell Structure',
      'Chapter 5: Morphology',
    ],
    'Zoology-11': [
      'Chapter 1: Animal Kingdom',
      'Chapter 2: Animal Tissues',
      'Chapter 3: Digestion',
      'Chapter 4: Respiration',
      'Chapter 5: Circulation',
    ],
    'Botany-12': [
      'Chapter 1: Reproduction',
      'Chapter 2: Genetics',
      'Chapter 3: Evolution',
      'Chapter 4: Biotechnology',
      'Chapter 5: Ecology',
    ],
    'Zoology-12': [
      'Chapter 1: Reproduction in Organisms',
      'Chapter 2: Human Reproduction',
      'Chapter 3: Inheritance',
      'Chapter 4: Molecular Biology',
      'Chapter 5: Human Health',
    ],
  };

  const topics = {
    'Chapter 1: Physical World': [
      'Physics: Scope and Excitement',
      'Nature of Physical Laws',
      'Physics, Technology and Society',
      'Fundamental Forces in Nature',
      'Conservation Laws',
    ],
    'Chapter 2: Units and Measurements': [
      'The International System of Units',
      'Measurement of Length',
      'Measurement of Mass',
      'Measurement of Time',
      'Accuracy, Precision & Errors in Measurement',
    ],
    'Chapter 1: Basic Concepts': [
      'Importance of Chemistry',
      'States of Matter',
      'Properties of Matter and their Measurement',
      'Uncertainty in Measurement',
      'Scientific Notation',
    ],
    // Add more topics for other chapters as needed
  };

  // Handlers
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setSelectedDate(currentDate.toLocaleDateString());
  };

  const handleTestTypeSelect = type => {
    setSelectedTestType(type);
    setShowTestTypeModal(false);
  };

  const handleClassSelect = selectedClass => {
    setSelectedClass(selectedClass);
    setShowClassModal(false);
    setSelectedSubject(''); // Clear subject when class changes
    setSelectedChapter(''); // Clear chapter when class changes
  };

  const handleSubjectSelect = subject => {
    setSelectedSubject(subject);
    setShowSubjectModal(false);
    setSelectedChapter(''); // Clear chapter when subject changes
  };

  const handleChapterSelect = chapter => {
    setSelectedChapter(chapter);
    setShowChapterModal(false);
  };

  const handleSchedulePress = () => {
    // Add your scheduling logic here
    // For example:
    if (
      selectedClass &&
      selectedSubject &&
      selectedChapter &&
      selectedTestType &&
      selectedDate
    ) {
      // Proceed with scheduling
      console.log('Scheduling test...');
      // Add your API call or state update logic
    } else {
      // Show error message if any required field is missing
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  // Render Option Item Component
  const renderOptionItem = ({item, selectedItem, onSelect, textStyle }) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedItem === item && styles.selectedOption,
      ]}
      onPress={() => onSelect(item)}>
      <Text
        style={[
          styles.optionText,
          selectedItem === item && styles.selectedText,
          textStyle,
        ]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <Text style={styles.heading}> Schedule Test For SAMAI</Text>
        {/* First Row: Date and Test Type */}
        <View style={styles.row}>
          {/* Date Picker */}
          <View style={styles.pickerContainer}>
            <LinearGradient
              colors={['#4a90e2', '#357abd']}
              style={styles.gradient}>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowDatePicker(true)}>
                <Icon
                  name="calendar-today"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>
                  {selectedDate ? selectedDate : 'Select Date'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Test Type Selector */}
          <View style={styles.pickerContainer}>
            <LinearGradient
              colors={['#4a90e2', '#357abd']}
              style={styles.gradient}>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowTestTypeModal(true)}>
                <Icon
                  name="assignment"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>
                  {selectedTestType ? selectedTestType : 'Test Type'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Second Row: Class, Subject, and Chapter */}
        <View style={styles.row}>
          {/* Class Selector */}
          <View style={[styles.pickerContainer, {flex: 0.23}]}>
            <LinearGradient
              colors={['#43a047', '#2e7d32']}
              style={styles.gradient}>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowClassModal(true)}>
                <Icon
                  name="school"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>
                  {selectedClass ? selectedClass : 'Class'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Subject Selector */}
          <View
            style={[
              styles.pickerContainer,
              styles.subjectPickerContainer,
              {flex: 0.47},
            ]}>
            <LinearGradient
              colors={['#e53935', '#c62828']}
              style={styles.gradient}>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowSubjectModal(true)}>
                <Icon name="book" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>
                  {selectedSubject ? selectedSubject : 'Subject'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Chapter Selector */}
          <View style={[styles.pickerContainer, {flex: 0.37}]}>
            <LinearGradient
              colors={['#7b1fa2', '#6a1b9a']}
              style={styles.gradient}>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowChapterModal(true)}>
                <Icon
                  name="menu-book"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText} numberOfLines={1}>
                  {selectedChapter ? selectedChapter.split(':')[0] : 'Chapter'}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Test Type Modal */}
        <Modal
          isVisible={showTestTypeModal}
          onBackdropPress={() => setShowTestTypeModal(false)}
          style={styles.bottomModal}
          backdropTransitionOutTiming={0}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setShowTestTypeModal(false)}>
              <Icon name="close" size={24} color="#555" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Test Type</Text>
            <FlatList
              data={testTypes}
              keyExtractor={item => item}
              renderItem={({item}) =>
                renderOptionItem({
                  item,
                  selectedItem: selectedTestType,
                  onSelect: handleTestTypeSelect,
                })
              }
            />
          </View>
        </Modal>

        {/* Class Modal */}
        <Modal
          isVisible={showClassModal}
          onBackdropPress={() => setShowClassModal(false)}
          style={styles.bottomModal}
          backdropTransitionOutTiming={0}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setShowClassModal(false)}>
              <Icon name="close" size={24} color="#555" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Class</Text>
            <FlatList
              data={classOptions}
              keyExtractor={item => item}
              renderItem={({item}) =>
                renderOptionItem({
                  item,
                  selectedItem: selectedClass,
                  onSelect: handleClassSelect,
                })
              }
            />
          </View>
        </Modal>

        {/* Subject Modal */}
        <Modal
          isVisible={showSubjectModal}
          onBackdropPress={() => setShowSubjectModal(false)}
          style={styles.bottomModal}
          backdropTransitionOutTiming={0}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setShowSubjectModal(false)}>
              <Icon name="close" size={24} color="#555" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Subject</Text>
            <FlatList
              data={subjects[selectedClass] || []}
              keyExtractor={item => item}
              renderItem={({item}) =>
                renderOptionItem({
                  item,
                  selectedItem: selectedSubject,
                  onSelect: handleSubjectSelect,
                })
              }
            />
          </View>
        </Modal>

        {/* Chapter Modal */}
        <Modal
          isVisible={showChapterModal}
          onBackdropPress={() => setShowChapterModal(false)}
          style={styles.bottomModal}
          backdropTransitionOutTiming={0}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setShowChapterModal(false)}>
              <Icon name="close" size={24} color="#555" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Chapter</Text>
            <FlatList
              data={chapters[selectedSubject] || []}
              keyExtractor={item => item}
              renderItem={({item}) =>
                renderOptionItem({
                  item,
                  selectedItem: selectedChapter,
                  onSelect: handleChapterSelect,
                  textStyle: {fontSize: 14},
                })
              }
            />
          </View>
        </Modal>
        {/* Schedule Table View */}
        <View style={styles.scheduleContainer}>
          <LinearGradient
            colors={['#4a90e2', '#357abd']}
            style={styles.scheduleHeader}>
            <Text style={styles.scheduleHeaderText}>Schedule Table</Text>
          </LinearGradient>

          <View style={styles.scheduleContent}>
            {selectedDate && (
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleLabel}>Date:</Text>
                <Text style={styles.scheduleValue}>{selectedDate}</Text>
              </View>
            )}

            {selectedTestType && (
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleLabel}>Test Type:</Text>
                <Text style={styles.scheduleValue}>{selectedTestType}</Text>
              </View>
            )}

            {selectedClass && (
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleLabel}>Class:</Text>
                <Text style={styles.scheduleValue}>{selectedClass}</Text>
              </View>
            )}

            {selectedSubject && (
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleLabel}>Subject:</Text>
                <Text style={styles.scheduleValue}>{selectedSubject}</Text>
              </View>
            )}

            {selectedChapter && (
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleLabel}>Chapter:</Text>
                <Text style={styles.scheduleValue}>{selectedChapter}</Text>
              </View>
            )}
          </View>
        </View>
        {/* Schedule Button */}
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleSchedulePress}>
          <LinearGradient
            colors={['#4CAF50', '#45a049']}
            style={styles.buttonGradient}>
            <Text style={styles.buttonText}>Schedule Test</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  pickerContainer: {
    width: 50,
    flex: 1,
    marginHorizontal: 4,
  },
  gradient: {
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pickerButton: {
    // width:50,
    padding: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    // right:4,
    fontSize: 14,
    fontWeight: '600',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    maxHeight: '80%',
  },
  closeIconContainer: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
    padding: 5,
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  subjectPickerContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  scheduleContainer: {
    marginTop: 20,
    marginHorizontal: 4,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minHeight: 200,
  },
  scheduleHeader: {
    padding: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  scheduleHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  scheduleContent: {
    padding: 20,
  },
  scheduleRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scheduleLabel: {
    flex: 0.4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scheduleValue: {
    flex: 0.6,
    fontSize: 16,
    color: '#666',
  },
  scheduleButton: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  heading: {
    fontSize: 20,
    marginBottom: 8,
    color: '#101828',
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'orange',
    textShadowOffset: {width: 0.3, height: 0.3},
    textShadowRadius: 1,
  },
});

export default ScheduleScreen;

// const styles = StyleSheet.create({})

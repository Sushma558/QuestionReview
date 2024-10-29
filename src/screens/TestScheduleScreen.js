import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from '@react-navigation/native';

const TestScheduleScreen = () => {

const navigation = useNavigation();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [showTestTypeModal, setShowTestTypeModal] = useState(false);
  const [selectedTestType, setSelectedTestType] = useState("");
  const [showClassModal, setShowClassModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [showChapterModal, setShowChapterModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [expandedChapter, setExpandedChapter] = useState(null);
  const [selectedTopics, setSelectedTopics] = useState({});

  // Define all options
  const classOptions = ["11th", "12th"];
  const testTypes = ["Daily", "Weekly", "Monthly"];

  const subjects = {
    "11th": ["Physics-11", "Chemistry-11", "Botany-11", "Zoology-11"],
    "12th": ["Physics-12", "Chemistry-12", "Botany-12", "Zoology-12"],
  };

  const chapters = {
    "Physics-11": [
      "Chapter 1: Physical World",
      "Chapter 2: Units and Measurements",
      "Chapter 3: Motion in a Straight Line",
      "Chapter 4: Motion in a Plane",
      "Chapter 5: Laws of Motion",
    ],
    "Chemistry-11": [
      "Chapter 1: Basic Concepts",
      "Chapter 2: Structure of Atom",
      "Chapter 3: Classification of Elements",
      "Chapter 4: Chemical Bonding",
      "Chapter 5: States of Matter",
    ],
    "Physics-12": [
      "Chapter 1: Electric Charges and Fields",
      "Chapter 2: Electrostatic Potential",
      "Chapter 3: Current Electricity",
      "Chapter 4: Magnetic Effects",
      "Chapter 5: Electromagnetic Induction",
    ],
    "Chemistry-12": [
      "Chapter 1: Solutions",
      "Chapter 2: Electrochemistry",
      "Chapter 3: Chemical Kinetics",
      "Chapter 4: Surface Chemistry",
      "Chapter 5: Coordination Compounds",
    ],
    "Botany-11": [
      "Chapter 1: Living World",
      "Chapter 2: Biological Classification",
      "Chapter 3: Plant Kingdom",
      "Chapter 4: Cell Structure",
      "Chapter 5: Morphology",
    ],
    "Zoology-11": [
      "Chapter 1: Animal Kingdom",
      "Chapter 2: Animal Tissues",
      "Chapter 3: Digestion",
      "Chapter 4: Respiration",
      "Chapter 5: Circulation",
    ],
    "Botany-12": [
      "Chapter 1: Reproduction",
      "Chapter 2: Genetics",
      "Chapter 3: Evolution",
      "Chapter 4: Biotechnology",
      "Chapter 5: Ecology",
    ],
    "Zoology-12": [
      "Chapter 1: Reproduction in Organisms",
      "Chapter 2: Human Reproduction",
      "Chapter 3: Inheritance",
      "Chapter 4: Molecular Biology",
      "Chapter 5: Human Health",
    ],
  };

  //  / / Add the topics data structure

  const chapterTopics = {
    "Chapter 1: Physical World": [
      "Physics: Scope and Excitement",
      "Nature of Physical Laws",
      "Physics, Technology and Society",
      "Fundamental Forces in Nature",
      "Conservation Laws",
    ],
    "Chapter 2: Units and Measurements": [
      "Need for Measurement",
      "SI Units",
      "Fundamental and Derived Units",
      "Length, Mass, and Time Measurements",
      "Accuracy and Precision of Instruments",
    ],
    "Chapter 3: Motion in a Straight Line": [
      "Position, Path Length and Displacement",
      "Average Velocity and Speed",
      "Instantaneous Velocity and Speed",
      "Acceleration",
      "Kinematic Equations",
    ],
    "Chapter 4: Motion in a Plane": [
      "Scalar and Vector Quantities",
      "Position and Displacement Vectors",
      "Velocity and Acceleration in Plane",
      "Projectile Motion",
      "Uniform Circular Motion",
    ],
    "Chapter 5: Laws of Motion": [
      "Force and Inertia",
      "Newton's First Law",
      "Newton's Second Law",
      "Newton's Third Law",
      "Types of Forces",
    ],
  }; 

  // Handlers
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setSelectedDate(currentDate.toLocaleDateString());
  };

  const handleTestTypeSelect = (type) => {
    setSelectedTestType(type);
    setShowTestTypeModal(false);
  };

  const handleSchedulePress = () => {
    // Check if all required fields are filled
    const isValid = 
      selectedClasses.length > 0 &&
      selectedSubjects.length > 0 &&
      selectedChapters.length > 0 &&
      selectedTestType &&
      selectedDate &&
      Object.values(selectedTopics).some((topics) => topics.length > 0);
  
    if (isValid) {
      // Show confirmation alert
      Alert.alert(
        "Schedule Test",
        "Do you want to schedule the test?",
        [
          {
            text: "NO",
            style: "cancel",
            onPress: () => console.log("Test scheduling cancelled")
          },
          {
            text: "YES",
            style: "default",
            onPress: () => {
              // Log the scheduling details
              console.log("Scheduling test...", {
                classes: selectedClasses,
                subjects: selectedSubjects,
                chapters: selectedChapters,
                topics: selectedTopics,
                testType: selectedTestType,
                date: selectedDate,
              });
              
              // Navigate to Question Display screen after confirmation
              navigation.navigate('QuestionDisplay', {
                // Pass the selected data as navigation params if needed
                scheduledData: {
                  classes: selectedClasses,
                  subjects: selectedSubjects,
                  chapters: selectedChapters,
                  topics: selectedTopics,
                  testType: selectedTestType,
                  date: selectedDate,
                }
              });
            }
          }
        ],
        {
          cancelable: true,
          userInterfaceStyle: 'light',
        }
      );
    } else {
      // Show error alert if validation fails
      Alert.alert(
        "Error",
        "Please fill in all required fields and select at least one topic per chapter",
        [
          {
            text: "OK",
            style: "default"
          }
        ]
      );
    }
  };

  // Render Option Item Component
  const renderOptionItem = ({
    item,
    selectedItem,
    onSelect,
    textStyle = {},
  }) => (
    <TouchableOpacity
      style={[
        styles.optionButton,
        selectedItem === item && styles.selectedOption,
      ]}
      onPress={() => onSelect(item)}
    >
      <Text
        style={[
          styles.optionText,
          selectedItem === item && styles.selectedText,
          textStyle,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderCheckboxItem = ({ item, selectedItems, onSelect }) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => onSelect(item)}
    >
      <View style={styles.checkbox}>
        {selectedItems.includes(item) && (
          <Icon name="check" size={16} color="#4a90e2" />
        )}
      </View>
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  // Handle selection functions
  const handleClassSelect = (classItem) => {
    setSelectedClasses((prev) =>
      prev.includes(classItem)
        ? prev.filter((item) => item !== classItem)
        : [...prev, classItem]
    );
  };

  const handleSubjectSelect = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((item) => item !== subject)
        : [...prev, subject]
    );
  };

  // Get available subjects based on selected classes
  const getAvailableSubjects = () => {
    const availableSubjects = new Set();
    selectedClasses.forEach((classItem) => {
      subjects[classItem]?.forEach((subject) => availableSubjects.add(subject));
    });
    return Array.from(availableSubjects);
  };

  // Get available chapters based on selected subjects
  const getAvailableChapters = () => {
    const availableChapters = new Set();
    selectedSubjects.forEach((subject) => {
      chapters[subject]?.forEach((chapter) => availableChapters.add(chapter));
    });
    return Array.from(availableChapters);
  };

  // Modify handleChapterSelect
  const handleChapterSelect = (chapter) => {
    setSelectedChapters((prev) => {
      const isSelected = prev.includes(chapter);
      const newChapters = isSelected
        ? prev.filter((item) => item !== chapter)
        : [...prev, chapter];

      // Update selected topics when chapter is unselected
      if (isSelected) {
        setSelectedTopics((prevTopics) => {
          const newTopics = { ...prevTopics };
          delete newTopics[chapter];
          return newTopics;
        });
      } else {
        setSelectedTopics((prevTopics) => ({
          ...prevTopics,
          [chapter]: [],
        }));
      }

      return newChapters;
    });
  };

  // Add topic selection handler
  const handleTopicSelect = (chapter, topic) => {
    setSelectedTopics((prev) => {
      const chapterTopics = prev[chapter] || [];
      const updatedTopics = chapterTopics.includes(topic)
        ? chapterTopics.filter((t) => t !== topic)
        : [...chapterTopics, topic];

      return {
        ...prev,
        [chapter]: updatedTopics,
      };
    });
  };

  // Modify renderCheckboxItem for chapters to include topics
  const renderChapterItem = ({ item, selectedItems, onSelect }) => (
    <View>
      <TouchableOpacity
        style={[
          styles.checkboxContainer,
          { paddingRight: 16 }, // Add padding for the expand icon
        ]}
        onPress={() => {
          onSelect(item);
          setExpandedChapter(expandedChapter === item ? null : item);
        }}
      >
        <View style={styles.checkboxRow}>
          <View style={styles.checkbox}>
            {selectedItems.includes(item) && (
              <Icon name="check" size={16} color="#4a90e2" />
            )}
          </View>
          <Text style={styles.optionText}>{item}</Text>
          {chapterTopics[item] && (
            <Icon
              name={
                expandedChapter === item
                  ? "keyboard-arrow-up"
                  : "keyboard-arrow-down"
              }
              size={24}
              color="#555"
              style={styles.expandIcon}
            />
          )}
        </View>
      </TouchableOpacity>

      {/* Topics dropdown */}
      {expandedChapter === item &&
        selectedItems.includes(item) &&
        chapterTopics[item] && (
          <View style={styles.topicsContainer}>
            {chapterTopics[item].map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={styles.topicCheckboxContainer}
                onPress={() => handleTopicSelect(item, topic)}
              >
                <View style={styles.checkbox}>
                  {selectedTopics[item]?.includes(topic) && (
                    <Icon name="check" size={14} color="#4a90e2" />
                  )}
                </View>
                <Text style={styles.topicText}>{topic}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* First Row: Date and Test Type */}
        <View style={styles.row}>
          {/* Date Picker */}
          <View style={styles.pickerContainer}>
            <LinearGradient
              colors={["#4a90e2", "#357abd"]}
              style={styles.gradient}
            >
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Icon
                  name="calendar-today"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>
                  {selectedDate ? selectedDate : "Select Date"}
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
              colors={["#4a90e2", "#357abd"]}
              style={styles.gradient}
            >
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowTestTypeModal(true)}
              >
                <Icon
                  name="assignment"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>
                  {selectedTestType ? selectedTestType : "Test Type"}
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
          backdropTransitionOutTiming={0}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIconContainer}
              onPress={() => setShowTestTypeModal(false)}
            >
              <Icon name="close" size={24} color="#555" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Test Type</Text>
            <FlatList
              data={testTypes}
              keyExtractor={(item) => item}
              renderItem={({ item }) =>
                renderOptionItem({
                  item,
                  selectedItem: selectedTestType,
                  onSelect: handleTestTypeSelect,
                })
              }
            />
          </View>
        </Modal>

        {/* Second Row: Class, Subject, and Chapter */}
        <View style={styles.row}>
          {/* Class Selector */}
          <View style={[styles.pickerContainer, { flex: 0.35 }]}>
            <LinearGradient
              colors={["#43a047", "#2e7d32"]}
              style={styles.gradient}
            >
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowClassModal(true)}
              >
                <Icon
                  name="school"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>
                  {selectedClasses.length > 0
                    ? `${selectedClasses.length} Class`
                    : "Class"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Subject Selector */}
          <View style={[styles.pickerContainer, { flex: 0.43 }]}>
            <LinearGradient
              colors={["#e53935", "#c62828"]}
              style={styles.gradient}
            >
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowSubjectModal(true)}
              >
                <Icon name="book" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>
                  {selectedSubjects.length > 0
                    ? `${selectedSubjects.length} Subjects`
                    : "Subjects"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>

          {/* Chapter Selector */}
          <View style={[styles.pickerContainer, { flex: 0.43 }]}>
            <LinearGradient
              colors={["#7b1fa2", "#6a1b9a"]}
              style={styles.gradient}
            >
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowChapterModal(true)}
              >
                <Icon
                  name="menu-book"
                  size={20}
                  color="#fff"
                  style={styles.icon}
                />
                <Text style={styles.buttonText}>
                  {selectedChapters.length > 0
                    ? `${selectedChapters.length} Chapters`
                    : "Chapters"}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Class Modal */}
        <Modal
          isVisible={showClassModal}
          onBackdropPress={() => setShowClassModal(false)}
          style={styles.bottomModal}
          backdropTransitionOutTiming={0}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Class</Text>
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={() => setShowClassModal(false)}
              >
                <Icon name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={classOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) =>
                renderCheckboxItem({
                  item,
                  selectedItems: selectedClasses,
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
          backdropTransitionOutTiming={0}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Subjects</Text>
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={() => setShowSubjectModal(false)}
              >
                <Icon name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={getAvailableSubjects()}
              keyExtractor={(item) => item}
              renderItem={({ item }) =>
                renderCheckboxItem({
                  item,
                  selectedItems: selectedSubjects,
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
          backdropTransitionOutTiming={0}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Chapters</Text>
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={() => setShowChapterModal(false)}
              >
                <Icon name="close" size={24} color="#555" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={getAvailableChapters()}
              keyExtractor={(item) => item}
              renderItem={({ item }) =>
                renderChapterItem({
                  item,
                  selectedItems: selectedChapters,
                  onSelect: handleChapterSelect,
                })
              }
            />
          </View>
        </Modal>

        {/* Schedule Table View */}
        <View style={styles.scheduleContainer}>
          <LinearGradient
            colors={["#4a90e2", "#357abd"]}
            style={styles.scheduleHeader}
          >
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

            {selectedClasses.length > 0 && (
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleLabel}>Class:</Text>
                <Text style={styles.scheduleValue}>
                  {selectedClasses.join(", ")}
                </Text>
              </View>
            )}

            {selectedSubjects.length > 0 && (
              <View style={styles.scheduleRow}>
                <Text style={styles.scheduleLabel}>Subjects:</Text>
                <Text style={styles.scheduleValue}>
                  {selectedSubjects.join(", ")}
                </Text>
              </View>
            )}

            {selectedChapters.length > 0 && (
              <>
                <View style={styles.scheduleRow}>
                  <Text style={styles.scheduleLabel}>Chapters:</Text>
                  <Text style={styles.scheduleValue}>
                    {selectedChapters.join(", ")}
                  </Text>
                </View>
                {Object.entries(selectedTopics).map(([chapter, topics]) =>
                  topics.length > 0 ? (
                    <View key={chapter} style={styles.scheduleRow}>
                      <Text style={[styles.scheduleLabel, { fontSize: 13 }]}>
                        {chapter} Topics:
                      </Text>
                      <Text style={[styles.scheduleValue, { fontSize: 13 }]}>
                        {topics.join(", ")}
                      </Text>
                    </View>
                  ) : null
                )}
              </>
            )}
          </View>
        </View>
        {/* Schedule Button */}
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleSchedulePress}
        >
          <LinearGradient
            colors={["#4CAF50", "#45a049"]}
            style={styles.buttonGradient}
          >
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
    backgroundColor: "#f5f5f5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  pickerContainer: {
    // width:50,
    flex: 1,
    marginHorizontal: 4,
  },
  gradient: {
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pickerButton: {
    // width:50,
    padding: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    maxHeight: "80%",
  },
  closeIconContainer: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    padding: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    alignSelf: "center",
    marginTop: 10,
  },
  optionButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  selectedOption: {
    backgroundColor: "#e3f2fd",
    borderWidth: 1,
    borderColor: "#2196f3",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    fontWeight: "bold",
    color: "#1976d2",
  },
  subjectPickerContainer: {
    flex: 1.5,
    marginHorizontal: 4,
  },
  scheduleContainer: {
    marginTop: 20,
    marginHorizontal: 4,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
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
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  scheduleContent: {
    padding: 20,
  },
  scheduleRow: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  scheduleLabel: {
    flex: 0.4,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  scheduleValue: {
    flex: 0.6,
    fontSize: 16,
    color: "#666",
  },
  scheduleButton: {
    marginTop: 20,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    overflow: "hidden",
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#4a90e2",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  topicsContainer: {
    marginLeft: 32,
    marginTop: 4,
    marginBottom: 4,
    borderLeftWidth: 1,
    borderLeftColor: "#e0e0e0",
  },
  topicCheckboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  topicText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
  expandIcon: {
    marginLeft: "auto",
  },
});

export default TestScheduleScreen;

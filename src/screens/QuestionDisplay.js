import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    Dimensions,
    ToastAndroid,
    Alert,
  } from "react-native";
  import React, { useState } from "react";
  import Icon from "react-native-vector-icons/MaterialIcons";
  
  const QuestionDisplay = () => {
    const questions = [
      {
        id: 1,
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
      },
      {
        id: 2,
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
      },
      {
        id: 3,
        question: "What is the largest mammal?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "White Rhino"],
      },
      {
        id: 4,
        question: "Who painted the Mona Lisa?",
        options: ["Van Gogh", "Da Vinci", "Picasso", "Michelangelo"],
      },
      {
        id: 5,
        question: "Which element has the symbol 'O'?",
        options: ["Gold", "Silver", "Oxygen", "Osmium"],
      },
    ];
  
    // State to track selected questions
    const [selectedQuestions, setSelectedQuestions] = useState(new Set());
  
    // State to control the preview modal
    const [previewModalVisible, setPreviewModalVisible] = useState(false);
  
    // Handle individual question selection
    const toggleQuestion = (questionId) => {
      const newSelected = new Set(selectedQuestions);
      if (newSelected.has(questionId)) {
        newSelected.delete(questionId);
      } else {
        newSelected.add(questionId);
      }
      setSelectedQuestions(newSelected);
    };
  
    // Handle select all
    const toggleSelectAll = () => {
      if (selectedQuestions.size === questions.length) {
        setSelectedQuestions(new Set());
      } else {
        setSelectedQuestions(new Set(questions.map((q) => q.id)));
      }
    };
  
    // Handle preview button click
    const handlePreview = () => {
      setPreviewModalVisible(true);
    };
  
    // Handle submit button click
    const handleSubmit = () => {
      Alert.alert(
        "Confirm Submission",
        "Are you sure you want to submit the test?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Submit",
            onPress: () => {
              // Add your submission logic here
              console.log("Submitted test with selected questions:", selectedQuestions);
              ToastAndroid.show('Your Test Scheduled successfully', ToastAndroid.SHORT);
              setPreviewModalVisible(false);
            }
          }
        ],
        { cancelable: true }
      );
    };
  
    // Custom Checkbox component
    const Checkbox = ({ selected, onPress }) => (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.checkbox, selected && styles.checkboxSelected]}
      >
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Questions</Text>
        <ScrollView>
          {/* Select All Checkbox */}
          <View style={styles.selectAllContainer}>
            <Checkbox
              selected={selectedQuestions.size === questions.length}
              onPress={toggleSelectAll}
            />
            <Text style={styles.selectAllText}>Select All Questions</Text>
          </View>
  
          {/* Questions List */}
          {questions.map((q, index) => (
            <View key={q.id} style={styles.questionContainer}>
              <View style={styles.questionHeader}>
                <Checkbox
                  selected={selectedQuestions.has(q.id)}
                  onPress={() => toggleQuestion(q.id)}
                />
                <Text style={styles.questionText}>
                  {index + 1}. {q.question}
                </Text>
              </View>
  
              <View style={styles.optionsContainer}>
                {q.options.map((option, optIndex) => (
                  <Text key={optIndex} style={styles.optionText}>
                    {String.fromCharCode(97 + optIndex)}. {option}
                  </Text>
                ))}
              </View>
            </View>
          ))}
        </ScrollView>
  
        {/* Preview Button */}
        <TouchableOpacity style={styles.previewButton} onPress={handlePreview}>
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
  
        {/* Preview Modal */}
        <Modal
          visible={previewModalVisible}
          animationType="slide"
          onRequestClose={() => setPreviewModalVisible(false)}
          transparent
        >
          <View style={styles.previewModal}>
            <View style={styles.previewModalContent}>
              <View style={styles.previewModalHeader}>
                <Text style={styles.previewModalTitle}>Selected Questions</Text>
                <TouchableOpacity
                  style={styles.previewCloseButton}
                  onPress={() => setPreviewModalVisible(false)}
                >
                  <Icon
                    name="close"
                    size={24}
                    style={styles.previewCloseButtonIcon}
                  />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {questions
                  .filter((q) => selectedQuestions.has(q.id))
                  .map((q, index) => (
                    <View key={q.id} style={styles.previewQuestionContainer}>
                      <Text style={styles.previewQuestionText}>
                        {index + 1}. {q.question}
                      </Text>
                      <View style={styles.previewOptionsContainer}>
                        {q.options.map((option, optIndex) => (
                          <Text key={optIndex} style={styles.previewOptionText}>
                            {String.fromCharCode(97 + optIndex)}. {option}
                          </Text>
                        ))}
                      </View>
                    </View>
                  ))}
              </ScrollView>
              <View style={styles.previewModalFooter}>
                <TouchableOpacity
                  style={styles.previewSubmitButton}
                  onPress={handleSubmit}
                >
                  <Text style={styles.previewSubmitButtonText}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  
  export default QuestionDisplay;
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
      justifyContent: "space-between",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    selectAllContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      paddingHorizontal: 10,
    },
    selectAllText: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: "500",
    },
    questionContainer: {
      marginBottom: 20,
      backgroundColor: "#f5f5f5",
      padding: 15,
      borderRadius: 8,
    },
    questionHeader: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    questionText: {
      flex: 1,
      fontSize: 16,
      fontWeight: "500",
      marginLeft: 10,
    },
    optionsContainer: {
      marginTop: 10,
      marginLeft: 35,
    },
    optionText: {
      fontSize: 14,
      marginVertical: 4,
      color: "#333",
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: "#007AFF",
      borderRadius: 4,
      justifyContent: "center",
      alignItems: "center",
    },
    checkboxSelected: {
      backgroundColor: "#007AFF",
    },
    checkmark: {
      color: "white",
      fontSize: 14,
    },
    previewButton: {
      backgroundColor: "#007AFF",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      alignSelf: "center",
      marginTop: 20,
    },
    previewButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    previewModal: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    previewModalContent: {
      backgroundColor: "white",
      width: "90%",
      maxHeight: "80%",
      borderRadius: 12,
      padding: 20,
    },
    previewModalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 15,
    },
    previewModalTitle: {
      fontSize: 18,
      fontWeight: "bold",
    },
    previewCloseButton: {
      padding: 8,
    },
    previewCloseButtonIcon: {
      color: "#666",
      fontSize: 24,
    },
    previewQuestionContainer: {
      marginBottom: 15,
    },
    previewQuestionText: {
      fontSize: 16,
      fontWeight: "500",
    },
    previewOptionsContainer: {
      marginLeft: 20,
      marginTop: 5,
    },
    previewOptionText: {
      fontSize: 14,
      marginVertical: 2,
    },
    previewModalFooter: {
      width: "100%",
      paddingVertical: 12,
      borderTopWidth: 1,
      borderTopColor: "#e5e5e5",
      justifyContent: "center",
      alignItems: "center",
    },
    previewSubmitButton: {
      backgroundColor: "#007AFF",
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    previewSubmitButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });
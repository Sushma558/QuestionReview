import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
  View,
  TextInput,
  Button,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Picker} from '@react-native-picker/picker';

const AddScreen = () => {
  const [question, setQuestion] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [questionImage, setQuestionImage] = useState(null);
  const [options, setOptions] = useState(['', '', '', '']);
  const [optionImages, setOptionImages] = useState([null, null, null, null]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [explanationImage, setExplanationImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  // States for dropdown selections
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');

  const pickImage = async (index = null) => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });
    if (!result.didCancel && result.assets && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      if (index === null) {
        setQuestionImage(imageUri);
      } else if (index === 'explanation') {
        setExplanationImage(imageUri);
      } else {
        const newOptionImages = [...optionImages];
        newOptionImages[index] = imageUri;
        setOptionImages(newOptionImages);
      }
    }
  };

  const removeImage = (index = null) => {
    if (index === null) {
      setQuestionImage(null);
    } else if (index === 'explanation') {
      setExplanationImage(null);
    } else {
      const newOptionImages = [...optionImages];
      newOptionImages[index] = null;
      setOptionImages(newOptionImages);
    }
  };

  const handleSubmit = () => {
    if (
      !question ||
      options.includes('') ||
      !explanation ||
      !additionalInfo ||
      !selectedClass ||
      !selectedSubject ||
      !selectedChapter ||
      !selectedTopic ||
      !correctAnswer
    ) {
      ToastAndroid.show('All fields must be filled!', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSubmittedData({
        question,
        questionImage,
        options,
        optionImages,
        explanation,
        explanationImage,
        correctAnswer,
        additionalInfo,
        selectedClass,
        selectedSubject,
        selectedChapter,
        selectedTopic,
      });
      setLoading(false);
      ToastAndroid.show('Question added successfully!', ToastAndroid.SHORT);
      resetForm();
    }, 2000);
  };

  const resetForm = () => {
    setQuestion('');
    setAdditionalInfo('');
    setQuestionImage(null);
    setOptions(['', '', '', '']);
    setOptionImages([null, null, null, null]);
    setCorrectAnswer('');
    setExplanation('');
    setExplanationImage(null);
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedChapter('');
    setSelectedTopic('');
  };

  const handleOptionChange = (text, index) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };
  const fetchSubjects = classdata => {
    console.log('classes', classdata);
    axios
      .get('https://mep.scontiapp.com/samai/v1/api/v1/entity/all', {
        params: {
          exam_id: '2df8f075-e95a-4126-a80d-7a68b7e4c31e',
          parent_id: '2df8f075-e95a-4126-a80d-7a68b7e4c31e',
          type: 'subject',
          subject_class: classdata,
        },
      })
      .then(response => {
        console.log(response.data.entities);
        setsubjectsData(response.data.entities);
      });
  };

  const fetchChapter = subject_id => {
    axios
      .get('https://mep.scontiapp.com/samai/v1/api/v1/entity/all', {
        params: {
          exam_id: '2df8f075-e95a-4126-a80d-7a68b7e4c31e',
          parent_id: subject_id,
          type: 'topic',
        },
      })
      .then(res => {
        setChapterdata(res.data.entities);
      });
  };

  const fetchTopics = chapter_id => {
    axios
      .get('https://mep.scontiapp.com/samai/v1/api/v1/entity/all', {
        params: {
          exam_id: '2df8f075-e95a-4126-a80d-7a68b7e4c31e',
          parent_id: chapter_id,
          type: 'subtopic',
        },
      })
      .then(res => {
        setTopicdata(res.data.entities);
      });
  };

  useEffect(() => {
    fetchSubjects('11');
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Add Questions for SAMAI</Text>
      <Text style={styles.label}>Class</Text>
      <Picker
        selectedValue={selectedClass}
        style={styles.picker}
        onValueChange={itemValue => setSelectedClass(itemValue)}>
        <Picker.Item label="11th" value="11th" />
        <Picker.Item label="12th" value="12th" />
        {/* Add more classes as needed */}
      </Picker>

      <Text style={styles.label}>Subject</Text>
      <Picker
        selectedValue={selectedSubject}
        style={styles.picker}
        onValueChange={itemValue => setSelectedSubject(itemValue)}>
        <Picker.Item label="Select Subject" value="" />
        <Picker.Item label="Subject 1" value="subject1" />
        <Picker.Item label="Subject 2" value="subject2" />
        <Picker.Item label="Subject 3" value="subject3" />
        {/* Add more subjects as needed */}
      </Picker>

      <Text style={styles.label}>Chapter</Text>
      <Picker
        selectedValue={selectedChapter}
        style={styles.picker}
        onValueChange={itemValue => setSelectedChapter(itemValue)}>
        <Picker.Item label="Select Chapter" value="" />
        <Picker.Item label="Chapter 1" value="chapter1" />
        <Picker.Item label="Chapter 2" value="chapter2" />
        <Picker.Item label="Chapter 3" value="chapter3" />
        {/* Add more chapters as needed */}
      </Picker>

      <Text style={styles.label}>Topic</Text>
      <Picker
        selectedValue={selectedTopic}
        style={styles.picker}
        onValueChange={itemValue => setSelectedTopic(itemValue)}>
        <Picker.Item label="Select Topic" value="" />
        <Picker.Item label="Topic 1" value="topic1" />
        <Picker.Item label="Topic 2" value="topic2" />
        <Picker.Item label="Topic 3" value="topic3" />
        {/* Add more topics as needed */}
      </Picker>

      <Text style={styles.label}>Question Statement</Text>
      <TextInput
        style={styles.textArea}
        multiline={true}
        placeholder="Enter question before image"
        value={question}
        onChangeText={setQuestion}
        textAlignVertical="top"
      />

      <TouchableOpacity onPress={() => pickImage()} style={styles.uploadButton}>
        <Text style={styles.uploadText}>Upload Question Image</Text>
      </TouchableOpacity>
      {questionImage && (
        <View style={styles.imageContainer}>
          <Image source={{uri: questionImage}} style={styles.image} />
          <TouchableOpacity
            onPress={() => removeImage()}
            style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        style={styles.textArea}
        placeholder="Enter question after image"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
        multiline={true}
        textAlignVertical="top"
      />

      {options.map((option, index) => (
        <View key={index} style={styles.optionContainer}>
          <Text style={styles.label}>Option {index + 1}</Text>
          <TextInput
            style={styles.textInput}
            placeholder={`Enter option ${index + 1}`}
            value={option}
            onChangeText={text => handleOptionChange(text, index)}
            multiline={true}
            textAlignVertical="top"
          />
          <TouchableOpacity
            onPress={() => pickImage(index)}
            style={styles.uploadButton}>
            <Text style={styles.uploadText}>
              Upload Option {index + 1} Image
            </Text>
          </TouchableOpacity>
          {optionImages[index] && (
            <View style={styles.imageContainer}>
              <Image source={{uri: optionImages[index]}} style={styles.image} />
              <TouchableOpacity
                onPress={() => removeImage(index)}
                style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ))}
      <Text style={styles.label}>Correct Answer</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Correct Answer"
        value={correctAnswer}
        onChangeText={setCorrectAnswer}
        multiline={true}
        textAlignVertical="top"
      />

      <Text style={styles.label}>Explanation</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Enter explanation"
        value={explanation}
        onChangeText={setExplanation}
        multiline={true}
        textAlignVertical="top"
      />

      <TouchableOpacity
        onPress={() => pickImage('explanation')}
        style={styles.uploadButton}>
        <Text style={styles.uploadText}>Upload Explanation Image</Text>
      </TouchableOpacity>
      {explanationImage && (
        <View style={styles.imageContainer}>
          <Image source={{uri: explanationImage}} style={styles.image} />
          <TouchableOpacity
            onPress={() => removeImage('explanation')}
            style={styles.removeButton}>
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={loading}
        style={{...styles.uploadButton, backgroundColor: 'orange'}}>
        <Text style={styles.uploadText}>Submit</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {submittedData && (
        <View style={styles.submittedDataContainer}>
          <Text style={styles.submittedDataText}>Submitted Data:</Text>
          <Text style={styles.submittedDataText}>
            Class: {submittedData.selectedClass}
          </Text>
          <Text style={styles.submittedDataText}>
            Subject: {submittedData.selectedSubject}
          </Text>
          <Text style={styles.submittedDataText}>
            Chapter: {submittedData.selectedChapter}
          </Text>
          <Text style={styles.submittedDataText}>
            Topic: {submittedData.selectedTopic}
          </Text>
          {submittedData.questionImage && (
            <Image
              source={{uri: submittedData.questionImage}}
              style={styles.image}
            />
          )}
          {submittedData.options.map((opt, idx) => (
            <View key={idx}>
              <Text style={styles.submittedTitle}>
                Option {idx + 1}: {opt}
              </Text>
              {submittedData.optionImages[idx] && (
                <Image
                  source={{uri: submittedData.optionImages[idx]}}
                  style={styles.image}
                />
              )}
            </View>
          ))}
          <Text style={styles.submittedTitle}>
            Explanation: {submittedData.explanation}
          </Text>
          {submittedData.explanationImage && (
            <Image
              source={{uri: submittedData.explanationImage}}
              style={styles.image}
            />
          )}
          <Text style={styles.submittedTitle}>
            Additional Info: {submittedData.additionalInfo}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#101828',
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,

    borderRadius: 5, // Border radius

    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: 'gray',
    borderWidth: 1,
  },
  textArea: {
    height: 100,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 16,
    color: '#101828',
    backgroundColor: '#fff',
  },
  uploadButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 8,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
  },
  optionContainer: {
    marginBottom: 16,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
    color: '#101828',
    backgroundColor: '#fff',
  },
  loader: {
    marginTop: 20,
  },
  submittedDataContainer: {
    marginTop: 20,
  },
  submittedDataText: {
    marginVertical: 2,
    color: '#101828',
  },
});

export default AddScreen;

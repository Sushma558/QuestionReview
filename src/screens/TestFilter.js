import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useNavigation, useRoute} from '@react-navigation/native';
import Question from '../components/Question';
import firestore from '@react-native-firebase/firestore';

const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

function TestScreen() {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedClass, setSelectedClass] = useState('ai');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [allSections, setAllSections] = useState([]);
  const [filteredSections, setFilteredSections] = useState([]);
  const navigation = useNavigation();


  const route = useRoute();

  //   useEffect(() => {
  //     const fetchQuestions = async () => {
  //       try {
  //         const response = await new Promise((resolve) =>
  //           setTimeout(() => resolve(mockQuestionsData), 1000)
  //         );
  //         setQuestions(response);
  //         setFilteredQuestions(response);
  //         setLoading(false);
  //       } catch (error) {
  //         ToastAndroid.show('Error fetching questions', ToastAndroid.SHORT);
  //         setLoading(false);
  //       }
  //     };

  //     fetchQuestions();
  //   }, []);

  useEffect(() => {
    firestore()
      .collection('SAMAISections')
      .get()
      .then(snapShot => {
        var sections = [];
        snapShot.docs.map(item => {
          sections.push({...item.data(), id: item.id});
        });
        setAllSections(sections);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (allSections && selectedClass) {
      if (selectedClass == 'ai') {
        const nonPyqItems = allSections.filter(
          item => !item.reviewCode?.toLowerCase().includes('pyq'),
        );
        setFilteredSections(nonPyqItems);
      } else {
        const filtered = allSections.filter(item =>
          item.reviewCode?.toLowerCase().includes('pyq'),
        );
        setFilteredSections(filtered);
      }
    }
  }, [selectedClass, allSections]);

  const handleYearChange = year => {
    console.log(year)
    setSelectedYear(year);
    filterQuestions(year, selectedClass);
  };

  const handleClassChange = classSelected => {
    setSelectedClass(classSelected);
    filterQuestions(selectedYear, classSelected);
  };

  const handleSubjectChange = subjectSelected => {
    setSelectedSubject(subjectSelected);
    filterQuestions(selectedYear, selectedClass, subjectSelected);
  };

  const filterQuestions = (year, classSelected, subjectSelected) => {
    let filtered = questions;
    if (year !== 'All') {
      filtered = filtered.filter(q => q.year === year);
    }
    // if (classSelected !== 'All') {
    //   filtered = filtered.filter((q) => q.class === classSelected); // Add class filter if needed
    // }
    // if (subjectSelected !== 'All') {
    //   filtered = filtered.filter((q) => q.subject === subjectSelected); // Add subject filter if needed
    // }
    setFilteredQuestions(filtered);
  };

  const handlePushButtonPress = questionId => {
    // console.log(Push button pressed for question ID: ${questionId});
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.filterLabel}>Type:</Text>
          <Picker
            selectedValue={selectedClass}
            style={styles.picker}
            onValueChange={itemValue => handleClassChange(itemValue)}>
            <Picker.Item label="AI" value="ai" />
            <Picker.Item label="PYQ" value="pyq" />
          </Picker>
        </View>

        <View style={styles.dropdownContainer}>
          <Text style={styles.filterLabel}>Review Code:</Text>
          <Picker
            selectedValue={selectedYear}
            style={styles.picker}
            onValueChange={itemValue => handleYearChange(itemValue)}>
            {filteredSections.map((item, index) => {
              return <Picker.Item label={item?.name} value={item} />;
            })}
          </Picker>
        </View>
      </View>
      <View style={{width:WIDTH*0.9, alignSelf:'center'}}>
      <Button
        title="Review Questions"
        onPress={() => {
            console.log('selected', selectedYear);
          navigation.navigate('TestTaking', {selected: selectedYear});
        }}
      />
      </View>
      {/* <View style={styles.dropdownContainer1}>
        <Text style={styles.filterLabel}>Subject:</Text>
        <Picker
          selectedValue={selectedSubject}
          style={styles.picker}
          onValueChange={(itemValue) => handleSubjectChange(itemValue)}
        >
          <Picker.Item label="Subject " value=" " />
          <Picker.Item label="Physics" value="Physics" />
          <Picker.Item label="Chemistry" value="Chemistry" />
          <Picker.Item label="Botonoy" value="Botonoy" />
          <Picker.Item label="Zology" value="Zology" />
          <Picker.Item label="Biology" value="Biology" />
        </Picker>
      </View> */}

      {/* <FlatList
        style={styles.flatList}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question_id.toString()}
        data={filteredQuestions}
        renderItem={({item, index}) => (
          <View>
            <Question
              item={item}
              index={index}
              isRetake={false}
              isSimilar={false}
              isDaily={false}
            />
            <TouchableOpacity
              style={styles.pushButton}
              onPress={() => handlePushButtonPress(item.question_id)}>
              <Text style={styles.pushButtonText}>Push</Text>
            </TouchableOpacity>
          </View>
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    marginTop: 16,
    left: 10,
    width: '95%',
    top: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
    height: 60,
    width: 60,
    // top:20,
  },
  dropdownContainer1: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 8,
    backgroundColor: '#fff',
    height: 100,
    top: 20,
  },
  filterLabel: {
    marginBottom: 5,
    fontSize: 16,
    top: 10,
  },
  picker: {
    height: 40,
    width: '100%',
    backgroundColor: '#fff', // Set background color to white
    bottom: 38,
  },
  pushButton: {
    backgroundColor: '#007BFF',
    width: 70,
    height: 40,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  pushButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

// Mock data for testing (replace with your own data source)
const mockQuestionsData = [
  {
    question_id: 1,
    question_text: 'What is the capital of France?',
    option_a: 'Paris',
    option_b: 'Berlin',
    option_c: 'Madrid',
    option_d: 'Rome',
    image_url: '',
    year: '2021',
    question_type: 'pyq',
  },
  {
    question_id: 2,
    question_text: 'Solve for x: 2x + 3 = 7',
    option_a: '2',
    option_b: '3',
    option_c: '4',
    option_d: '5',
    image_url: '',
    year: '2020',
    question_type: 'pyq',
  },
  {
    question_id: 3,
    question_text: 'What is the integral of f(x) = x²?',
    option_a: 'x³/3 + C',
    option_b: '2x + C',
    option_c: 'x² + C',
    option_d: '3x²/3 + C',
    image_url: '',
    year: '2022',
    question_type: 'pyq',
  },
  {
    question_id: 4,
    question_text: 'Solve for x: x² - 5x + 6 = 0',
    option_a: '2, 3',
    option_b: '1, 6',
    option_c: '3, 4',
    option_d: '5, 6',
    image_url: '',
    year: '2021',
    question_type: 'pyq',
  },
  {
    question_id: 5,
    question_text: 'What is the derivative of f(x) = sin(x)?',
    option_a: 'cos(x)',
    option_b: 'sin(x)',
    option_c: '-cos(x)',
    option_d: 'tan(x)',
    image_url: '',
    year: '2019',
    question_type: 'pyq',
  },
  {
    question_id: 6,
    question_text: 'Solve for x: 3x/4 - 2 = 10',
    option_a: '16/3',
    option_b: '12/3',
    option_c: '6',
    option_d: '8',
    image_url: '',
    year: '2022',
    question_type: 'pyq',
  },
  {
    question_id: 7,
    question_text: 'Calculate the limit: lim (x→2) (x² - 4)/(x - 2)',
    option_a: '4',
    option_b: '2',
    option_c: 'Undefined',
    option_d: '0',
    image_url: '',
    year: '2020',
    question_type: 'pyq',
  },
  {
    question_id: 8,
    question_text: 'What is the sum of angles in a triangle?',
    option_a: '90°',
    option_b: '180°',
    option_c: '360°',
    option_d: '270°',
    image_url: '',
    year: '2021',
    question_type: 'pyq',
  },
  {
    question_id: 9,
    question_text: 'If f(x) = 2x + 1, find f(3).',
    option_a: '5',
    option_b: '7',
    option_c: '6',
    option_d: '8',
    image_url: '',
    year: '2022',
    question_type: 'pyq',
  },
  {
    question_id: 10,
    question_text: 'What is the value of π (pi) to two decimal places?',
    option_a: '3.14',
    option_b: '3.15',
    option_c: '3.12',
    option_d: '3.13',
    image_url: '',
    year: '2019',
    question_type: 'pyq',
  },
  {
    question_id: 11,
    question_text: 'Find the area of a circle with radius r: A = πr².',
    option_a: 'πr²',
    option_b: '2πr',
    option_c: 'r²',
    option_d: '2r',
    image_url: '',
    year: '2023',
    question_type: 'pyq',
  },
  {
    question_id: 12,
    question_text: 'Solve for y: 3y + 2 = 11.',
    option_a: '3',
    option_b: '4',
    option_c: '5',
    option_d: '6',
    image_url: '',
    year: '2023',
    question_type: 'pyq',
  },
];

export default TestScreen;

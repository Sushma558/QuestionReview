import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
  Alert,
} from 'react-native';
import StatementFormatter from './StatementFormatter';
import QuizComponents from './QuizComponents';
import Image from 'react-native-scalable-image';
import EquationRendererText from './EquationRendereText';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {width: screenWidth} = Dimensions.get('window');
const figmaDesignWidth = 375;
const scale = screenWidth / figmaDesignWidth;
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const Question = ({
  item,
  index,
  isRetake,
  isSimilar,
  isDaily,
  flatListRef,
  reviewData,
}) => {
  const containsLatex = text => {
    const latexPattern = /(\$.*?\$|\\\(|\\\)|\\[a-zA-Z]+)/;
    return latexPattern.test(text);
  };
  const [pushedQuestions, setPushedQuestions] = useState([]); // Track pushed questions
  const [loading, setLoading] = useState(false);

  const isPushed = pushedQuestions.includes(item.id); // Check if the question is already pushed
  console.table([item])

  const handlePush = item => {
    // Add the pushed question to the state
    setPushedQuestions(prevState => [...prevState, item.id]);
    handleSingleQUestionPush();
  };
  const handleSingleQUestionPush = () => {
    const data = {
      questions: [
        {
          language_name: 'English',
          correct_option: item?.correctanswer,
          option_a: item?.options[0]?.text,
          option_b: item?.options[1]?.text,
          option_c: item?.options[2]?.text,
          option_d: item?.options[3]?.text,
          question_categories: item?.solvingtips,
          question_text: item?.question,
          short_explanation: item?.explanation,
          question_type: reviewData?.from === 'pyq' ? 'pyq' : 'generated',
          exam_id: '2df8f075-e95a-4126-a80d-7a68b7e4c31e',
          subject_id: item?.subjectData?.subject_id,
          topic_id: item?.unit?.unit_id,
          sub_topic_id: item?.sub_topic?.sub_topic_id,
          difficulty_level: item?.difficultyLevel?item?.difficultyLevel:"1",
          user_id: auth()?.currentUser?.uid,
          image_url: item?.image_url,
          option_a_image_url: item?.options[0]?.image,
          option_b_image_url: item?.options[1]?.image,
          option_c_image_url: item?.options[2]?.image,
          option_d_image_url: item?.options[3]?.image,
          year:
            reviewData?.from === 'pyq'
              ? item?.year && item?.year != ''
                ? Number.parseInt(item?.year)
                : 2024
              : 2024,
          //  need to add pyq and need to mention the year body parameter
          // need to change the userid
        },
      ],
    };
    if (
      item?.subjectData?.subject_id &&
      item?.unit?.unit_id &&
      item?.sub_topic?.sub_topic_id
    ) {
      setLoading(true);
      axios
        .post(
          'https://mep.scontiapp.com/samai/v1/api/v1/question/add_questions',
          data,
        )
        .then(response => {
          console.log('Single question pushed', response.data);
          pushSingleQuestion(response.data?.question_ids[0]);
          setLoading(false);
          ToastAndroid.show('Question pushed!', ToastAndroid.SHORT);
        })
        .catch(error => console.error('Error:', error));
    } else {
      Alert.alert(
        'Subject name,Chapter name and Topic name should be there to push to database',
      );
      setLoading(false);
    }
  };

  const pushSingleQuestion = (id) => {
    firestore().collection('NEETReviewQNS').doc(item?.id).update({
      pushedOn: new Date(),
      pushedBy: auth()?.currentUser?.email,
      isPushed: true,
      dbaddedquestionid: id?id:"N/A"
    });
  };

  return (
    <View key={item?.question_id} style={styles.questionContainer}>
      {/* Subject, Chapter, and Topic View */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Subject: {item?.subjectData?.subject_name || 'N/A'}</Text>
        <Text style={styles.headerText}>
          Chapter: {item?.unit?.unit_name || 'N/A'}
        </Text>
        <Text style={styles.headerText}>
          Topic: {item?.sub_topic?.sub_topic_name || 'N/A'}
        </Text>
      </View>

      {/* Question Content */}
      <View style={styles.questionRow}>
        <Text
          style={[
            styles.questionIndex,
            {lineHeight: containsLatex(item?.question_text) ? 24 : 20.8},
          ]}>
          {index + 1}.{' '}
        </Text>
        <StatementFormatter text={item?.question} />
      </View>

      {item?.year && item?.question_type === 'pyq' ? (
        <Text style={styles.yearTag}>{item?.year}</Text>
      ) : null}

      {item?.image_url ? (
        <Image
          style={styles.questionImage}
          source={{uri: item?.image_url}}
          width={screenWidth * 0.92}
          height={400}
        />
      ) : null}

      <View style={styles.quizContainer}>
        <QuizComponents
          options={[
            {
              id: 'a',
              text: item?.options[0]?.text,
              image: item?.options[0]?.image,
            },
            {
              id: 'b',
              text: item?.options[1]?.text,
              image: item?.options[1]?.image,
            },
            {
              id: 'c',
              text: item?.options[2]?.text,
              image: item?.options[2]?.image,
            },
            {
              id: 'd',
              text: item?.options[3]?.text,
              image: item?.options[3]?.image,
            },
          ]}
          qIndex={index}
          questiondata={item}
        />
        <Text style={styles.headerText}>
          Correct Answer: {item?.correctanswer || 'N/A'}
        </Text>
        <Text style={styles.headerText}>
         Difficulty Level: {item?.difficultyLevel || 'N/A'}
        </Text>
        <EquationRendererText content={item?.explanation} />
        <View
          style={{
            marginTop: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ):(
            <TouchableOpacity
              style={[styles.pushButton, isPushed && styles.disabledButton]}
              onPress={() => handlePush(item)}
              // onPressIn={()=>{
              //   handleSingleQUestionPush();
              //   fetchSingleQuestionFromFirebase();
              // }}
              disabled={isPushed} // Disable if the question is pushed
            >
              <Text style={styles.pushButtonText}>
                {isPushed ? 'Pushed' : 'Push'}
              </Text>
            </TouchableOpacity>
          ) }
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  questionContainer: {
    backgroundColor: '#ffffff', // White background
    borderRadius: 8, // Slight rounding of corners
    padding: 16, // Padding around content
    marginVertical: 8, // Spacing between questions
    elevation: 4, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2}, // iOS shadow
    shadowOpacity: 0.1, // iOS shadow opacity
    shadowRadius: 4, // iOS shadow radius
    width: '95%',
    alignSelf: 'center',
  },
  headerContainer: {
    marginBottom: 8,
  },
  headerText: {
    fontSize: 16,
    color: '#344054',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  questionRow: {
    flexDirection: 'row',
    width: '92%',
  },
  questionIndex: {
    color: '#101828',
    fontSize: 16,
    fontWeight: 'bold',
  },
  yearTag: {
    backgroundColor: '#101828',
    borderRadius: 48,
    width: 40,
    textAlign: 'center',
    color: '#fff',
    fontSize: 10,
    height: 18,
    fontFamily: 'Inter-Regular',
    marginLeft: 16,
    marginTop: 8,
  },
  questionImage: {
    minWidth: screenWidth * 0.92,
    marginTop: 12,
  },
  quizContainer: {
    marginTop: 16,
  },
  pushButton: {
    width: '50%',
    height: 50,
    backgroundColor: '#00a3f9',
    elevation: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pushButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '400',
  },
  disabledButton: {
    backgroundColor: 'gray', // Change color when disabled
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Question;

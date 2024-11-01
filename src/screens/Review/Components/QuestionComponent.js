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
import { useNavigation } from '@react-navigation/native';

const {width: screenWidth} = Dimensions.get('window');
const figmaDesignWidth = 375;
const scale = screenWidth / figmaDesignWidth;
const WIDTH = Dimensions.get('screen').width;
const HEIGHT = Dimensions.get('screen').height;

const QuestionComponent = ({
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
  const navigation=useNavigation();

  return (
    <View key={item?.question_id} style={styles.questionContainer}>
      {/* Subject, Chapter, and Topic View */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>
          Subject: {item?.subjectData?.subject_name || 'N/A'}
        </Text>
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

      {item?.questionImage ? (
        <Image
          style={styles.questionImage}
          source={{uri: item?.questionImage}}
          width={screenWidth * 0.9}
          height={400}
        />
      ) : null}
      {item?.questionImage === NaN ? <View /> : <View />}

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
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={[styles.pushButton, isPushed && styles.disabledButton]}
            
          >
            <Text style={styles.pushButtonText}>Approve</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pushButton, isPushed && styles.disabledButton]}
           
          >
            <Text style={styles.pushButtonText}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.pushButton, isPushed && styles.disabledButton]}
            onPress={() => {
                navigation.navigate('edit');
              }}
           
          >
            <Text style={styles.pushButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.acccontainer}>
      {/* Section 1 */}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Section 1</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded.section1}
        onPress={() => toggleAccordion('section1')}
      >
        <View style={styles.acccontent}>
          <Text>This is the content for Section 1</Text>
        </View>
      </ListItem.Accordion>

      {/* Section 2 */}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Section 2</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded.section2}
        onPress={() => toggleAccordion('section2')}
      >
        <View style={styles.acccontent}>
          <Text>This is the content for Section 2</Text>
        </View>
      </ListItem.Accordion>

      {/* Section 3 */}
      <ListItem.Accordion
        content={
          <ListItem.Content>
            <ListItem.Title>Section 3</ListItem.Title>
          </ListItem.Content>
        }
        isExpanded={expanded.section3}
        onPress={() => toggleAccordion('section3')}
      >
        <View style={styles.acccontent}>
          <Text>This is the content for Section 3</Text>
        </View>
      </ListItem.Accordion>
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
    width: '100%',
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
    minWidth: screenWidth * 0.7,
    marginTop: 12,
    borderWidth: 1,
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
  acccontainer: {
    flex: 1,
    padding: 10,
  },
  acccontent: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
});

export default QuestionComponent;

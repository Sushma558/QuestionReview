import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import StatementFormatter from './StatementFormatter';
import QuizComponents from './QuizComponents';
import Image from 'react-native-scalable-image';
import EquationRendererText from './EquationRendereText';

const {width: screenWidth} = Dimensions.get('window');
const figmaDesignWidth = 375;
const scale = screenWidth / figmaDesignWidth;

const Question = ({item, index, isRetake, isSimilar, isDaily, flatListRef}) => {
  const containsLatex = text => {
    const latexPattern = /(\$.*?\$|\\\(|\\\)|\\[a-zA-Z]+)/;
    return latexPattern.test(text);
  };

  return (
    <View key={item?.question_id} style={styles.questionContainer}>
      {/* Subject, Chapter, and Topic View */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Subject: {item?.subject || 'N/A'}</Text>
        <Text style={styles.headerText}>Chapter: {item?.chapter || 'N/A'}</Text>
        <Text style={styles.headerText}>Topic: {item?.topic || 'N/A'}</Text>
      </View>

      {/* Question Content */}
      <View style={styles.questionRow}>
        <Text style={[styles.questionIndex, {lineHeight: containsLatex(item?.question_text) ? 24 : 20.8}]}>
          {index + 1}.{' '}
        </Text>
        <StatementFormatter text={item?.question} />
      </View>

      {item?.year && item?.question_type === 'pyq' ? (
        <Text style={styles.yearTag}>
          {item?.year}
        </Text>
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
            {id: 'a', text: item?.options[0]?.text, image: item?.options[0]?.image},
            {id: 'b', text: item?.options[1]?.text, image: item?.options[1]?.image},
            {id: 'c', text: item?.options[2]?.text, image: item?.options[2]?.image},
            {id: 'd', text: item?.options[3]?.text, image: item?.options[3]?.image},
          ]}
          qIndex={index}
          questiondata={item}
        />
        <EquationRendererText content={item?.explanation} />
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
});

export default Question;

/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable quotes */

/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {CommonActions, useRoute} from '@react-navigation/native';
import Question from '../components/Question';

function TestTakingDisplay({navigation}) {
  const [selected, setSelected] = useState();

  const [errorText, setErrorText] = useState();
  const route = useRoute();
  const [questionsnumber, setquestionsnumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  
  return (
    <SafeAreaView>
      <FlatList
        style={{marginTop: 16}}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question_id}
        data={questions}
        renderItem={({item, index}) => {
          return <Question item={item} index={index} />;
        }}
      />
    </SafeAreaView>
  );
}
export default TestTakingDisplay;

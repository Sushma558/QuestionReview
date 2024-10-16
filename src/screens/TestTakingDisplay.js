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
import firestore from '@react-native-firebase/firestore';

function TestTakingDisplay({navigation}) {
  const [selected, setSelected] = useState();

  const [errorText, setErrorText] = useState();
  const route = useRoute();
  const [questionsnumber, setquestionsnumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [questiondata, setquestiondata] = useState([]);

  useEffect(() => {
    console.log('review', route?.params?.selected)
    let query = firestore()
      .collection('NEETReviewQNS')
      .where('reviewCode', '==', route?.params?.selected?.reviewCode)
      .orderBy('addedOn', 'asc')
      .limit(10);
    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    query.onSnapshot(snapshot => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id, // Add the document ID
        ...doc.data(), // Spread the document data
      }));
      console.log('data', documents)
      setquestiondata([...documents]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);

      // setLoading(false);
    });
  }, [route?.params?.selected?.reviewCode]);
  const paginate = () =>{
    let query = firestore()
      .collection('NEETReviewQNS')
      .where('reviewCode', '==', route?.params?.selected?.reviewCode)
      .orderBy('addedOn', 'asc')
      .limit(10);
    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    query.onSnapshot(snapshot => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id, // Add the document ID
        ...doc.data(), // Spread the document data
      }));
      setquestiondata([...questiondata, ...documents]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);

      // setLoading(false);
    });
  }
  return (
    <SafeAreaView>
      <FlatList
        style={{marginTop: 16}}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.question_id}
        data={questiondata}
        renderItem={({item, index}) => {
          return <Question item={item} index={index} />;
        }}
        onEndReachedThreshold={0.7}
        onEndReached={paginate}
      />
    </SafeAreaView>
  );
}
export default TestTakingDisplay;

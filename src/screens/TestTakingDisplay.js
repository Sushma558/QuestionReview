import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Question from '../components/Question';
import firestore from '@react-native-firebase/firestore';

function TestTakingDisplay({ navigation }) {
  const [selected, setSelected] = useState();
  const [errorText, setErrorText] = useState();
  const route = useRoute();
  const [questionsnumber, setquestionsnumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [questiondata, setquestiondata] = useState([]);
  const [pushedQuestions, setPushedQuestions] = useState([]); // Track pushed questions

  useEffect(() => {
    console.log('review', route?.params?.selected);
    fetchQuestions();
  }, [route?.params?.selected?.reviewCode]);

  const fetchQuestions = () => {
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
        id: doc.id,
        ...doc.data(),
      }));
      console.log('data', documents);
      setquestiondata(prevData => [...prevData, ...documents]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
    });
  };

  const handlePush = (item) => {
    // Add the pushed question to the state
    setPushedQuestions(prevState => [...prevState, item.id]);
    ToastAndroid.show('Question pushed!', ToastAndroid.SHORT);
  };

  const renderItem = ({ item, index }) => {
    const isPushed = pushedQuestions.includes(item.id); // Check if the question is already pushed

    return (
      <View style={styles.itemContainer}>
        <Question item={item} index={index} />
        <TouchableOpacity
          style={[styles.pushButton, isPushed && styles.disabledButton]}
          onPress={() => handlePush(item)}
          disabled={isPushed} // Disable if the question is pushed
        >
          <Text style={styles.pushButtonText}>
            {isPushed ? 'Pushed' : 'Push'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id}
        data={questiondata}
        renderItem={renderItem}
        onEndReachedThreshold={0.7}
        onEndReached={fetchQuestions}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 16,
    width: '95%',
    left: 10,
  },
  itemContainer: {
    marginBottom: 20,
  },
  pushButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'flex-start',
    left: 20,
    width: '30%',
  },
  pushButtonText: {
    color: 'white',
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    left: 25,
  },
  disabledButton: {
    backgroundColor: 'gray', // Change color when disabled
  },
});

export default TestTakingDisplay;

import React, {useEffect, useState} from 'react';
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
import {useRoute} from '@react-navigation/native';
import Question from '../components/Question';
import firestore from '@react-native-firebase/firestore';

function SeeAllPYQ({navigation}) {
  const [selected, setSelected] = useState();
  const [errorText, setErrorText] = useState();
  const route = useRoute();
  const [questionsnumber, setquestionsnumber] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [lastDoc, setLastDoc] = useState();
  const [questiondata, setquestiondata] = useState([]);
  const [pushedQuestions, setPushedQuestions] = useState([]); // Track pushed questions
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('review', route?.params?.selected);
    fetchQuestions(route?.params?.reviewersapprove);
  }, [route?.params]);

  const fetchQuestions = (reviewers) => {
    let query = firestore()
      .collection('NEETReviewQNS')
      .where('reviewCode', '==', route?.params?.selected?.reviewCode)
    //   .where('reviewStatus','array-contains-any', reviewers)
      .where('isPushed','==',false)
      .orderBy('addedOn', 'asc')
      .limit(10);

    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }

    query.get().then(snapshot => {
      const documents = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('data', documents);
      setquestiondata(prevData => [...prevData, ...documents]);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setLoading(false);
    }).catch(err=>{
      console.log(err);
    });
  };

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <Question item={item} index={index} reviewData={route?.params?.selected}/>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          data={questiondata}
          renderItem={renderItem}
          onEndReachedThreshold={0.7}
          onEndReached={()=>{
            fetchQuestions(route?.params?.reviewersapprove);
          }}
          ListEmptyComponent={()=>{
            return(
              <View style={{flex:1, justifyContent:'center'}}>
              <Text style={{fontSize:16, fontWeight:'600', color:'#000'}}>No Reviewed Questions...</Text>
              </View>
            )
          }}
        />
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default SeeAllPYQ;


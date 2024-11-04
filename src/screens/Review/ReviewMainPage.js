import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Picker} from '@react-native-picker/picker';

const ReviewMainPage = () => {
  const [type, setType] = useState('AI');
  const [classSubject, setClassSubject] = useState('');

  const screenWidth = Dimensions.get('window').width;

  // Sample card data with unique background colors
  const cardData = [
    {
      id: 1,
      name: 'Physics',
      description: 'Physics Class 11',
      total: 50,
      reviewed: 30,
      pending: 20,
      backgroundColor: '#d4e6f1',
    },
    {
      id: 2,
      name: 'Chemistry',
      description: 'Chemistry Class 11',
      total: 40,
      reviewed: 25,
      pending: 15,
      backgroundColor: '#f9e79f',
    },
    {
      id: 3,
      name: 'Botany',
      description: 'Botany Class 11',
      total: 60,
      reviewed: 35,
      pending: 25,
      backgroundColor: '#fadbd8',
    },
    {
      id: 4,
      name: 'Zoology',
      description: 'Zoology Class 11',
      total: 45,
      reviewed: 20,
      pending: 25,
      backgroundColor: '#d5f5e3',
    },

    {
      id: 5,
      name: 'Physics',
      description: 'Physics Class 12',
      total: 50,
      reviewed: 30,
      pending: 20,
      backgroundColor: '#e7f5d5',
    },
    {
      id: 6,
      name: 'Chemistry',
      description: 'Chemistry Class 12',
      total: 40,
      reviewed: 25,
      pending: 15,
      backgroundColor: '#f5e3d5',
    },
    {
      id: 7,
      name: 'Botany',
      description: 'Botany Class 11',
      total: 60,
      reviewed: 35,
      pending: 25,
      backgroundColor: '#e3d5f5',
    },
    {
      id: 8,
      name: 'Zoology',
      description: 'Zoology Class 12',
      total: 45,
      reviewed: 20,
      pending: 25,
      backgroundColor: '#f5d5e7',
    },
  ];
  const CardComponent = ({cardData}) => {
    const navigation = useNavigation();
    const [cardsData, setCardsData] = useState([]);
    const [testtype, settesttype] = useState("");
    const [reviewCode, setreviewCode] = useState();
    const [reviewapproved, setreviewapproved] = useState([]);
    const [reviewrejected, setreviewrejected] = useState([]);
  useEffect(() => {
    if (userdata) {
      if (JSON.parse(userToken)?.userType == "Admin") {
        firestore().collection("SAMAISections")
          .orderBy("addedOn","desc")
          .onSnapshot((snapShot) => {
            var cards = [];
            snapShot.docs.map((item) => {
              cards.push({ ...item.data(), id: item.id });
            });
            setCardsData(cards);
          });
      } else {
        firestore().collection("SAMAISections")
          .where("userType", "==", JSON.parse(userToken)?.userType)
          .where("subject",'==',JSON.parse(userToken)?.subject)
          .orderBy("addedOn","desc")
          .onSnapshot((snapShot) => {
            var cards = [];
            snapShot.docs.map((item) => {
              cards.push({ ...item.data(), id: item.id });
            });
            setCardsData(cards);
          });
      }
      try {
        firestore().collection("SamaiReviewUsers")
          .doc(JSON.parse(userToken)?.userId)
          .onSnapshot((snap) => {
            setcountdata(snap.data());
          });
   
          firestore().collection('SamaiReviewUsers')
          .where('userType', '==', 'Reviewer')
          .get()
          .then(snap => {
            const reviewers = {
              physics: [],
              chemistry: [],
              botany: [],
              zoology: []
            };
            const reviewersrejected = {
              physics: [],
              chemistry: [],
              botany: [],
              zoology: []
            };

            snap.docs.forEach(doc => {
              const userId = doc.data()?.userId;
              const subject = doc.data()?.subject;

              if (subject === 'physics') {
                reviewers.physics.push(`${userId}-approve`);
                reviewersrejected.physics.push(`${userId}-rejected`);
              } else if (subject === 'chemistry') {
                reviewers.chemistry.push(`${userId}-approve`);
                reviewersrejected.chemistry.push(`${userId}-rejected`);
              } else if (subject === 'biology') {
                reviewers.botany.push(`${userId}-approve`);
                reviewers.zoology.push(`${userId}-approve`);
                reviewersrejected.botany.push(`${userId}-rejected`);
                reviewersrejected.zoology.push(`${userId}-rejected`);
              }
            });

            setreviewapproved(reviewers);
            setreviewrejected(reviewersrejected);
          });

      } catch (error) {
        console.log(error)
       }
    }
  }, [userdata]);


    return (
      <TouchableOpacity
        style={[styles.card, {backgroundColor: cardData.backgroundColor}]}
        onPress={
          () => navigation.navigate('questionreview', {cardId: cardData.id})
          // { cardId: cardData.id }
        }>
        <Text style={styles.cardName}>{cardData.name}</Text>
        <Text style={styles.cardDescription}>{cardData.description}</Text>
        <Text style={styles.cardDescription}>
          Total Questions: {cardData.total}
        </Text>
        <Text style={styles.cardDescription}>
          Reviewed: {cardData.reviewed}
        </Text>
        <Text style={styles.cardDescription}>Pending: {cardData.pending}</Text>
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={
            () => navigation.navigate('questionreview', {cardId: cardData.id})
            // { cardId: cardData.id }
          }>
          <Text style={styles.reviewButtonText}>Start Review</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Review Questions       </Text>
      {/* Dropdowns */}

      <View style={styles.dropdownContainer}>
        <Picker
          selectedValue={type}
          style={styles.picker}
          onValueChange={value => setType(value)}>
          <Picker.Item label="AI" value="AI" />
          <Picker.Item label="PyQ" value="PyQ" />
        </Picker>
        <Picker
          selectedValue={classSubject}
          style={styles.picker}
          onValueChange={value => setClassSubject(value)}>
          <Picker.Item label="Select Class & Subject" value="" />
          <Picker.Item label="Chemistry11" value="Chemistry11" />
          <Picker.Item label="Chemistry12" value="Chemistry12" />
          <Picker.Item label="Physics11" value="Physics11" />
          <Picker.Item label="Physics12" value="Physics12" />
          <Picker.Item label="Botany11" value="Botany11" />
          <Picker.Item label="Botany12" value="Botany12" />
          <Picker.Item label="Zoology11" value="Zoology11" />
          <Picker.Item label="Zoology12" value="Zoology12" />
        </Picker>
      </View>

      {/* Card List */}
      <FlatList
        data={cardData}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <CardComponent cardData={item} />}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
        ListFooterComponent={() => {
          return <View style={{height: 75}} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    marginBottom: 8,
    color: '#101828',
    textAlign: 'center',
    fontWeight: '600',
    textShadowColor: 'red',
    textShadowOffset: {width: 0.3, height: 0.3},
    textShadowRadius: 1,
  },
  container: {flex: 1, paddingTop: 20, backgroundColor: '#fff'},
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '45%',
    color: 'black',
    marginBottom: 10, // Adds spacing between dropdowns
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  flatListContent: {padding: 10},
  columnWrapper: {justifyContent: 'space-between'},
  card: {
    width: '48%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    margin: 5,
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#101828',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    color: '#101828',
  },
  reviewButton: {
    backgroundColor: '#2980b9',
    borderRadius: 5,
    paddingVertical: 8,
    marginTop: 10,
  },
  reviewButtonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
});

export default ReviewMainPage;

import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation,} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useUserData } from '../../../UserContext';

const admincard = [
  {name: 'ADD USER', bgColor: 'rgba(53, 186, 246,0.7)', navigate: 'adduser'},
  {name: 'TRACK PUSH', bgColor: 'rgba(139,195,74,0.7)', navigate: 'trackpush'},
  {
    name: 'TRACK TEACHERS',
    bgColor: 'rgba(233,30,99,0.7)',
    navigate: 'trackteacher',
  },
  {
    name: 'PUSH QUESTION TO SAMAI DB',
    bgColor: 'rgba(0,162,179,0.7)#00a2c3',
    navigate: 'push',
  },
  {
    name: 'Add Review Card',
    bgColor: 'rgba(162,162,179,0.7)#00a2c3',
    navigate: 'addreviewcard',
  },
];
// Get the device width to manage layout dynamically
const {width} = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20; // Width for each card (adjust for padding)

const HomeScreen = ({route}) => {
  const navigation = useNavigation();
  const userdata = route?.params?.userdata;
  console.log("lolol  ",userdata)
  const [cardsData, setCardsData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [from, setfrom] = useState('');
  const [countdata, setcountdata] = useState();
  const [testtype, settesttype] = useState('');
  const [reviewCode, setreviewCode] = useState();
  const [reviewapproved, setreviewapproved] = useState([]);
  const [reviewrejected, setreviewrejected] = useState([]);
  const {user, changeUser} = useUserData();
  useEffect(() => {
    if (user) {
      if (user?.userType == 'Admin') {
        firestore().collection('SAMAISections')
          .orderBy('addedOn', 'desc')
          .onSnapshot(snapShot => {
            var cards = [];
            snapShot.docs.map(item => {
              cards.push({...item.data(), id: item.id});
            });
            setCardsData(cards);
          });
      } else {
        firestore().collection('SAMAISections')
          .where('userType', '==', user?.userType)
          .where('subject', '==', user?.subject)
          .orderBy('addedOn', 'desc')
          .onSnapshot(snapShot => {
            var cards = [];
            snapShot.docs.map(item => {
              cards.push({...item.data(), id: item.id});
            });
            setCardsData(cards);
          });
      }
      try {
        firestore().collection('SamaiReviewUsers')
          .doc(user?.userId)
          .onSnapshot(snap => {
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
              zoology: [],
            };
            const reviewersrejected = {
              physics: [],
              chemistry: [],
              botany: [],
              zoology: [],
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
        console.log(error);
      }
    }
  }, [user]);

  // Card click handler for navigation
  const handleCardPress = cardName => {
    navigation.navigate(cardName); // Ensure each card has a matching route in your navigation stack
  };

  const cards = [
    {
      name: 'TOTAL COUNT',
      count: user?.reviewCount,
      bgColor: 'rgba(242,139,130,0.7)',
      navigate: 'reviewedqns',
    },
    {
      name: 'APPROVED COUNT',
      count: user?.approveCount,
      bgColor: 'rgba(251, 188, 4,0.7)',
      navigate: 'reviewedqns',
    },
    {
      name: 'REJECTED COUNT',
      count: user?.rejectCount,
      bgColor: 'rgba(52, 168, 83,0.7)',
      navigate: 'reviewedqns',
    },
    {
      name: 'CREATED COUNT',
      count: 1000,
      bgColor: 'rgba(66,133,244,0.7)',
      navigate: 'reviewedqns',
    },
    {
      name: 'EDITED COUNT',
      count: 1000,
      bgColor: 'rgba(156,39,176,0.7)',
      navigate: 'reviewedqns',
    },
    {
      name: 'PENDING COUNT',
      count: 1000,
      bgColor: 'rgba(255,111,0,0.7)',
      navigate: 'reviewedqns',
    },
  ];

  // Render a single card
  const renderCard = ({item}) => (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: item.bgColor, width: CARD_WIDTH}]}
      onPress={() => handleCardPress(item.navigate)}>
      <Text style={styles.cardCount}>{item?.count}</Text>
      <Text style={styles.cardText}>{item?.name}</Text>
    </TouchableOpacity>
  );
  const adminrenderCard = ({item}) => (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: item.bgColor, width: CARD_WIDTH}]}
      onPress={() => handleCardPress(item.navigate)}>
      <Text style={styles.cardCount}>{item?.count}</Text>
      <Text style={styles.cardText}>{item?.name}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <View>
        <Text style={styles.heading}> Hey- {user?user?.name:"User"} 👋</Text>
        <Text style={styles.data}>
          Here You can see all the information about reviewed data
        </Text>
      </View>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={item => item.name}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
      <FlatList
        data={admincard}
        renderItem={adminrenderCard}
        keyExtractor={item => item.name}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
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
  data: {
    fontSize: 16,
    marginBottom: 8,
    color: '#101828',
    textAlign: 'center',
    fontWeight: '500',
  },
  grid: {
    padding: 10,
  },
  card: {
    height: 150,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#000',
  },
  cardText: {
    color: '#101828',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardCount: {
    marginBottom: 10,
    color: '#101828',
    fontWeight: 'bold',
    fontSize: 24,
  },
});

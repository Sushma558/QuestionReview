import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React,{useState} from 'react'
import { Picker } from '@react-native-picker/picker';
import Question from '../../components/Question';

const QuestionReviewPage = () => {
    const [subtopic, setSubTopic] = useState('');
  return (
   
    <SafeAreaView>
         <View>
      <Text style={styles.heading}>Question Review Page</Text>
    </View>
        <View style={styles.dropdownContainer}>
                
                <Picker
                    selectedValue={subtopic}
                    style={styles.picker}
                    onValueChange={value => setSubTopic(value)}>
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
            <Text style={styles.data}>Subject:Subject Name() /Chapter:Chapter-Name()/ Topic:Topic-Name()</Text>

            <ScrollView>
                {/* <Question/> */}
            </ScrollView>
    </SafeAreaView>
  )
}

export default QuestionReviewPage

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
      data: {
        fontSize: 16,
        marginBottom: 8,
        color: '#101828',
        textAlign: 'center',
        fontWeight: '500',

      },
    dropdownContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },
    picker: {
        height: 50, width: '95%', color: 'black',
        marginBottom: 10, // Adds spacing between dropdowns
        backgroundColor: '#f8f8f8',
        borderRadius: 5,elevation:5 
    },
})
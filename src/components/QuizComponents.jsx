import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  useColorScheme,
  Dimensions,
} from 'react-native';
import CustomRadioButton from './CustomRadioButton';
import Image from 'react-native-scalable-image';
import MathView, {MathText} from 'react-native-math-view';
import EquationRenderOption from './EquationRenderOption';

const {width: screenWidth, height: screenHeight} = Dimensions.get('window');

const QuizComponents = props => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = React.useState('first');

  const ITEM_WIDTH = Dimensions.get('window').width;

  const containsLatex = text => {
    // Common LaTeX patterns: math delimiters or commands starting with "\"
    const latexPattern = /(\$.*?\$|\\\(|\\\)|\\[a-zA-Z]+)/;
    return latexPattern.test(text);
  };
  return (
    <View style={{}}>
      <View>
        {props?.options.map((option, index) => (
          <Pressable
            key={option.id}
            style={{
              ...styles.btnOption,
              backgroundColor: 'transparent',
            }}>
            <View>
              <View style={styles.optionView}>
                <CustomRadioButton
                  value={option.id}
                  status={selectedOption === option.id ? true : false}
                  color="#008acb"
                />
                <View
                  style={{
                    flexDirection: 'column',
                    width: '95%',
                    marginLeft: 4,
                  }}>
                  {option?.image ? (
                    <Image
                      style={{
                        minWidth: screenWidth * 0.92 - 32,
                        marginBottom: 5,
                        resizeMode: 'stretch',
                      }}
                      // source={{uri: props.data.media[0].url}}
                      source={{uri: option?.image}}
                      width={screenWidth * 0.92 - 32}
                      height={200}
                    />
                  ) : (
                    <View />
                  )}
                  {/* {containsLatex(option?.text) ? (
                    <MathText
                      value={option?.text?.replace(
                        /\(a\)|\(b\)|\(c\)|\(d\)/g,
                        ""
                      )}
                      direction="ltr"
                      CellRendererComponent={
                        <Text
                          style={[
                           
                            { color: "#101828", lineHeight: 20, fontSize:14, fontWeight:'500' },
                          ]}
                        />
                      }
                    />
                  ) : (
                    <Text
                      style={[
                        { color: "#101828", lineHeight: 20,fontSize:14, fontWeight:'500' },
                      ]}
                    >
                      {option?.text
                        ? option?.text?.replace(/\(a\)|\(b\)|\(c\)|\(d\)/g, "")
                        : ""}
                    </Text>
                  )} */}
                  <EquationRenderOption
                    content={
                      option?.text
                        ? option?.text?.replace(/\(a\)|\(b\)|\(c\)|\(d\)/g, '')
                        : ''
                    }
                    style={[]}
                  />
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  btnOption: {
    // backgroundColor: selectedOption === option.id ? '#2f667f' : 'white',
    padding: 5,
    marginBottom: 0,
    borderRadius: 25,
    // flexDirection: "row",
    justifyContent: 'center', // Adjusted to start from the left
    alignItems: 'center',
    width: '95%',
    alignContent: 'center',
    alignSelf: 'center',
  },
  optionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    paddingHorizontal: 10,
  },
  optionTxt: {
    fontSize: 14,
    width: '90%',
    lineHeight: 20,
    fontFamily: 'NotoSans-Medium',
    marginRight: 5,
    color: 'black',
    // fontFamily: 'BentonSans-Regular'
    // color: selectedOption === option.id ? 'white' : 'black',
  },
  optionTxtDarkMode: {
    fontSize: 14,
    width: '90%',
    lineHeight: 20,
    fontFamily: 'NotoSans-Regular',
    marginRight: 5,
    color: 'white',
    // fontFamily: 'BentonSans-Regular'
    // color: selectedOption === option.id ? 'white' : 'black',
  },
  optionTxtRight: {
    fontSize: 14,
    width: '90%',
    lineHeight: 20,
    color: '#008000',
    fontFamily: 'NotoSans-Medium',
    marginRight: 5,
    // fontFamily: 'BentonSans-Regular'
    // color: selectedOption === option.id ? 'white' : 'black',
  },
  optionTxtWrong: {
    fontSize: 14,
    width: '90%',
    lineHeight: 20,
    color: '#ff0000',
    fontFamily: 'NotoSans-Medium',
    marginRight: 5,
    // fontFamily: 'BentonSans-Regular'
  },
  optionTxtIndex: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'NotoSans-Medium',
    textAlignVertical: 'center',
    marginRight: 5,
    color: 'black',
    // fontFamily: 'BentonSans-Regular'
    // color: selectedOption === option.id ? 'white' : 'black',
  },
  optionTxtIndexDarkMode: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'NotoSans-Medium',
    textAlignVertical: 'center',
    marginRight: 5,
    color: 'white',
    // fontFamily: 'BentonSans-Regular'
    // color: selectedOption === option.id ? 'white' : 'black',
  },
  optionTxtRightIndex: {
    fontSize: 14,
    lineHeight: 20,
    color: '#008000',
    fontFamily: 'NotoSans-Medium',
    marginRight: 5,
    textAlignVertical: 'center',
    // fontFamily: 'BentonSans-Regular'
    // color: selectedOption === option.id ? 'white' : 'black',
  },
  optionTxtWrongIndex: {
    fontSize: 14,
    lineHeight: 20,
    color: '#ff0000',
    fontFamily: 'NotoSans-Medium',
    marginRight: 5,
    textAlignVertical: 'center',
    // fontFamily: 'BentonSans-Regular'
  },
});

export default QuizComponents;

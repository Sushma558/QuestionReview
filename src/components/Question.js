import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import StatementFormatter from "./StatementFormatter";
import QuizComponents from "./QuizComponents";
import Image from "react-native-scalable-image";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const figmaDesignWidth = 375; // e.g., iPhone X width in Figma

const scale = screenWidth / figmaDesignWidth;
const Question = ({
  item,
  index,
  isRetake,
  isSimilar,
  isDaily,
  flatListRef,
}) => {
  

  const formatLatex = (text) => {
    const pattern =
      /\$\$(.*?)\$\$|\$(.*?)\$|\\begin{equation}(.*?)\\end{equation}|\\[(.*?)\\]|\\((.*?)\\)/gs;

    const replaceLatex = (match, ...groups) => {
      const content = groups.find((group) => group !== undefined);
      if (content.includes("\n") || content.includes("\\\\")) {
        return `\n\\[\n${content}\n\\]\n`;
      } else {
        return `\n\\[\n${content}\n\\]\n`;
      }
    };

    return text.replace(pattern, replaceLatex);
  };

  const containsLatex = (text) => {
    // Common LaTeX patterns: math delimiters or commands starting with "\"
    const latexPattern = /(\$.*?\$|\\\(|\\\)|\\[a-zA-Z]+)/;
    return latexPattern.test(text);
  };
  return (
    <View key={item?.question_id} style={{ marginBottom: 8 }}>
      {/* <MathText
        value=''
        direction="auto"
        isMath={true}
        inline={true}
        CellRendererComponent={<TouchableOpacity />}
      />
       */}
      <View
        style={{
          flexDirection: "row",
          width: "92%",
          // alignSelf: "center",
        }}
      >
        <Text
          style={[
            { color: "#101828", lineHeight: containsLatex(item?.question_text)?24:20.8, fontSize:16, fontWeight:'bold' },
          ]}
        >
          {index + 1}.{" "}
        </Text>
        <StatementFormatter text={item?.question_text} />
      </View>

      {item?.year && item?.question_type == "pyq" ? (
        <Text
          style={{
            backgroundColor: "#101828",
            borderRadius: 48,
            width: 40,
            textAlign: "center",
            textAlignVertical: "center",
            color: "#fff",
            fontSize: 10,
            height: 18,
            fontFamily: "Inter-Regular",
            marginLeft: 16,
            top: 8,
          }}
        >
          {item?.year}
        </Text>
      ) : (
        <View />
      )}
      {item?.image_url ? (
        <Image
          style={{ minWidth: screenWidth*0.92, marginTop:12 }}
          // source={{uri: props.data.media[0].url}}
          source={{ uri: item?.image_url }}
          width={screenWidth*0.92}
          height={400}
        />
      ) : (
        <View />
      )}
      <View style={{ marginTop: 16 }}>
        <QuizComponents
          options={[
            {
              id: "a",
              text: item?.option_a?.converted_content?item?.option_a?.converted_content:item?.option_a,
              image: item?.option_a_image_url
            },
            {
              id: "b",
              text: item?.option_b?.converted_content?item?.option_b?.converted_content:item?.option_b,
              image: item?.option_b_image_url
            },
            {
              id: "c",
              text: item?.option_c?.converted_content?item?.option_c?.converted_content:item?.option_c,
              image: item?.option_c_image_url
            },
            {
              id: "d",
              text: item?.option_d?.converted_content?item?.option_d?.converted_content:item?.option_d,
              image: item?.option_d_image_url
            },
          ]}
          qIndex={index}
          questiondata={item}
          isRetake={isRetake}
          isSimilar={isSimilar}
          isDaily={isDaily}
          flatListRef={flatListRef}
        />

        {/* <View style={{height: 1, width: '95%', color: 'grey'}} /> */}
      </View>
    </View>
  );
};
export default Question;

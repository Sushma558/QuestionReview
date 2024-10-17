// import {useTheme} from '@/theme';
import React from 'react';
import {Text, View} from 'react-native';
import MathView, {MathText} from 'react-native-math-view';

function EquationRenderOption({content, style}) {
  // const {colors, fonts} = useTheme();

  const containsLatex = text => {
    const latexPattern =
      /(\$\$[\s\S]*?\$\$|\$.*?\$|\\\[|\\\(|\\\)|\\[a-zA-Z]+)/;
    return latexPattern.test(text);
  };

  const isBlockLatex = text => {
    const blockLatexPattern = /(\$\$[\s\S]*?\$\$|\\\[.*?\\\])/;
    return blockLatexPattern.test(text);
  };

  const renderContent = (part, index) => {
    if (containsLatex(part)) {
      if (isBlockLatex(part)) {
        return (
          <MathView
            key={index}
            math={part}
            resizeMode="contain"
            style={{
              backgroundColor: 'transparent',
              borderRadius: 8,
              alignSelf: 'flex-start',
              marginBottom: 5, // Add space between blocks
            }}
            config={{ex: 10, inline: false, em: 14}}
          />
        );
      } else {
        return (
          <MathText
            key={index}
            value={part}
            direction="ltr"
            CellRendererComponent={
              <Text
                style={[
                  {
                    color: '#101828',
                    lineHeight: 20,
                    fontSize: 14,
                    fontWeight: '500',
                  },
                ]}
              />
            }
          />
        );
      }
    } else {
      return (
        <Text
          key={index}
          style={[
            {color: '#101828', lineHeight: 20, fontSize: 14, fontWeight: '500'},
          ]}>
          {part}
        </Text>
      );
    }
  };

  // Split content by newline (\n) and render each part
  const contentParts = content.split('\\n');

  return (
    <View style={{flexDirection: 'column', alignSelf: 'stretch'}}>
      {contentParts.map((part, index) => (
        <View key={index} style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {renderContent(part, index)}
        </View>
      ))}
    </View>
  );
}

export default EquationRenderOption;

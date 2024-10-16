import React from 'react';
import {Dimensions, Text, View} from 'react-native';
import MathView, {MathText} from 'react-native-math-view';

const {width: screenWidth} = Dimensions.get('window');

const figmaDesignWidth = 375;
const scale = screenWidth / figmaDesignWidth;

function StatementFormatter({text}) {
  const statementPatterns = [
    'Statement -I:',
    'Statement -II:',
    'Statement -III:',
    'Statement -IV:',
    'Statement-1:',
    'Statement-2:',
    'Statement-3:',
    'Statement-4:',
  ];

  const pattern = statementPatterns.map(pattern => `(?=${pattern})`).join('|');
  const combinedPattern = new RegExp(pattern, 'g');

  const containsLatex = text => {
    const latexPattern =
      /(\$\$[\s\S]*?\$\$|\$.*?\$|\\\[|\\\(|\\\)|\\[a-zA-Z]+)/;
    return latexPattern.test(text);
  };

  const isBlockLatex = text => {
    const blockLatexPattern = /(\$\$[\s\S]*?\$\$|\\\[.*?\\\])/;
    return blockLatexPattern.test(text);
  };

  const contentText = text?.converted_content ? text.converted_content : text;
  const splitText = contentText ? contentText.split('\\n') : [];

  const renderContent = content => {
    if (containsLatex(content)) {
      if (isBlockLatex(content)) {
        return (
          <MathView
            math={content}
            resizeMode="contain"
            style={{
              backgroundColor: 'transparent',
              borderRadius: 8,
              alignSelf: 'flex-start',
            }}
            config={{ex: 10, inline: false, em: 14}}
          />
        );
      } else {
        return (
          <MathText
            value={content}
            direction="ltr"
            CellRendererComponent={
              <Text
                style={[
                  {
                    color: '#101828',
                    lineHeight: 24,
                    letterSpacing: -0.2,
                    fontSize: 16,
                    fontWeight: '700',
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
          style={[
            {
              color: '#101828',
              lineHeight: 20.8,
              letterSpacing: -0.36,
              fontSize: 16,
              fontWeight: '700',
            },
          ]}>
          {content}
        </Text>
      );
    }
  };

  return (
    <View style={{width: 'auto'}}>
      {splitText.map((block, blockIndex) => {
        if (!block) return null;

        const statements = block.split(combinedPattern);

        return (
          <View key={blockIndex} style={{marginBottom: 10}}>
            {statements.map((statement, index) => {
              if (!statement) return null;

              const trimmedStatement = statement.trim();
              return (
                <View
                  key={`${blockIndex}-${index}`}
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}>
                  {renderContent(trimmedStatement)}
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

export default StatementFormatter;

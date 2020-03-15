/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component, useState, useEffect} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
  TextInput,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  const [textData, setTextData] = useState([]);

  useEffect(() => {
    //使用阿凡达提供的公共接口
    fetch(
      'http://api.avatardata.cn/ZhouGongJieMeng/LookUp?key=365e5dc2b23b475599b403b5368759bc&keyword=' +
        text,
    )
      .then(res => res.json())
      .then(res => {
        if (!res) {
          setTextData('');
        } else {
          if (res && res.result && res.result.length > 0) {
            setTextData(res.result);
          } else {
            setTextData('');
          }
        }
      });

    return () => {};
  }, [text]);

  return (
    <View style={{padding: 50}}>
      <TextInput
        style={{height: 40}}
        placeholder="你梦到什么啦？"
        onChangeText={text => setText(text)}
        defaultValue={text}
        value={text}
      />
      <ScrollView style={{padding: 10, fontSize: 42}}>
        {textData && textData.length > 0 ? (
          textData.map((t, k) => {
            let content = t.content.replace('<div>', '').replace('</div>', '');
            if (content.indexOf('<br/>') > 0) {
              let cont = content.split('<br/>');
              console.log(cont);
              return (
                <Text key={`text-${k}`}>
                  {cont &&
                    cont.map((v, i) => {
                      console.log(v);
                      return (
                        <Text key={`textItem-${i}`}>
                          {v} {'\n'}
                        </Text>
                      );
                    })}
                </Text>
              );
            } else {
              return <Text key={`text-${k}`}>{content}</Text>;
            }
          })
        ) : (
          <Text>没有内容</Text>
        )}
      </ScrollView>
    </View>
  );
};

const App: () => React$Node = () => {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <ScrollView>
        <PizzaTranslator />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

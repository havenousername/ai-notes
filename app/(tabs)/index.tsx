import {StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import {useState} from "react";

export default function TabOneScreen() {
  const [input, setInput] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Hello there
      </Text>
      <TextInput
        value={input}
        onChangeText={setInput}
        multiline
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

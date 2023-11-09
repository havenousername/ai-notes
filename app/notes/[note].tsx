import {useLocalSearchParams} from "expo-router";
import {useEffect} from "react";
import { Text } from "react-native";


const Note = () => {
  const { slug } = useLocalSearchParams();

  useEffect(() => {
    console.log(slug, 'slug');
  }, [])

  return <Text>Blog post: {slug}</Text>;
};

export default Note;

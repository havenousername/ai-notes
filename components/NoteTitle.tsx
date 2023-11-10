import {useNotes} from "../hooks/useNotes";
import {MonoText} from "./StyledText";
import {useRef, useState} from "react";
import {Input} from "./Themed";
import Colors from "../constants/Colors";
import {useClickOutside} from "../hooks/useClickOutside";
import {TextInput} from "react-native";
import {useCurrentNote} from "../hooks/useCurrentNote";


const NoteTitle = () => {
  const {  data: { titles, uuids }, setTitle } = useNotes();
  const [isInput, setIsInput] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const note = useCurrentNote();

  useClickOutside(inputRef, () => {
    setIsInput(false);
  });

  if (isInput) {
    return (
      <Input
        ref={inputRef}
        value={titles[note]}
        darkColor={Colors.dark.background}
        lightColor={Colors.light.background}
        fontFamily={'SpaceMono'}
        onChangeText={(title) => setTitle(note, title)}
      />
    )
  }
  return <MonoText onPress={() => setIsInput(true)}>{ titles[note] }</MonoText>
};

export default NoteTitle;

import {Input, View} from "./Themed";
import Colors from "../constants/Colors";
import {useEffect} from "react";
import {useNotes} from "../hooks/useNotes";

export default function NoteEditor({noteId}: { noteId: string }) {
  const { data, setText } = useNotes();
  const currentNote = data.notes[noteId]

  useEffect(() => {
    if (!data.uuids.includes(noteId)) {
      console.error(`Note with id ${noteId} is not presented in the current list of nodes. Please provide a correct id prop`);
    }
  }, []);


  const onTextInput = (text: string) => {
    setText(noteId, text);
  }

  return (
    <View style={{
      flex: 1
    }}>
      <Input
        value={currentNote?.text ?? ''}
        darkColor={Colors.dark.background}
        lightColor={Colors.light.background}
        fontFamily={'SpaceMono'}
        onChangeText={onTextInput}
        multiline={true}
      />
    </View>
  )
}

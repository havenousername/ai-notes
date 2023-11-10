import {useLocalSearchParams} from "expo-router";
import {useNotes} from "./useNotes";


export const useCurrentNote = () => {
  const { createNote } = useNotes();
  const { note } = useLocalSearchParams();
  const uuid = typeof note === 'string' ? note : createNote();
  return uuid;
}

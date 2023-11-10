import NoteEditor from "../components/NoteEditor";
import {useCurrentNote} from "../hooks/useCurrentNote";


const Note = () => {
  const note = useCurrentNote();
  return (<NoteEditor noteId={note} />);
};

export default Note;

import {useContext, useEffect, useState} from "react";
import {defaultNotesContext, FunctionalNoteContext, NoteContext, NotesContext} from "../contexts/notes.context";
import "react-native-get-random-values"
import {v4} from "uuid";
export const defaultTitle = 'Untitled' as const;

export const useCreateNotes = () => {
  const [notes, setNotes] = useState<NoteContext>(defaultNotesContext);

  const createNote: FunctionalNoteContext['createNote'] = () => {
    const newNoteUUID = v4();
    setNotes((oldNotes) => ({
      uuids: [...oldNotes.uuids, newNoteUUID],
      titles: {
        ...notes.titles,
        [newNoteUUID]: defaultTitle,
      },
      notes: {
        ...oldNotes.notes,
        [newNoteUUID]: {
          text: '',
          title: defaultTitle,
          meta: {
            updated: new Date().toISOString(),
            created: new Date().toISOString(),
          }
        }
      },
    }));

    return newNoteUUID;
  }

  const removeNote: FunctionalNoteContext['removeNote'] = (uuid: string) => {
    notes.uuids.filter(id => id !== uuid);
    const removedNote = {...notes.notes[uuid]}
    delete notes.notes[uuid];
    delete notes.titles[uuid];
    setNotes(notes);
    return removedNote
  }

  const setTitle: FunctionalNoteContext['setTitle'] = (uuid: string, title: string) => {
    setNotes(notes => {
      return {
        ...notes,
        titles: {
          ...notes.titles,
          [uuid]: title,
        }
      }
    })
  }

  const setText: FunctionalNoteContext['setText'] = (uuid: string, text: string) => {
    setNotes(notes => {
      return {
        ...notes,
        notes: {
          ...notes.notes, [uuid]: {
            ...notes.notes[uuid],
            meta: {
              updated: new Date().toISOString(),
              created: notes.notes[uuid].meta.created,
            },
            text: text
          }
        }
      }
    })
  }

  useEffect(() => {
    if (notes.uuids.length === 0) {
      createNote();
    }
  }, [])

  return {data: notes, setText, setTitle, createNote, removeNote, firstNote: notes.uuids[0] };
}


export const useNotes = () => useContext(NotesContext);

import {ValueOf} from "type-fest";
import {createContext} from "react";

type NoteContext = {
  uuids: string[],
  titles: Record<string, string>,
  notes: Record<string, {
    meta: { updated: string, created: string },
    title: string,
    text: string,
  }>
}

type FunctionalNoteContext ={
  data: NoteContext,
  createNote(): string,
  removeNote(uuid: string): NoteContext,
  setTitle(uuid: string, title: string): void,
  setText(uuid: string, text: string): void,
}

const NotesContext = createContext<NoteContext>({
  uuids: [],
  titles: {},
  notes: {}
});

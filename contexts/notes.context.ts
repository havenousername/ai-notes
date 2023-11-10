import {ValueOf} from "type-fest";
import {createContext} from "react";
import Note from "../app/[note]";

export type Note = {
  meta: { updated: string, created: string },
  title: string,
  text: string,
}

export type NoteContext = {
  uuids: string[],
  titles: Record<string, string>,
  notes: Record<string, Note>
}

export type FunctionalNoteContext ={
  data: NoteContext,
  createNote(): string,
  removeNote(uuid: string): Note,
  setTitle(uuid: string, title: string): void,
  setText(uuid: string, text: string): void,
}

export const defaultNotesContext = {
  uuids: [],
  titles: {},
  notes: {}
}

export const NotesContext = createContext<FunctionalNoteContext>({
  data: defaultNotesContext,
  createNote: () => '',
  removeNote: (uuid: string) => ({ meta: { updated: '', created: '' }, title: '', text: '' }),
  setText: (uuid: string, text: string)=> {},
  setTitle: (uuid: string, title: string)=> {},
});

import {createContext} from "react";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";


export type GlobalClick = { addEvent: (event: (e: GestureResponderEvent) => void) => void, events: ((e: GestureResponderEvent) => void)[] }
export const GlobalClickContext = createContext<GlobalClick>({
  addEvent(e) {
  },
  events: [],
})

import {MutableRefObject, useEffect} from "react";
import {AppState} from "react-native";
import EventManager from "react-native-gesture-handler/lib/typescript/web/tools/EventManager";
import {useGlobalClick} from "./useGlobalClick";


export const useClickOutside = (ref: MutableRefObject<unknown>, callback: () => void) => {
  const { addEvent  } = useGlobalClick();
  useEffect(() => {
    addEvent((e) => {
      if (ref.current !== e.target) {
        callback();
      }
    })
  }, []);
}

import {ReactNode, useState} from "react";
import {GlobalClick, GlobalClickContext} from "../contexts/global-click.context";
import {TouchableWithoutFeedback, View} from "react-native";
import {GestureResponderEvent} from "react-native/Libraries/Types/CoreEventTypes";


const GlobalEventLayout = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<GlobalClick['events']>([]);

  const fireEvents = (e: GestureResponderEvent) => {
    for (const event of events) {
      event(e);
    }
  }

  const addEvent: GlobalClick['addEvent'] = (event) => {
    setEvents(events => ([...events, event]))
  }

  return (
    <GlobalClickContext.Provider value={{ addEvent, events }}>
      <TouchableWithoutFeedback onPress={(e) => fireEvents(e)} accessible={false}>
        <View style={{ flex: 1 }}>
          { children }
        </View>
      </TouchableWithoutFeedback>
    </GlobalClickContext.Provider>
  );
};

export default GlobalEventLayout;

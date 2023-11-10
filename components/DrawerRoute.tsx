import {MaterialIcons} from "@expo/vector-icons";
import {Link, Route} from "expo-router";
import {View} from "./Themed";
import React, {useEffect} from "react";
import {DrawerNavigationHelpers} from "@react-navigation/drawer/src/types";
import {NoteContext} from "../contexts/notes.context";
import {useNavigation, useRoute} from "@react-navigation/core";
import Colors from "../constants/Colors";


export default ({uuid, navigation, titles}: {
  uuid: string,
  navigation: DrawerNavigationHelpers,
  titles: NoteContext['titles']
}) => {
  const route = useNavigation();

  // @ts-ignore
  const currentParam = route.getCurrentRoute()?.params?.note ?? ''
  const color = uuid === currentParam ? Colors.light.tint : 'black'

  useEffect(() => {
    console.log(navigation);
  }, [navigation]);

  return (
    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}} key={uuid}>
      <MaterialIcons name="sticky-note-2" size={24} color={color} />
      <Link
        href={{
          pathname: '/[note]',
          params: {
            note: uuid
          }
        }}
        onPress={() => navigation.closeDrawer()}
        style={{
          fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'SpaceMono',
          color
        }}
      >
        {titles[uuid]}
      </Link>
    </View>
  )
}

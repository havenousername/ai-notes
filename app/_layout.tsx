import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {Link, SplashScreen, useLocalSearchParams, useRouter} from 'expo-router';
import React, {useEffect, useState} from 'react';
import {useColorScheme, Text} from 'react-native';
import {NotesContext} from "../contexts/notes.context";
import {Drawer} from "expo-router/drawer";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import {DrawerContentComponentProps} from "@react-navigation/drawer/src/types";
import {useNavigation, useRoute} from "@react-navigation/core";
import {useCreateNotes, useNotes} from "../hooks/useNotes";
import NoteTitle from "../components/NoteTitle";
import GlobalEventLayout from "../components/GlobalEventLayout";
import {MaterialIcons} from '@expo/vector-icons';
import {View} from "../components/Themed";
import {useCurrentNote} from "../hooks/useCurrentNote";
import DrawerRoute from "../components/DrawerRoute";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav/>;
}


function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {data: {uuids, titles}, createNote} = useNotes();
  const router = useRouter();
  const [pushWait, setPushWait] = useState(false);
  const createNewNote = () => {
    createNote();
    setPushWait(true);
  }

  useEffect(() => {
    if (pushWait) {
      router.push({pathname: '/[note]', params: {note: uuids.at(-1) ?? ''}});
      setPushWait(false);
    }
  }, [uuids]);

  return (
    <DrawerContentScrollView style={{padding: 20}}
                             contentContainerStyle={{justifyContent: 'space-between', flex: 1}}  {...props}>
      <View>
        <Text style={{alignSelf: 'flex-start', fontSize: 18, fontWeight: 'bold', marginBottom: 20}}>Notes</Text>
        {/*<DrawerItem label="Website" onPress={() => Linking.openURL('https://www.expo.dev/')}/>*/}
        {
          uuids.map(uuid => (
            <DrawerRoute key={uuid} uuid={uuid} navigation={props.navigation} titles={titles}/>
          ))
        }
      </View>
      <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <MaterialIcons name="add-box" size={18} color="black"/>
        <Text style={{fontSize: 14}} onPress={() => createNewNote()}>Add new Note</Text>
      </View>
    </DrawerContentScrollView>
  );
}


function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const notes = useCreateNotes();
  const navigation = useNavigation();

  useEffect(() => {
    if (notes.firstNote) {
      // @ts-ignore
      navigation.navigate('[note]', {note: notes.firstNote});
    }
  }, [notes.firstNote]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GlobalEventLayout>
        <NotesContext.Provider value={notes}>
          <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name={'[note]'}
              options={{
                headerShown: true,
                headerTitle: () => <NoteTitle/>,
              }}
            />
          </Drawer>
        </NotesContext.Provider>
      </GlobalEventLayout>
    </ThemeProvider>
  );
}

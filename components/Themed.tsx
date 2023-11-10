/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
  TextInput as DefaultInput,
  TextInput
} from 'react-native';

import Colors from '../constants/Colors';
import {ForwardedRef, forwardRef} from "react";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  fontFamily?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type InputProps = ThemeProps & DefaultInput['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}



export const Input =  forwardRef((props: InputProps, ref: ForwardedRef<TextInput>) => {
  const { style, lightColor, darkColor, ...otherProps } = props as InputProps;
  const backgroundColor = useThemeColor( { light: lightColor, dark: darkColor }, 'background' )

  return (
    <TextInput ref={ref} style={[{ backgroundColor }, style, { fontFamily: 'SpaceMono' } ]} {...otherProps} />
  )
});

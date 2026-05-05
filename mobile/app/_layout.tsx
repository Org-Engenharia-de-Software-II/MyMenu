import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { appTheme } from '@/theme/appTheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <StyledThemeProvider theme={appTheme}>
      <NavigationThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        </Stack>
        <StatusBar style="light" />
      </NavigationThemeProvider>
    </StyledThemeProvider>
  );
}

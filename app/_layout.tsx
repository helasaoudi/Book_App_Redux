import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import DetailsBookScreen from './(tabs)/detailsbook';
import CartScreen from './(tabs)/CartScreen';
import { UserProvider } from './(tabs)/UserContext';
import IndexScreen from './(tabs)';
import BookList from './(tabs)/AdminBookList'; // Renommer AdminBookList si nécessaire
import BookForm from './(tabs)/BookForm';
import AddBook from './(tabs)/BookForm';
import AddBookScreen from './(tabs)/BookForm';
import BookListScreen from './(tabs)/AdminBookList';
import BookListAdmin from './(tabs)/AdminBookList';

SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Le Stack.Navigator contient uniquement les Screens */}
        <Stack.Navigator initialRouteName="BookList">
          {/* L'écran "BookList" sera la première page affichée */}
          <Stack.Screen name="BookList" component={BookListScreen} />
          <Stack.Screen name="BookListAdmin" component={BookListAdmin} />
          <Stack.Screen name="DetailsBook" component={DetailsBookScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="AddBook" component={AddBookScreen} options={{ title: "Ajouter / Modifier un livre" }} />
        </Stack.Navigator>
      </ThemeProvider>
      {/* Le StatusBar est placé après le ThemeProvider */}
      <StatusBar style="auto" />
    </UserProvider>
  );
}

import { View, Text, Image, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export default function IndexScreen({ navigation }: { navigation: any }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    setTimeout(() => {
      setIsLoading(false);
      SplashScreen.hideAsync(); 
      navigation.replace('BookList');  
    }, 2000); 
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Image source={require('@/assets/images/books.jpeg')} style={styles.image} />
        <Text style={styles.text}>Welcome To BookApp</Text>
      </View>
    );
  }

  return null; 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  text: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

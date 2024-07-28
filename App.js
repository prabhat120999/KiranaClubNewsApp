import React, {useState, useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import SplashScreen from './src/components/SplashScreen';
import AppNavigator from './src/navigation/AppNavigator';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => {
          setIsLoading(false);
      }, 3000);
  }, []);

  if (isLoading) {
      return <SplashScreen />;
  }

  return (
      <View style={styles.container}>
          <AppNavigator />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});

import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  const checkStorage = async () => {
    try{
      const total = await AsyncStorage.getItem('@total');
      const longest = await AsyncStorage.getItem('@longest');
      if(total == undefined){
        await AsyncStorage.setItem('@total',"0")
      }
      if(longest == undefined){
        await AsyncStorage.setItem('@longest',"0")
      }
    }catch{
      alert('Error Using Storage, please reload App')
    }
  }

  checkStorage();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

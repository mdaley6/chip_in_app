import React from 'react';
import { Button, FlatList, Pressable, StyleSheet } from 'react-native';
import AllChips from '../components/AllChips';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chip Ins</Text>
        <AllChips></AllChips>
        <View style={{flexDirection: 'row',borderWidth:2,minWidth:'100%',justifyContent:'space-around'}}>
        <ChipTotals total={9} longest={104}></ChipTotals>{/*Need these to be real*/}
        <Button title="Add Chip" onPress={() => navigation.navigate('Modal')}/>
        </View>
    </View>
  );
}

const ChipTotals = (props: any) => {
  return (
      <View> 
          <Text>Total: {props.total}</Text>
          <Text>Longest: {props.longest}</Text>
      </View>
  );
};

// const AddChip = ({navigation}) => {
//   //use state hooks here
//   return (
//       // <Button title="Add Chip In" onPress={handleAddChip}/>
//       <Button title="Add Chip"
//       onPress={() =>
//         navigation.navigate('Profile', { name: 'Jane' })
//       }/>
//   );
// };

const handleAddChip = () =>{
  console.log("add chip")
  return (
    <Text>Fucks</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  title: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:'blue',
    borderWidth: 2,
    borderColor:'lightblue',
    padding:2,
  },
  chip:{
  },
});

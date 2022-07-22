import React, { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllChips from '../components/ChipList';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { getTotals } from '../Api';


export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  const [total , setTotalChips] = useState(0);
  const [longest, setLongestChip] = useState(0);

  useEffect(() => {
    getTotals().then((totals) => { 
      setTotalChips(totals.total)
      setLongestChip(totals.longest)})
  })


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chip Ins</Text>
        <AllChips></AllChips>
        <View style={styles.midPage}>
        <ChipTotals total={total} longest={longest}></ChipTotals>{/*Need these to be real*/}
        <Button title="Add Chip" onPress={() => navigation.navigate('AddChip')}/>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding:1,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color:'blue',
    borderWidth: 3,
    borderColor:'goldenrod',
    padding:2,
  },
  chip:{
  },
  midPage:{
    flexDirection: 'row',
    borderWidth:2,
    minWidth:'100%',
    justifyContent:'space-around'
  },  
});


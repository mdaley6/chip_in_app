import React, { useState } from 'react';
import { StyleSheet, TextInput,Button } from 'react-native';
import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootTabScreenProps } from '../types';

export default function AddChip({ navigation }: RootTabScreenProps<'Home'>) {
  const [course,setCourse] = useState('');
  const [club,setClub] = useState('');
  const [distance,setDistance] = useState('');
  const [score,setScore] = useState('');
  const [par,setPar] = useState('');

  //determine the golf score based on the par
  const getScore = () => {
    const diff = parseInt(score) - parseInt(par);
    if(diff == 0){
      return "par"
    }
    else if(diff == -1){
      return "birdie"
    }
    else if(diff == -2 ){
      return "eagle"
    }
    else if(diff == 1){
      return "bogey"
    }
    else{
      return "double"
    }
  }

  function addChipIn() {
    //need to do better form validation
    if(course === ''||score === ''|| club === ''|| distance ===''||par === ''){
      alert('Please enter all fields before trying to save the shot');
    }
    else{
      storeChip();
    }
    navigation.navigate('Home')
  }

  //store function for chip ins
  const storeChip = async () => {
    try {
      const total = await AsyncStorage.getItem('@total');
      const longest = await AsyncStorage.getItem('@longest');
      
      //save the chip & iterate total
      if(total != null){
        let totalAsInt = parseInt(total);
        await AsyncStorage.setItem('@total',String(totalAsInt+1))
        await AsyncStorage.setItem('@chip'+(totalAsInt+1)+'course', course)
        await AsyncStorage.setItem('@chip'+(totalAsInt+1)+'club', club)
        await AsyncStorage.setItem('@chip'+(totalAsInt+1)+'distance', distance)
        await AsyncStorage.setItem('@chip'+(totalAsInt+1)+'score', getScore())
        await AsyncStorage.setItem('@chip'+(totalAsInt+1)+'par', par)
      }
      //maybe update longest
      if(longest != null && distance > longest){
        await AsyncStorage.setItem('@longest', distance)
      }
      alert("New Chip Saved")
    } catch (e) {
      alert("Error Saving Chip")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Chip In</Text>
      <Text>Course</Text>
      <TextInput
        style={styles.input}
        value={course}
        placeholder='Course Name'
        onChangeText={setCourse}
      />
      <Text>Club</Text>
      <TextInput
        style={styles.input}
        value={club}
        placeholder='Club Used'
        onChangeText={setClub}
      />
      <Text>Distance</Text>
      <TextInput
      // Needs to be numerics (could make this buttons u need to press one)
        style={styles.input}
        value={distance}
        placeholder='Distance (Yards)'
        onChangeText={setDistance}
      />
      <Text>Score</Text>
      <View style={styles.buttonRow}>
        <Button onPress={() => setScore("1")} title="1" color={score == "1" ? 'red' : 'green'}/>
        <Button onPress={() => setScore("2")} title="2" color={score == "2" ? 'red' : 'green'}/>
        <Button onPress={() => setScore("3")} title="3" color={score == "3" ? 'red' : 'green'}/>
        <Button onPress={() => setScore("4")} title="4" color={score == "4" ? 'red' : 'green'}/>
        <Button onPress={() => setScore("5")} title="5" color={score == "5" ? 'red' : 'green'}/>
        <Button onPress={() => setScore("6")} title="6" color={score == "6" ? 'red' : 'green'}/>
        <Button onPress={() => setScore("7")} title="7" color={score == "7" ? 'red' : 'green'}/>
      </View>
      <Text>Par</Text>
      <View style={styles.buttonRow}>
        <Button onPress={() => setPar("3")} title="3" color={par == "3" ? 'red' : 'green'}/>
        <Button onPress={() => setPar("4")} title="4" color={par == "4" ? 'red' : 'green'}/>
        <Button onPress={() => setPar("5")} title="5" color={par == "5" ? 'red' : 'green'}/>
      </View>
      <Button onPress={addChipIn} title="Add Chip In"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input:{
    height:30,
    width:250,
    borderWidth: 2,
  },
  buttonRow: {
    borderWidth: 2,
    width: 250,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreButton: {
    borderWidth: 2,
  }
});

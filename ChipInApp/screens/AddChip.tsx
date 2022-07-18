import React, { useState } from 'react';
import { StyleSheet, TextInput,Button } from 'react-native';
import { Text, View } from '../components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddChip() {
  //need to do some form validation
  const [course,setCourse] = useState('');
  const [club,setClub] = useState('');
  const [distance,setDistance] = useState('');
  const [score,setScore] = useState('');
  const [par,setPar] = useState('');

  function addChipIn() {
    if(course === ''||score === ''|| club === ''|| distance ===''||par === ''){
      alert('Please enter all fields before trying to save the shot');
    }
    else{
      //store chip as JSON
      var chip = new Object({course: course, club: club,distance : distance,score: score,par: par});
      storeData(chip);
      }
    //TODO: route user back to home page
    }

  //store function for chip ins
  const storeData = async (chip: object) => {
    try {
      const jsonValue = JSON.stringify(chip)
      //TODO: Set a good key & clear the old storage with shit (@chip1key)
      await AsyncStorage.setItem('@chip'+1, jsonValue)
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

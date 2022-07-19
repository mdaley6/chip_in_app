import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chip = (props: any) =>  {
    return (
        <View style={styles.chip}>
            <View>
                <Text style={styles.text}>Chip In # {props.number}</Text>
                <Text style={styles.text}>Club: {props.club}</Text>
                <Text style={styles.text}>Yards: {props.distance}</Text>
                <Text style={styles.text}>Course: {props.course}</Text>
                <Text style={styles.text}>For: {props.score}</Text>
            </View>
            <Button title="Edit" onPress={() => handleEdit(props.number)}/>
        </View>
    );
};

//need to actually implement this
const handleEdit = (id: number) => {
    console.log("edit " + id);
}



// for(let i = 0; i < keys.length; i++){
//     const chipString = await AsyncStorage.getItem(keys[i]);
//     const chipObject = chipString != null ? JSON.parse(chipString) : null
//     chips.push(<Chip key={i} number={i} club={chipObject.club} distance={chipObject.distance} course={chipObject.course} score={score + ' ('+chipObject.score+')'}/>)
// }


const AllChips = () => {
    const [total,setTotal] = useState(0);
    const [chipArray,setChipArray] = useState([]);

    var chipData: { key: { i: number; }; number: { i: number; }; club: { club: string | null; }; distance: { distance: string | null; }; course: { course: string | null; }; score: { score: string | null; }; }[] = [];

    const getTotal = async () => {
        let total = await AsyncStorage.getItem('@total')
        total == null ? null : setTotal(parseInt(total))
    }
    const setChipData = async () => {
        for(let i = 1; i < total+1; i++) {
            let course = await AsyncStorage.getItem('@chip'+i+'course')
            let club = await AsyncStorage.getItem('@chip'+i+'club')
            let distance = await AsyncStorage.getItem('@chip'+i+'distance')
            let score = await AsyncStorage.getItem('@chip'+i+'score')
            let par = await AsyncStorage.getItem('@chip'+i+'par')
            console.log("adding chip comp" + i)
            chipData.push({key:{i}, number:{i}, club:{club}, distance:{distance}, course:{course}, score:{score}})
        }
        //console.log(chipData[0])
        setChipArray(chipData)
    }
    setChipData();
    getTotal();
    
    //console.log(chipData[0])

    return (
        <ScrollView style={styles.allChips}>
          {chipArray.length == 0 ? <Text>No Chip-ins Yet</Text>:
          chipArray.map((data,key) => (
              <Chip key={key}/>
          ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    chip: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 2,
        borderWidth:1,
        width:'100%'
    },
    allChips:{
        width: '100%',
    },
    text:{
        fontSize:15,
    }
  });

export default AllChips;


// var chips = [<Chip key="1" number={1} club='60 degree' distance={87} course='Shannopin' score='Birdie (3)'/>,
//              <Chip key="2" number={2} club='54 degree' distance={18} course='South Park' score='Birdie (4)'/>,
//              <Chip key="3" number={3} club='54 degree' distance={12} course='Shannopin' score='Par (4)'/>,
//              <Chip key="4" number={4} club='60 degree' distance={25} course='Moon' score='Birdie (2)'/>,
//              <Chip key="5" number={5} club='60 degree' distance={43} course='Shannopin' score='Bogey (5)'/>,
//              <Chip key="6" number={6} club='p wedge' distance={19} course='Grandview' score='Eagle (3)'/>,
//              <Chip key="7" number={7} club='a wedge' distance={32} course='Westwood' score='Birdie (4)'/>,
//              <Chip key="8" number={8} club='60 degree' distance={104} course='Ponderosa' score='Par (5)'/>,
//              <Chip key="9" number={9} club='60 degree' distance={19} course='Shannopin' score='Birdie (3)'/>];
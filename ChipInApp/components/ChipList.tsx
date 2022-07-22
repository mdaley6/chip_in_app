import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView, TouchableOpacity } from 'react-native';
import { getAllChipData } from '../Api';


const Chip = (props: {number: number, course: string, club:string, distance:string, score:string }) =>  {
    var color = 'black'
    if(props.score == 'Eagle') color = 'limegreen'
    if(props.score == 'Birdie') color = 'green'
    if(props.score == 'Bogey') color = 'red'
    if(props.score == 'Double') color = 'darkred'

    return (
        <View style={styles.chip}>
        <View style={styles.chipSub}>
            <Text style={styles.number}>{props.number}</Text>
            <View>
                <Text style={styles.text}>Club: {props.club}</Text>
                <Text style={styles.text}>Yards: {props.distance}</Text>
                <Text style={styles.text}>Course: {props.course}</Text>
                <Text style={styles.text}>For: <Text style={{color: color}}>{props.score}</Text></Text>
            </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleEdit(props.number)}>
            <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        </View>
    );
};

//need to actually implement this
const handleEdit = (id: number) => {
    console.log("edit " + id);
    //get the data for this chip 
    //allow them to overwrite it (may need an edit screen or pop up)
}

export const ChipList = () => {
    const [chips, setChips] = useState<{club: string, distance: string, course: string, score: string}[]>([]);

    useEffect(()=>{
        getAllChipData().then((value) => {value == undefined ? setChips([]) : setChips(value)}).catch((err) => {console.log(err)})
    },[])
    
    return (
        <ScrollView style={styles.allChips}>
            {/* {chippers} */}
            { chips.length == 0 ? <Text>No Chip Ins</Text> : chips.map((data,index) => {
                return <Chip key={index+1} number={index+1} course={data.course} club={data.club} distance={data.distance} score={data.score}/>
            }) }
            
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
        borderBottomWidth:1,
        borderColor:'blue',
        width:'100%'
    },
    chipSub: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 2,
    },
    allChips:{
        width: '100%',
    },
    text:{
        fontSize:15,
    },
    number:{
        fontSize:25,
        //fontWeight: 'bold',
        borderWidth:2,
        borderColor: 'gold',
        borderRadius: 10,
        color:'blue',
        padding:6,
        marginLeft:3,
        marginRight:30,
       // backgroundColor:'blue',
        overflow: 'hidden'
    },
    button:{
        borderWidth: 2,
        borderColor:'gold',
        padding: 5,
        borderRadius: 10,
        marginRight:4,
    },
    buttonText:{
        fontSize:18,
        color:'#448ff2',
    }
  });

export default ChipList;
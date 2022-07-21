import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chip = (props: {number: number, course: string, club:string, distance:string, score:string }) =>  {
    var color = 'black'
    if(props.score == 'Eagle') color = 'limegreen'
    if(props.score == 'Birdie') color = 'green'
    if(props.score == 'Bogey') color = 'red'
    if(props.score == 'Double') color = 'darkred'

    return (
        <View  style={styles.chip}>
        <View  style={styles.chipSub}>
            <Text style={styles.number}>{props.number}</Text>
            <View>
                <Text style={styles.text}>Club: {props.club}</Text>
                <Text style={styles.text}>Yards: {props.distance}</Text>
                <Text style={styles.text}>Course: {props.course}</Text>
                <Text style={styles.text}>For: <Text style={{color: color}}>{props.score}</Text></Text>
            </View>
        </View>
        <Button title="Edit" onPress={() => handleEdit(props.number)}/>
        </View>
    );
};

//need to actually implement this
const handleEdit = (id: number) => {
    console.log("edit " + id);


}

interface AllChipProps {
	chipData9: {club: string, distance: string, course: string, score: string}[];
}

export const AllChips = () => {
    const [chips, setChips] = useState<{club: string, distance: string, course: string, score: string}[]>([]);

    useEffect(()=>{
        getServerSideProps().then((value) => {value == undefined ? setChips([]) : setChips(value)}).catch((err) => {console.log(err)})
    },[])

    console.log("All Chips Fired") 
    
    return (
        <ScrollView style={styles.allChips} onScrollToTop={getServerSideProps}>
            {/* {chippers} */}
            { chips.length == 0 ? <Text>No Chip Ins</Text> : chips.map((data,index) => {
                return <Chip key={index+1} number={index+1} course={data.course} club={data.club} distance={data.distance} score={data.score}/>
            }) }
            
        </ScrollView>
    );
};

//instead of this need to useEffect??
export const getServerSideProps = async () => {
    console.log("getServerSideProps")
    let totalChips = await AsyncStorage.getItem('@total').then((total) => { 
            return total !== null ? parseInt(total) : 0
    })

    var chipData: {club: string, distance: string, course: string, score: string}[] | undefined;
    if(totalChips > 0){
        for(let i = 1;i < totalChips+1; i++){

            let course = await AsyncStorage.getItem('@chip'+i+'course')
            let club = await AsyncStorage.getItem('@chip'+i+'club')
            let distance = await AsyncStorage.getItem('@chip'+i+'distance')
            let score = await AsyncStorage.getItem('@chip'+i+'score')
            //let par = await AsyncStorage.getItem('@chip'+i+'par')

            Promise.all([course,club,distance,score]).then((values) => {
              if(club != null && course != null && distance != null && score != null){
                    if(chipData === undefined){
                        chipData = [{club:club, distance:distance, course:course, score:score}];
                    }
                    else{
                        chipData.push({club:club, distance:distance, course:course, score:score})
                    }
                }
            })
      
          }
          if(chipData !== undefined){
            return chipData
          }
    }
}

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
        borderWidth:2,
        borderColor: 'blue',
        borderRadius: 10,
        padding:6,
        marginLeft:3,
        marginRight:30,
        backgroundColor:'gainsboro',
        overflow: 'hidden'
    }
  });

export default AllChips;
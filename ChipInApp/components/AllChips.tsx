import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chip = (props: {number: number, course: string, club:string, distance:string, score:string }) =>  {
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

interface AllChipProps {
	chipData9: {club: string, distance: string, course: string, score: string}[];
}

export const AllChips = () => {
    const [chips, setChips] = useState<{club: string, distance: string, course: string, score: string}[]>([]);
    //console.log(chipData)

    var chipData2 = getServerSideProps().then((value) => {value == undefined ? setChips([]) : setChips(value)}).catch((err) => {console.log(err)})

    var chippers: JSX.Element[];

    // useEffect(() => {
    //     getServerSideProps();
    //     return () => {
    //       setChips([]); // This worked for me
    //     };
    // }, []);

    if(chipData2 != undefined){
        //setChips(chipData2)
        // chippers = chipData2.map((data,key) => {
        //     return <Chip key={key} number={key} course={data.course} club={data.club} distance={data.distance} score={data.score}/>
        // })
        //console.log(chippers)
    }else{
        chippers = [<Text>Nuts</Text>]
    }

    console.log(typeof chipData2) //


    
    return (
        <ScrollView style={styles.allChips}>
            {/* {chippers} */}
            { chipData2 == undefined ? <Text>Nuts</Text> : chips.map((data,index) => {
                return <Chip key={index} number={index} course={data.course} club={data.club} distance={data.distance} score={data.score}/>
            }) }
            
        </ScrollView>
    );
};

    //instead of this need to useEffect??
export const getServerSideProps = async () => {
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
            console.log("adding chip comp" + i)
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
    allChips:{
        width: '100%',
    },
    text:{
        fontSize:15,
    }
  });

export default AllChips;
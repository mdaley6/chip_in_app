import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';



const Chip = (props: any) =>  {
    //distance
    // club: string = '60 degree';
    // course: string = 'Shannopin';
    // score: string = 'birdie';

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

const handleEdit = (id: number) => {
    console.log("edit " + id);
}

//need to use a real db eventually
var chips = [<Chip key="1" number={1} club='60 degree' distance={87} course='Shannopin' score='Birdie (3)'/>,
             <Chip key="2" number={2} club='54 degree' distance={18} course='South Park' score='Birdie (4)'/>,
             <Chip key="3" number={3} club='54 degree' distance={12} course='Shannopin' score='Par (4)'/>,
             <Chip key="4" number={4} club='60 degree' distance={25} course='Moon' score='Birdie (2)'/>,
             <Chip key="5" number={5} club='60 degree' distance={43} course='Shannopin' score='Bogey (5)'/>,
             <Chip key="6" number={6} club='p wedge' distance={19} course='Grandview' score='Eagle (3)'/>,
             <Chip key="7" number={7} club='a wedge' distance={32} course='Westwood' score='Birdie (4)'/>,
             <Chip key="8" number={8} club='60 degree' distance={104} course='Ponderosa' score='Par (5)'/>,
             <Chip key="9" number={9} club='60 degree' distance={19} course='Shannopin' score='Birdie (3)'/>];



const AllChips = () => {
    const num_chips = chips.length;
    return (
        <ScrollView style={styles.allChips}>
            {chips}
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    chip: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        //   justifyContent: 'center',
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
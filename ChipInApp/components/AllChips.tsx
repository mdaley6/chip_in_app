import React, { Component } from 'react';
import { Text, View } from 'react-native';

const Chip = (props: any) =>  {
    //distance
    // club: string = '60 degree';
    // course: string = 'Shannopin';
    // score: string = 'birdie';

    return (
        <View> 
            <Text>Chip In # {props.number}</Text>
            <Text>Club: {props.club}</Text>
            <Text>Yards: {props.distance}</Text>
            <Text>Course: {props.course}</Text>
            <Text>For: {props.score}</Text>
            <Text>Edit Button</Text>
        </View>
    );
};

const AllChips = () => {
        return (
            <View>
                <Chip number={1} club='60 degree' distance={87} course='Shannopin' score='birdie'/>
                <Chip number={2} club='54 degree' distance={13} course='Moon' score='bogey'/>
                <Chip/>
            </View>
        );
};

export default AllChips;
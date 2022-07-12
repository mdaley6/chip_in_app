import React, { Component } from 'react';
import { Text, View } from 'react-native';

const ChipTotals = (props: any) => {
    return (
        <View> 
            <Text>Chip Totals: {props.total}</Text>
            <Text>Longest: {props.longest}</Text>
        </View>
    );
};


export default ChipTotals;
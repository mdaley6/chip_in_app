import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getAllChipData, getTotals } from '../Api';

import { Text, View } from '../components/Themed';

//Eventaully let them do stats in a time period or other filters


export default function StatsScreen() {

  const [total , setTotalChips] = useState(0);
  const [longest, setLongestChip] = useState(0);
  const [chipData, setChips] = useState<{club: string, distance: string, course: string, score: string}[]>([]);
  const [average, setAverageChip] = useState(0);

  useEffect(()=>{
      getAllChipData().then((value) => {value == undefined ? setChips([]) : setChips(value)}).catch((err) => {console.log(err)})
  },[])

  useEffect(() => {
    getTotals().then((totals) => { 
      setTotalChips(totals.total)
      setLongestChip(totals.longest)})
  })

  //do all the stats here (make new fn)
  if(chipData.length > 0){
    var avg = 0;
    for(let i = 0; i < chipData.length; i++){
      avg += parseInt(chipData[i].distance)
    }
    if(average == 0) setAverageChip(avg/chipData.length)
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text>Total: {total}</Text>
        <Text>Total distance:</Text>
        <Text>Average Distance: {average}</Text>
        <Text>Longest: {longest}</Text>
        <Text>Score Stats</Text>
        <Text>Double's: </Text>
        <Text>Bogeys:</Text>
        <Text>Pars:</Text>
        <Text>Birdies:</Text>
        <Text>Eagles:</Text>
        <Text>Club Stats</Text>
        <Text>Course Stats:</Text>
        <Text>Some Hole Stats??</Text>      
      </View>
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
  stats: {
    flex:1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth:1,
    width:'80%',
  }
});

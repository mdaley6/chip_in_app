import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { getAllChipData, getTotals } from '../Api';

import { Text, View } from '../components/Themed';

//Eventaully let them do stats in a time period or other filters


export default function StatsScreen() {

  const [total , setTotalChips] = useState(0);
  const [longest, setLongestChip] = useState(0);
  const [chipData, setChips] = useState<{club: string, distance: string, course: string, score: string}[]>([]);
  const [averageDist, setAverageDist] = useState(0);
  const [totalDist, setTotalDist] = useState(0);
  const [doubles, setDoubles] = useState(-1);
  const [bogeys, setBogeys] = useState(-1);
  const [pars, setPars] = useState(-1);
  const [birdies, setBirdies] = useState(-1);
  const [eagles, setEagles] = useState(-1);
  

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
    var cumulative=0,dubs=0,bogs=0,par=0,bird=0,eag = 0;
    for(let i = 0; i < chipData.length; i++){
      cumulative += parseInt(chipData[i].distance)
      if(chipData[i].score == 'Double') dubs += 1
      else if(chipData[i].score == 'Bogey') bogs += 1
      else if(chipData[i].score == 'Par') par += 1
      else if(chipData[i].score == 'Birdie') bird += 1
      else if(chipData[i].score == 'Eagle') eag += 1

      console.log(chipData[i].club)
    }
    //idk if this is the way to do this (like initial set state to -1 and update ?)
    if(averageDist == 0) setAverageDist(cumulative/chipData.length)
    if(totalDist == 0) setTotalDist(cumulative)
    if(doubles == -1) setDoubles(dubs)
    if(bogeys == -1) setBogeys(bogs)
    if(pars == -1) setPars(par)
    if(birdies == -1) setBirdies(bird)
    if(eagles == -1) setEagles(eag)
    
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text style={styles.heading}>Overview</Text>
        <Text style={styles.stat}>Total: {total}</Text>
        <Text style={styles.stat}>Total Distance: {totalDist}</Text>
        <Text style={styles.stat}>Average Distance: {averageDist}</Text>
        <Text style={styles.stat}>Longest: {longest}</Text>
        <Text style={styles.heading}>Score Stats</Text>
        <Text style={styles.stat}>Doubles: {doubles}</Text>
        <Text style={styles.stat}>Bogeys: {bogeys}</Text>
        <Text style={styles.stat}>Pars: {pars}</Text>
        <Text style={styles.stat}>Birdies: {birdies}</Text>
        <Text style={styles.stat}>Eagles: {eagles}</Text>
        <Text style={styles.stat}>Club Stats</Text>
        <Text style={styles.stat}>Course Stats:</Text>
        <Text style={styles.stat}>Some Hole Stats??</Text>      
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'gray',
  },
  stats: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width:'80%',
    backgroundColor:'lightgray',
  },
  stat:{
    fontSize: 20,
    fontWeight: '500',
    color:'gold',
    backgroundColor:'dodgerblue',
    borderRadius: 10,
    overflow: 'hidden',
    padding:4,
    marginTop: 6,
    width:'80%',
  },
  heading: {
    fontSize:30,
    fontWeight: '700',
    marginTop:15, 
  },
});

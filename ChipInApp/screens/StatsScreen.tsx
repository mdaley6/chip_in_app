import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

//Eventaully let them do stats in a time period or other filters


export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.stats}>
        <Text>Total:</Text>
        <Text>Total distance:</Text>
        <Text>Average Distance</Text>
        <Text>Longest: </Text>
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

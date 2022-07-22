
import AsyncStorage from "@react-native-async-storage/async-storage";

//Basically made an API To AsynchStorage, lol
export const getAllChipData = async () => {
    console.log("Running getAllChipData")
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
  
  export const getTotals = async () => {
  
    var totals = {total: 0, longest: 0};
  
    console.log("Running getTotals")
    //get total chips
    await AsyncStorage.getItem('@total').then((total) => {
      if(total !=  null) totals.total = parseInt(total)
    }).catch(() => {
      alert("Error retrieving total chip-ins")
    })
    //get longest chip
    await AsyncStorage.getItem('@longest').then((longest) => {
      if(longest !=  null) totals.longest = parseInt(longest)
    }).catch(() => {
      alert("Error retrieving longest chip")
    })
  
    return totals
  }
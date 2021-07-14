import React, {  useEffect } from 'react';
import { View, ActivityIndicator,Text } from 'react-native';
import ScreenNavigator from './screens/ScreenNavigator';

const App=()=>{
  const[isLoading,setIsLoading]=React.useState(true);
useEffect(()=>{
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
},[]);



if(isLoading){
  return(
<View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
  <Text>Loading..</Text>
<ActivityIndicator  color="red" size="large"/>
  
</View>

  );

}

return(
<ScreenNavigator/>

);

}
export default App


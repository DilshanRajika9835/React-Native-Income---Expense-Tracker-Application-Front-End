
import { View ,ImageBackground,StyleSheet} from 'react-native';
import {Button,Text} from 'native-base';
import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';

export default function ViewScreen(props) {

  const getData = async () => {
    try {
       let jsonValue = await AsyncStorage.getItem('LoginData')
      if(jsonValue!=null){
        let  user = await JSON.parse(jsonValue);
    
         if(user.nic!=null){
            props.navigation.navigate('HomeScreen');
         }else{
         props.navigation.navigate('SignIn');
          }
      }else{
        props.navigation.navigate('SignIn');
        }
    } catch(e) {
      console.log("error"+e);
    }
  }

  
  return (
    <ImageBackground source={require('../assert/MainWallPaper.jpg')} style={styles.imgBackground}>
   
      <Animatable.View style={styles.view1}
      
      animation="fadeInUp" 
    

      >
        <View style={styles.view1}>
        <Text style={styles.header}>Welcome!</Text>
        <Text style={styles.subheader}>Income Expense Tracker</Text>
        <Text style={styles.caption}>Saving provides a financial “backstop” for life's uncertainties and increases feelings of security and peace of
           mind. Once an adequate emergency fund is established, savings can also provide the “seed money” for higher-yielding investments such as stocks, bonds, and mutual funds.</Text>
        </View>
      <View style={styles.view2}>
      <Button rounded  style={styles.btn} 
             onPress={()=>{
                  getData()
           }}
             ><Text style={styles.txt}  > GET START  </Text></Button>
      </View>
      </Animatable.View>
      </ImageBackground>
  )
}


const styles=StyleSheet.create({
imgBackground:{
  flex:1,
  resizeMode: "cover",
  justifyContent: "center",
  
},
view1:{
  flex:4
},
view2:{
  flex:1
},
btn:{   alignSelf:"center",
backgroundColor:"#2376eb"
},
txt:{
  textAlign:"center",
  width:200,
  fontWeight: "bold",
  fontSize:15
},
header:{
  color:"#f2f2f2",
  alignSelf:"center",
  fontSize:40,
  marginHorizontal:10,
  textAlign:"center",
  marginTop:35,
  fontWeight:"600",
  fontWeight: "bold",
},
caption:{
color:"white",
marginTop:120,
alignSelf:"center",
textAlign:"center",
marginHorizontal:10,
fontWeight:"200",
fontWeight: "bold",

},
subheader:{
  color:"#10a3cc",
  alignSelf:"center",
  fontSize:35,
  marginHorizontal:10,
  textAlign:"center",
  fontWeight:"600",
  fontWeight: "bold",
}

});


// export default class ViewScreen extends Component {
//   constructor(props){
//     super(props)
//    this.state={
//     username:'',
//       nic:'',
//       password:''
//     }
//   }

//   getData = async () => {
//     console.log("Get Method Call");
//     try {
//        let jsonValue = await AsyncStorage.getItem('LoginData')
//       if(jsonValue!=null){
//         let  user = await JSON.parse(jsonValue);
    
//          if(user.nic=="1212V"){
//             this.props.navigation.navigate('HomeScreen');
//          }else{
//           this.props.navigation.navigate('SignIn');
//           }
//       }else{
//         this.props.navigation.navigate('SignIn');
//         }
//     } catch(e) {
//       console.log("error"+e);
//     }
//   }
//   render() {

//   return(
//     <ImageBackground source={require('../assert/Imgmain.jpg')} style={styles.imgBackground}>
   
//       <Animatable.View style={styles.view1}
      
//       animation="fadeInUp" 
    

//       >
//         <View style={styles.view1}>
//         <Text style={styles.header}>Welcome Money Saving App</Text>
//         </View>
//       <View style={styles.view2}>
//       <Button rounded  style={styles.btn} 
//              onPress={
//              this.getData.bind(this)
//            }
//              success><Text style={styles.txt}  > GET START  </Text></Button>
//       </View>
//       </Animatable.View>
//       </ImageBackground>
//   ); 
    
//   }
// }
import { TextInput,Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView,ImageBackground, StyleSheet, View, ScrollView ,Alert} from "react-native";
import React, { Component } from 'react'
import {Button,Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
export default function SignIn(props) {

  const state = {
    token:'',
    username:'',
    nic:'',
    password:'',
    conformpassword:'',
  }

   const storeData = async (value) => {
    try {
      let  jsonValue = JSON.stringify(state)
      await AsyncStorage.setItem('LoginData',jsonValue)
    } catch (e) {
      console.log("error"+e);
    }
  }

 const getData = async () => {

    try {
       let jsonValue = await AsyncStorage.getItem('LoginData')
      if(jsonValue!=null){
        let  user = await JSON.parse(jsonValue);
         if(user.nic!=null){
            props.navigation.navigate('HomeScreen');
         }
      }
    } catch(e) {
      console.log("error"+e);
    }
  }
  getData();

const checkUser=()=>{

  fetch('http://192.168.8.112:3000/customer/find', {
    method: 'GET',
    headers: {
      'nic':state.nic,
      'password':state.password
     
    }
  })
  .then((response) => response.json())
  .then((json) => {
        if(state.nic==json.user[0].nic && state.password==json.user[0].password){
          storeData()
          props.navigation.navigate('HomeScreen')
        }else{
         LoginAlert()
        }

    })
    .catch(error=>{
      LoginAlert();
    } )
}
  
const LoginAlert = () =>{
  Alert.alert(
    "Alert!",
    "invalid NIC or password? please enter valid NIC or password! ",
    [
     
      { text: "OK",
       onPress: () =>{
        console.log("Ok Pressed")

      }}
    ]
  );
  }

    return (
      <View style={styles.container}  >
      <ImageBackground source={require('../assert/homeImg.jpg')} style={styles.image}>
   
      <KeyboardAvoidingView
       behavior="padding"
       
        style={styles.container1}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animatable.View style={styles.inner}
              animation="fadeInUp" >
      
            <Text style={styles.header}>Welcome Manage your Money!</Text>
            <View style={styles.error}>
             {/* <Text style={styles.errortext}>err</Text> */}
              </View>
            <TextInput placeholder=" NIC Number" style={styles.textInput}
                onChangeText={(value)=>{
                      state.nic=value
                }}
            />
            <TextInput   secureTextEntry={true}  placeholder=" Password" style={styles.textInput}
              onChangeText={(value)=>{
                state.password=value
              }}
            />
            <View style={styles.btnContainer}>
              <Button 
               style={styles.btn}
                 success onPress={()=>{
                  checkUser();
                 }
                 }>
          
                <Text style={styles.btn_txt}>LogIn</Text>
              </Button>
             <Text style={styles.caption}
          
             >Do not have an Account? <Text style={{color:"#eb4034"}}
             onPress={()=>
            props.navigation.navigate('SignUp')
      
           } >Sign Up</Text> </Text>

            </View>
          </Animatable.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  
      </ImageBackground>
    </View>
  
    )
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    
    
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  },
  container1: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    marginTop:70
    
  },
  header: {
    color:'#e3dce2',
    fontSize: 35,
    marginBottom: 55,
    textAlign:"center",
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    color:'black',
    backgroundColor:"white",
    marginBottom: 30,
    fontSize:16,
    borderRadius:3,
  
  },
  btnContainer: {
    marginTop: 12,
  },
  btn:{
    width:250,
    marginBottom:10,
    borderRadius:10,
    alignSelf:"center",
    marginTop:10
  },
  caption:{
    fontSize:17,
     color:"white",
     alignSelf:"center",
     fontWeight: 'bold',
    
  },

  btn_txt:{
    color:'white',
    fontWeight: 'bold',
    fontSize:20,
    textAlign:"center",
    width:250,
 
  },
  error:{
    justifyContent:"center",
    alignItems:"center",
  
  
  },
  errortext:{
    color:"#E9446A",
    fontSize:13,
    fontWeight:"600",
    textAlign:"center"
  
    
    
    
  }

});






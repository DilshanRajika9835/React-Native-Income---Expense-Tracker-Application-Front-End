
import { TextInput,Keyboard,TouchableWithoutFeedback,KeyboardAvoidingView,ImageBackground, StyleSheet, View, ScrollView ,Alert} from "react-native";
import React, { Component } from 'react'
import {Button,Text,Icon} from 'native-base';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SingUp(props)  {

      let textInput1='';
      let textInput2='';
      let textInput3='';
      let textInput4='';
 
    const state = {
      token:'',
      username:'',
      nic:'',
      password:'',
      conformpassword:'',

    }

 const  storeData = async (value) => {
    try {
      let  jsonValue = JSON.stringify(state)
      await AsyncStorage.setItem('LoginData',jsonValue)
    } catch (e) {
      // saving error
    }

  }
 
  const Success = () =>{
    Alert.alert(
      "Registration!",
      "Registration Successfully! ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>{
          storeData();
           props.navigation.navigate('HomeScreen')

        }}
      ]
    );
  }

   
  const Fail = () =>{
    Alert.alert(
      "Registration!",
      "Sorry your refistration fail? ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>{
           

        }}
      ]
    );
  }
const ClearData=()=>{
  textInput1.clear();
  textInput2.clear();
  textInput3.clear();
  textInput4.clear();  
}
    
const getData=async () => {

try {
  let jsonValue = await AsyncStorage.getItem('LoginData')
 if(jsonValue!=null){
   let  user = await JSON.parse(jsonValue);
    if(user.nic!=null){
       props.navigation.navigate('ViewScreen');
    }
 }
} catch(e) {
 console.log("error"+e);
}
}

getData();

    return (
   
      <View style={styles.container}>
    
      <ImageBackground source={require('../assert/homeImg.jpg')} style={styles.image}>
    
     
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Animatable.View style={styles.inner}
            animation="fadeInUp">
                     <KeyboardAvoidingView
       behavior="padding"
        style={styles.container1}
      >
            <Text style={styles.header}>Welcome to Sing Up!</Text>
            <TextInput  ref={input => { textInput1 = input }} placeholder=" UserName" style={styles.textInput} 
            onChangeText={value=>{
          
                state.username=value
             
          }}
            />
            <TextInput ref={input => { textInput2 = input }} placeholder=" NIC Number" style={styles.textInput}
            
            onChangeText={value=>{
              state.nic=value
          }}
            />
            <TextInput ref={input => { textInput3 = input }}  secureTextEntry={true}  placeholder="Password" style={styles.textInput} 
                onChangeText={value=>{
                  state.password=value
              }}
            
            />
            <TextInput ref={input => { textInput4 = input }}  secureTextEntry={true}  placeholder="Conform Password" style={styles.textInput} />
            <View style={styles.btnContainer}>
            <Button
              style={styles.btn}
                onPress={()=>{
                  if(state.username.length>0){
  
                  fetch('http://192.168.8.112:3000/customer/save', {
                    method: 'POST',
                    body: JSON.stringify({
                      username: state.username,
                      nic:state.nic,
                      password:state.password,
                    }),
                    headers: {
                      'Content-type': 'application/json; charset=UTF-8',
                    },
                  })
                    .then((response) => response.json())
                    .then((json) => {
                      if(json.states){
                        state.token=json.customer._id
                        state.username=json.customer.nic
                        state.nic=json.customer.username 
                        state.password=json.customer.password
                        ClearData();
                        Success();
                        storeData();
                      }else{
                      Fail();
                      }
            
                    })
                  }else{
                   Fail()
                  }
                }
                 }>
          
                <Text style={styles.btn_txt}>Sing Up</Text>
              </Button>
           
              <Text style={styles.caption}
          
             >Allready have  an Account? <Text style={{color:"#1ed9c9"}}
             onPress={()=>{
             props.navigation.navigate('SignIn')
            }}  >SignIn</Text> </Text>

            </View>
            </KeyboardAvoidingView> 
          </Animatable.View>
        </TouchableWithoutFeedback>
    
    
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
    color:'white',
    fontSize: 45,
    marginBottom: 10,
    textAlign:"center",
    fontWeight: 'bold',
  },
  textInput: {
    height: 40,
    color:'black',
    backgroundColor:"white",
    marginBottom: 10,
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

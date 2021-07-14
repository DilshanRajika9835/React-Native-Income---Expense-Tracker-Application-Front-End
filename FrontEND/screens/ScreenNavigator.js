import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
const Drawer = createDrawerNavigator();
import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import HomeScreen from './HomeScreen';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ViewScreen from './ViewScreen';
import DrowerContent from './DrowerContent';
import CashIn from './CashIn';
import CashOut from './CashOut';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
export default class ScreenNavigator extends Component {
 
    render() {
        return (

   <SafeAreaView style={{flex:1}}>
        
        <NavigationContainer >
          {/* <Stack.Navigator drawerContent={props =><DrowerContent{...props}/>}>
          <Stack.Screen name="ViewScreen" options={{ headerShown: false}} component={ViewScreen} />  
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="SignIn" component={SignIn} />  
          <Stack.Screen name="SignUp" component={SignUp} />  
          <Stack.Screen name="CashIn" component={CashIn} />  
          <Stack.Screen name="CashOut" component={CashOut} />  
            </Stack.Navigator> */}
          <Drawer.Navigator drawerContent={props =><DrowerContent{...props}/>} > 
          <Drawer.Screen name="ViewScreen"  options={{ headerShown: false,gestureEnabled:false}} component={ViewScreen}  />  
          <Drawer.Screen name="HomeScreen" options={{ headerShown: false,gestureEnabled:false}} component={HomeScreen} />
          <Drawer.Screen name="SignIn" options={{ headerShown: false,gestureEnabled:false}} component={SignIn} />  
          <Drawer.Screen name="SignUp" options={{ headerShown: false,gestureEnabled:false}} component={SignUp} />  
          <Drawer.Screen name="CashIn"options={{ headerShown: false,gestureEnabled:false}}  component={CashIn} />  
          <Drawer.Screen name="CashOut" options={{ headerShown: false,gestureEnabled:false}} component={CashOut} />  
            </Drawer.Navigator>
      </NavigationContainer>
         
     
      </SafeAreaView>

    
       
        
        )
    }
}

import React, { useState } from "react";
import { View, StyleSheet,Alert,Text,TextInput,StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from "./HomeScreen";
import {
    Avatar,
    Caption,
    Paragraph,
    Drawer,


} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

export default function DrowerContent(props) {
  
         let state={
                token :'',
                username:'',
                nic:'',
                password:'',
                conformpassword:''
              }
             
    const logOutAlert = () =>{
    Alert.alert(
      "Log Out!",
      "Are you sure logout this application? ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>{
            removeValue();

        }}
      ]
    );
    }
 
    const  removeValue = async () => {
            try {
              await AsyncStorage.removeItem('LoginData')
              props.navigation.navigate('ViewScreen')

            } catch(e) {
              console.log("error"+e);
            }
          
          }
         
          const getData=async () => {
              
            try {
              const jsonValue = await AsyncStorage.getItem('LoginData')
                let value=JSON.parse(jsonValue);
              state.password=value.password;

            } catch(e) {
             console.log("error"+e);
            }
            }
          
       getData()

        
    return (
     
        <View style={{flex:1}}>
           {/* <StatusBar barStyle="dark-content" backgroundColor="#0000" /> */}
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={require('../assert/avatar.png')} 
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                            <Text style={styles.title} >Welcome Money Book</Text>
                            <Caption style={styles.caption}>@Name</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Caption style={styles.caption}>Income :</Caption>
                                <Paragraph style={[styles.paragraph, styles.caption]}>8000.00</Paragraph>
                            </View>
                            <View style={styles.section}>
                                <Caption style={styles.caption}>Expense :</Caption>
                                <Paragraph style={[styles.paragraph, styles.caption]}>1000.00</Paragraph>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                         
                            label="Home"
                            onPress={() => {props.navigation.navigate('HomeScreen')}}
                        />
                        <DrawerItem 
                          
                            label="Profile"
                            onPress={() => {props.navigation.navigate('HomeScreen')}}
                        />
                        <DrawerItem 
                      
                            label="Bookmarks"
                            onPress={() => {props.navigation.navigate('HomeScreen')}}
                        />
                        <DrawerItem 
                        
                            label="Settings"
                            onPress={() => {props.navigation.navigate('HomeScreen')}}
                        />
                        <DrawerItem 
                       
                            label="Support"
                            onPress={() => {props.navigation.navigate('HomeScreen')}}
                        />
                    </Drawer.Section>
                    
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
               
                    label="Sign Out"
                    onPress={() =>{logOutAlert()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
      color:"gray"
    },
    caption: {
      fontSize: 12,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });

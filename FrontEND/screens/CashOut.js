import React, { Component } from 'react';
import { Container, Header, Title, Button, Left, Right, Body,Icon,Content } from 'native-base';
import {TextInput,StyleSheet,Text,View,ScrollView,Alert} from 'react-native';
import { Table, Row} from 'react-native-table-component';
export default class CashOut extends Component {
  constructor(props) {
    super(props);
      this.state = {
        cashOuttableHead: ['No', 'Remark', 'Expense'],
        tableOutData: [],
        widthArr: [40, 175, 100],
        amount:'',
        remark:'',
        textInput1:'',
        textInput2:''
      
    };
    this.loadAllCashOut();
  }
  loadAllCashOut(){
    fetch('http://192.168.8.112:3000/cashOut')
    .then((response) => response.json())
    .then((json) =>{
      const tableData = [];
      for (let j = 0; j < json.length; j++) {
        const rowData = [];
        rowData.push(j+1,json[j].remark, json[j].amount);
        tableData.push(rowData);
    
      }
       this.setState({tableOutData: tableData});   
     });
    }
    saveCashOut(){
      if(this.state.amount!=null&& this.state.remark!=null){
        fetch('http://192.168.8.112:3000/cashOut/save', {
          method: 'POST',
          body:JSON.stringify({
            amount:this.state.amount,
            remark:this.state.remark
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })  .then((response) => response.json())
        .then((json) => {
          if(json.states){
         this.Success();
          }else{
            this.Fail();
          }
        
        });
      
      }else{
        this.Fail();
      }

    }
     ClearData(){
      this.state.textInput1.clear();
      this.state.textInput2.clear();
      this.state.remark=null,
      this.state.amount=null
    }
     Success(){
      Alert.alert(
        "Registration!",
        "Registration Successfully! ",
        [
          { text: "OK", onPress: () =>{
            this.loadAllCashOut()
            this.ClearData()
            
  
          }}
        ]
      );
    }
    Fail(){
      Alert.alert(
        "Cash Out!",
        "please fill the data your cash out! ",
        [
          { text: "OK", onPress: () =>{
            this.loadAllCashOut()
            this.ClearData()
            
  
          }}
        ]
      );
    }
  render() {
    const state = this.state;
    return (
      
      <Container style={{zIndex:10}}>
        <Header>
          <Left>
            <Button transparent
            onPress ={ ( ) => this.props.navigation.openDrawer()}
            >
              <Icon  name='menu' />
            </Button>
          </Left>
          <Body>
            <Title >Cash Out</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{backgroundColor:"white"}}>
          <View>

        
        <View style={styles.container2}>
        <View style={styles.labelContainer}>
        <Text style={styles.txt}>Remark</Text>
        </View>
        <TextInput   style={styles.textInput}  
            onChangeText={(value)=>{
             this.state.remark=value

            }}
            ref={input => { this.state.textInput1 = input }}
       />
        </View>
        <View style={styles.container2}>
        <View style={styles.labelContainer}>
          <Text style={styles.txt}>Amount</Text>
        </View>
        <TextInput  keyboardType="numeric" style={styles.textInput}
         onChangeText={(value)=>{
          this.state.amount=value  }}
          ref={input => { this.state.textInput2 = input }}
        />
        </View>
        <Button  style={[styles.button,{backgroundColor:"green",margin:4}] } 
        onPress={()=>{
          this.saveCashOut();
        }}  >
         <View style={{display:"flex",flexDirection:"row"}}>
         <Icon name="save"  />
         <Text style={styles.btncashout}>Save</Text>
         </View>
       </Button>
          </View>
          <View style={styles.card}>
      <View style={styles.container}>
      <Text style={{color:"green"}}>Your Expense Money</Text>
        <ScrollView style={{borderRadius:10}} >
        <View >
            <Table borderStyle={{borderWidth: 1,borderRadius:10}} >
            <Row data={state.cashOuttableHead} style={styles.head} textStyle={styles.text}
              widthArr={state.widthArr}
            />
          </Table>
          <Table borderStyle={{borderWidth: 1, borderColor: 'green'}}>
                {state.tableOutData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={state.widthArr}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
        
            </View>
        </ScrollView>

    </View>
    </View>
 
        </Content>
        

      </Container>
      
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30,borderRadius:10},
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },

  container2: {
    marginTop:15,
    height: 45, 
    position: 'relative',
  },
  card:{
    borderColor:"black",
    borderWidth:1,
    borderRadius:10,
    height:350,
    margin:5,
    backgroundColor:'#fffefc'
    
  },

  labelContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    top: -15,
    left: 25,
    padding: 5,
    zIndex: 50,
    height:30,
  },
  textInput: {
    flex: 1, 
    borderWidth: 1, 
    borderColor: "blue",
    height: 60,
    borderRadius: 10,
    marginHorizontal:10
    
  },
  txt:{
    color:"blue"
  },
  btncashout:{
    color:'white',
    fontWeight: 'bold',
    fontSize:20,
    textAlign:"center",


  },
  button:{
    width:150,
    marginBottom:10,
    borderRadius:10,
    alignSelf:"center",
    marginTop:10
   
    
  },

});
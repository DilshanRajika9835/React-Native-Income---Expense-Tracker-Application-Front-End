import React, { Component,useEffect } from 'react';
import { Container, Header, Title, Content, Button, Left, Right, Body,Icon } from 'native-base';
import { StyleSheet,View,Text,ScrollView} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import * as Animatable from 'react-native-animatable';
import BackgroundTimer from 'react-native-background-timer';

export default class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state={
    cashIntableHead: ['No', 'Remark', 'Income'],
    cashOuttableHead: ['No', 'Remark', 'Expense'],
    tableInData: [],
    tableOutData: [],
    widthArr: [40, 175, 100],
    amountIN:0.00,
    amountOUT:0.00,
    saveMoney:0.00,
    cashAmountOut:0.00,
    cashAmountIn:0.00,
    cashAvaiable:0.00,
    number:1
    
  
    }
    this.loadAllCashIn();
    this.loadAllCashOut();
 

    // BackgroundTimer.runBackgroundTimer(() => { 
    //   console.log("Callling");
    //     if(this.state.number<0){
    //       console.log("Start Background Running");
         
    //     }
    //       console.log("Stop BackgroundTimer");
    //       this.loadAllCashIn();
    //       this.loadAllCashOut();
    //       BackgroundTimer.stopBackgroundTimer(); 
          
      
    //   }, 
    //   4000);
}


//-----------------------------------------------------------

  loadAllCashOut(){
  
  fetch('http://192.168.8.112:3000/cashOut')
  .then((response) => response.json())
  .then((json) =>{
    const tableData = [];
    for (let j = 0; j < json.length; j++) {
      const rowData = [];
      

        
      rowData.push(j+1,json[j].remark,json[j].amount );

      this.setState(value => {
        let x=+json[j].amount;
   
        this.state.amountOUT=this.state.amountOUT+x;
        let amountOutList=this.state.amountOUT.toFixed(2)
            this.state.cashAmountOut=amountOutList;
         
     }) 
     this.calculateSum();   
      tableData.push(rowData);
    
  }
     this.setState({tableOutData: tableData});   
   });

}
loadAllCashIn(){

  fetch('http://192.168.8.112:3000/cashIn')
  .then((response) => response.json())
  .then((json) =>{
    const tableData = [];
    for (let j = 0; j < json.length; j++) {
   
      const rowData = [];
      rowData.push(j+1,json[j].remark, json[j].amount);
      tableData.push(rowData);
      this.setState(value => {
        let x=+json[j].amount;
      
        this.state.amountIN=parseFloat(this.state.amountIN+x)
        let amountInList=this.state.amountIN.toFixed(2)
            this.state.cashAmountIn=amountInList;
     })
     this.calculateSum();
    
  }
     this.setState({tableInData: tableData});   
   });

}
calculateSum(){
     this.state.saveMoney= this.state.amountIN-this.state.amountOUT
     let amountAvaiable=this.state.saveMoney.toFixed(2)
     this.state.cashAvaiable=amountAvaiable;
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
          <Title >Money Save</Title>
        </Body>
        <Right />
      </Header>
      <Content style={{backgroundColor:"#fffefc"}}>
        {/* content  */}
      <Animatable.View style={styles.volat} 
     animation="fadeInUpBig" 
     iterationCount={1} 
     direction="alternate">
      
        <Text style={styles.moneyCardText1}>{this.state.cashAmountIn!="NaN"?this.state.cashAmountIn:"0.00"}</Text>
        <Text style={styles.moneyCardText2}>Total In (+)</Text> 
        <Text style={styles.moneyCardText3}>Total Out (-)</Text>
        <Text style={styles.moneyCardText4}>{this.state.cashAmountOut!="NaN"?this.state.cashAmountOut:"0.00"}</Text>
        <Text style={styles.moneyCardText5}>Avaiable  (~)</Text>
        <Text style={styles.moneyCardText6}>{this.state.cashAvaiable!="NaN"?this.state.cashAvaiable:"0.00"}</Text>
      </Animatable.View>

      <View style={styles.card}>
      <View style={styles.container}>
      <Text style={{color:"green"}}>Your Income Money</Text>
        <ScrollView style={{borderRadius:10}} >
        <View >
            <Table borderStyle={{borderWidth: 1,borderRadius:10}} >
            <Row data={state.cashIntableHead} style={styles.head} textStyle={styles.text}
              widthArr={state.widthArr}
            />
          </Table>
          <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                {state.tableInData.map((rowData, index) => (
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
    <View style={styles.container}>
      <Text style={{color:"red"}}>Your Expense Money</Text>
        <ScrollView style={{borderRadius:10}} >
        <View >
            <Table borderStyle={{borderWidth: 1,borderRadius:10}} >
            <Row data={state.cashOuttableHead} style={styles.head} 
                widthArr={state.widthArr}
            textStyle={styles.text}/>
          </Table>
          <Table borderStyle={{borderWidth: 1, borderColor: 'black'}}>
                {state.tableOutData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData} 
                    textStyle={styles.text}
                    widthArr={state.widthArr}
                  />
                ))}
              </Table>
        
            </View>
        </ScrollView>
        
    </View>
    <View style={{display:"flex",flexDirection:"row",alignSelf:"center"}}>
      <Button style={[styles.button,{backgroundColor:"green",margin:4}]} 
      onPress={()=>this.props.navigation.navigate('CashIn')}
      
      ><Text style={styles.btncashin}>+ Cash In </Text></Button>
       <Button  style={[styles.button,{backgroundColor:"red",margin:4}]} 
        onPress={()=>this.props.navigation.navigate('CashOut')}
        ><Text style={styles.btncashout}>- Cash out </Text></Button>
        </View>
     
        </View>
        </Content>
      </Container>
    );
  }
}
const styles=StyleSheet.create({
  container: { flex: 1,
     padding: 16,
      paddingTop: 10,
      borderRadius:10,

  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
  card:{
    borderRadius:10,
    height:400,
    margin:5,
  
  
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 3,
    
    
  },
  volat:{

    borderRadius:10,
    height:135,
    margin:5,
    position:"relative",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    
    elevation: 3,
  },
  moneyCardText1:{
    fontSize:20,
    position:'absolute',
    right:50,
    top:20, 
    color:"green",
    fontWeight: 'bold',
    
  },
  moneyCardText2:{
    fontSize:20,
    position:'absolute',
    left:0,
    marginLeft:10,
    top:20,
    fontWeight: 'bold',
   

  },
  moneyCardText3:{
    fontSize:20,
    position:'absolute',
    bottom:50,
    marginLeft:10,
    fontWeight: 'bold',
   
  },
  moneyCardText4:{
    fontSize:20,
    position:'absolute',
    bottom:50,
    right:50,
    color:"red",
    fontWeight: 'bold',
 
  },
  moneyCardText5:{
 
    fontSize:20,
    position:'absolute',
    bottom:20,
    left:0,
    fontWeight: 'bold',
    marginLeft:10,
 
  },
  moneyCardText6:{
    fontSize:20,
    position:'absolute',
    bottom:20,
    right:50,
    color:"blue",
    fontWeight: 'bold',
 
  },
  btncashin:{
    color:'white',
    fontWeight: 'bold',
    fontSize:20,
    textAlign:"center",
    width:150
  
  },
  btncashout:{
    color:'white',
    fontWeight: 'bold',
    fontSize:20,
    textAlign:"center",
    width:150

  },
  button:{
    width:150,
    marginBottom:10,
    borderRadius:10 
  }
})

 

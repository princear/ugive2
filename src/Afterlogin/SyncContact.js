import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,
    Text,
    TextInput,
    Alert,
    TouchableOpacity,
    Linking,SafeAreaView,
    ScrollView,
  } from "react-native";
  import React, { Component } from "react";
  import { Table, Row, Rows } from 'react-native-table-component';
  import {Picker} from '@react-native-picker/picker';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import Header from '../Components/Header/index'
  export default class SyncContact extends Component {

    constructor(props) {
        super(props);
        this.state = {
          tableHead: ['Donor Name', 'Cancel Donor Emails?', 'Status','Actions'],
          tableData: [
            ['Aunt', '$25.00', '$0.00', 'Lorem Ipusum'],
            ['Aunt', '$25.00', '$0.00', 'Lorem Ipusum'],
            ['Aunt', '$25.00', '$0.00', 'Lorem Ipusum'],
            ['Aunt', '$25.00', '$0.00', 'Lorem Ipusum'],
            ['Aunt', '$25.00', '$0.00', 'Lorem Ipusum'],
            ['Aunt', '$25.00', '$0.00', 'Lorem Ipusum'],
            ['Aunt', '$25.00', '$0.00', 'Lorem Ipusum'],
           
          ],
        }
      }
     

      render(){
        const state = this.state;
        return(
            <View style={styles.container}>
              <Header
                navigation={this.props.navigation}
              />
                <View style={styles.One}>
                    <Image style={styles.smsimg} source={require('../assets/26.png')}/>
                    <Text style={styles.text1}>Sync Contact</Text>
                </View>
            <View style={{flexDirection:'row',margin:20,marginBottom:50}}>

            
               
      <TouchableOpacity style={styles.button}>
                  <Text style={styles.SubmitText}>Select All</Text>
      </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Text style={styles.SubmitText}>Send Now</Text>
                </TouchableOpacity>
     
                </View>
           
                <Table style={styles.table}>
                  <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                  <Rows data={state.tableData} style={styles.row} textStyle={styles.text2}/>
              </Table>

          
            </View>
        )
      }
    }

    const styles = StyleSheet.create({
       
        container: {
            flex: 1, 
            backgroundColor:'#fff'
         
        },
        table:{
            width:wp('100%'),
            justifyContent:'center',
            alignSelf:'center'
        },
        
        head: { 
            height: 40, 
          
            backgroundColor: '#F2F2F2',
       
        },

        row:
        {
            borderBottomWidth:1,
            borderBottomColor: '#D1D1D1'
        },
        pickerContainer:{
            color:'#6C6C6C',
             width:wp('35%'),
             borderWidth:1,
             borderRadius:30,
             justifyContent:'center',
            backgroundColor:'#F2F2F2',
            borderColor:'#F2F2F2',
            marginLeft:wp('5%'),
            paddingLeft:10,
          
            fontFamily:'Poppins-SemiBold',
            
         },
         button:{
            backgroundColor:'#CC3739',
            padding:8,
          width:wp('30%'),
           borderRadius:30,
           marginLeft:10,
           
           alignSelf:'center'
       
          },
          button1:{
            backgroundColor:'#CC3739',
            padding:8,
          width:wp('22%'),
           borderRadius:30,
           marginLeft:10,
           
           alignSelf:'center'
       
          },
 
          SubmitText:{
            textAlign:'center',
            fontFamily:'Poppins-Regular',
            color:'#fff',
            fontSize:10
          },
        text: {
             //margin: 6,
             fontFamily:'Poppins-SemiBold',
             fontSize:10,
           //  textAlign:'center'
           alignSelf:'center',
            },
            text2: {
            
                fontFamily:'Poppins-Regular',
                fontSize:10,
          alignSelf:'center',
                padding:10
               },

        One:{
            flexDirection:'row',
            padding:30,
            marginTop:20
        },

        smsimg:{
           height:20,
           width:20,
        
        },
        text1:{
            fontFamily:'Poppins-SemiBold',
            fontSize:20,
            paddingLeft:10
        },

       

      


        
       


    })

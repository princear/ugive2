import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    PermissionsAndroid,
    StyleSheet,
    Platform,
    Text,FlatList,
    TextInput,
    Alert,
    TouchableOpacity,
    Linking,SafeAreaView,
    ScrollView,
  } from "react-native";
  import React, { Component } from "react";
  import { Table, Row, Rows } from 'react-native-table-component';
  import Header from '../Components/Header/index'
  import { ApiScreen } from "../API/ApiScreen";
  import AsyncStorage from "@react-native-community/async-storage";
  import Contacts from 'react-native-contacts';
  
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

  export default class DonorActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
          contacts:[],
          isLoading:false,
          dataSource:[],
        
        
        }
      }
     

     

    async componentDidMount() {

      
        this.setState({
          isLoading:true
        })
        
        // if (Platform.OS === "android") {
        //   PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        //     title: "Contacts",
        //     message: "This app would like to view your contacts."
        //   }).then(() => {
        //     this.loadContacts();
        //   });
        // } else {
        //   this.loadContacts();
        // }

        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
      //  console.log('#################3',data)
        this.access_token =data.token
        //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);

        const meurl = ApiScreen.base_url + ApiScreen.donor_activity
        console.log("url:"+meurl);
      
        fetch(meurl ,
          {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token': this.access_token
            // <-- Specifying the Content-Type
              
          }),
         
         
      }).then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetchaaaaaaaaaaa',responseJson)
             
                setTimeout(() => {

                    this.setState({
                      isLoading: false,
                      dataSource:responseJson.data,

                    })
                }, 2000)
              //  console.log('%%%%%%%%%%%%%%%%%%%%%%%',this.state.id,this.state.current_fund)
            })
            .catch(error => console.log(error))

        
          }



         async loadContacts() {

           await Contacts.getAll((err,contacts) => {

            if(err === 'denied'){
                console.log('err')

            }

            else{
              this.setState({contacts})
              console.log('>>>>>>>>>>>',contacts)
            }

           })
              
           
            //Contacts.checkPermission();
          
          }


      render(){

        const state = this.state;
        return(

            <View style={styles.container}>
{(this.state.isLoading) &&
            <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>

            <ActivityIndicator 
    
           color="#00ff00"
           size="large"
           style={{
             backgroundColor: "rgba(204,55,57,.8)",
             height: 80,
             width: 80,
             zIndex: 999,
             borderRadius: 15
           }}
           size="small"
           color="#0000ff"
            /> 
    </View>}
                <Header
                  navigation={this.props.navigation}
                />
              
                <View style={styles.One}>
                    <Image style={styles.smsimg} source={require('../assets/23.png')}/>
                    <Text style={styles.text1}>Donor Activity</Text>
                </View>
           

               

                <View style={styles.head}>
                <View>
               
               <Text style={styles.text}>Photo</Text>
          
           </View>
              <View>
               
                  <Text style={styles.text}>Donor Name</Text>
             
              </View>
              <View style={{flex:1}}>
              
                  <Text style={styles.text}>Pledge</Text>
                
              </View>
              <View style={{flex:1}}>
              
              <Text style={styles.text}>Gift Amount</Text>
              
              </View>
              <View style={{flex:1}}>
              
              <Text style={styles.text}>Message</Text>
              
              </View>
             
            </View>
           
           <Text></Text>

                <FlatList
     
     data={this.state.dataSource}
     keyExtractor={(item, index) => index}
    // horizontal={true}
   
     renderItem={({ item, index }) => (


      <View>
      <View style={styles.row} >

        <View style={{ flex: 1}}>
               
            
               <Image style={styles.userimg} source={require('../assets/24.png')}/>

          
           </View>
           <View style={{ flex: 1}}>
               
               <Text style={styles.text2}>{item.name}</Text>
          
           </View>
           <View style={{ flex: 1}}>
           
               <Text style={styles.text2}>{item.pledge_amt}</Text>
             
           </View>
           <View style={{ flex: 1}}>
           
                 <Text style={styles.text2}>{item.offline_amt}</Text>
           
           </View>
           <View style={{ flex: 1}}>
           
               <Text style={styles.text2}>{item.message}</Text>
           
           </View>
         
       
           </View>
           </View>
     )}
     />
           
   
                {/* <Table>
              
                  <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
                  <Rows data={state.tableData} style={styles.row} textStyle={styles.text2}/>
              
              </Table> */}

          
            </View>
        )
      }
    }

    const styles = StyleSheet.create({
       
        container: {
            flex: 1, 
            backgroundColor:'#fff'
         
        },
        userimg:{
          alignSelf:'center',
        
          height:25,
          width:25,
          marginTop:5,
          marginLeft:-20

          
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

       

        head: { 

          height: 40, 
            borderRadius:20,
            backgroundColor: '#F2F2F2',
            flexDirection:'row',
            justifyContent:'center',
            alignSelf:'center'

        },
        row:
        {
            borderBottomWidth:1,
            borderBottomColor: '#D1D1D1',
            flexDirection:'row',
          //  width:800,
            //flexDirection:'row-reverse'
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
         input: {
          width:wp('75%'),
         //textAlign:'center',
         backgroundColor: '#fff',
         fontFamily:'Poppins-Regular',
         alignSelf:'center',
        borderWidth:1,
        marginTop:10,
        borderColor: '#424242',
      
      //  borderRadius:30,
       //  backgroundColor:'red'
      },
      searchSection:{
  

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
           
             fontFamily:'Poppins-SemiBold',
             fontSize:9,
          
           justifyContent:'center',
           alignSelf:'center',
           padding:10
          
            },
            text2: {
            
                fontFamily:'Poppins-Regular',
                fontSize:10,
              //alignSelf:'center',
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

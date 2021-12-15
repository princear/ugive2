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
  import {Picker} from '@react-native-picker/picker';
  import Header from '../Components/Header/index'
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  
  import { ApiScreen } from "../API/ApiScreen";
  import AsyncStorage from "@react-native-community/async-storage";


  export default class SendSMS extends Component {

    constructor(props) {
        super(props);
        this.state = {
          Id:'',
          DonorType:'',
          isLoading:false,
          subject:'',
          message:''
        
        };
      
      }


      onPickerValueChange = async (value, index) => {
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%',value)

       
        this.setState(
          {
            "DonorType": value
          },
          () => {
           
          console.log('>>>>>>>>>>>>>.',this.state.DonorType)

          }
   
        );
  
      }


      sendEmail = async() => {

        console.log('%%%%%%%%%%%%%%%%%%%55',this.state.DonorType,this.state.message)

        this.setState({
          isLoading:true
          
        })

        

          const login = await AsyncStorage.getItem('login');
        
  
          let data = JSON.parse(login);
        //  console.log('#################3',data)
          this.access_token =data.token
          //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);
  
          const meurl = ApiScreen.base_url + ApiScreen.send_sms
          console.log("url:"+meurl);
        
          fetch(meurl ,
            {
              method: 'POST',
              headers: new Headers({
                  'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token': this.access_token
              // <-- Specifying the Content-Type
                
            }),
           
            body: JSON.stringify(
              {
                
                to:this.state.DonorType,
                sms:this.state.message
              
              })
  
        }).then(response => response.json())
              .then((responseJson) => {
                  console.log('getting data from fetchaaaaaaaaaaa',responseJson)
               

            
                  if(responseJson.success == true){
                   console.log(responseJson.message)
                     Alert.alert(responseJson.message)
                     this.textInput.clear()
                
                 this.setState({
                  isLoading:false
                })
               
                  }
   
                  else{
   
                     console.log(responseJson.message)
                     const invalid =  responseJson.message
                     Alert.alert(invalid);
                     this.textInput.clear()
                     
                     this.setState({
                      isLoading:false
                    })
                   }
    
                   this.setState({ ActivityIndicator_Loading : false });
  
                  }).catch((error) =>
                  {
                    this.setState({
                      isLoading:false
                    })
                      console.error(error);
        
                  });



    }

      render(){
       // const Id = this.props.route.params.Id;
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
                    <Image style={styles.smsimg} source={require('../assets/20.png')}/>
                    <Text style={styles.text1}>Send SMS </Text>
                </View>
                <ScrollView>
                <View style={styles.pickerContainer}>
                <Picker style={styles.PickerStyleClass}
        selectedValue={this.state.DonorType}

        onValueChange={this.onPickerValueChange}>
          <Picker.Item label="Select Donor Type"  />
        <Picker.Item label="All" value ="1" />
        <Picker.Item label="Active Donors" value ="2" />
        <Picker.Item label="Not Active Donors" value =" 3"/>
        </Picker>
     
     
                </View>
                <View style={styles.textcontainer}>
                
                     
                <TextInput ref={input => { this.textInput = input }} style={styles.text}
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(message) => this.setState({message})}
                    placeholder="Type Here...."
                  //  onChangeText={(text) => this.setState({text})}
                    //value={this.state.text}
                    />
                {/* <Text style={styles.text2}>character 01/150</Text> */}
                </View>
                {/* <View style={styles.left}>
                <Text style={styles.lefttext}>Left 150</Text>
                </View> */}

                <TouchableOpacity style={styles.button}
                  onPress={() => this.sendEmail()}
                >
                  <Text style={styles.SubmitText}>Submit</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        )
      }
    }

    const styles = StyleSheet.create({
       
        container: {
            flex: 1, 
            backgroundColor:'#fff'
         
        },

        One:{
            flexDirection:'row',
            padding:30,
            marginTop:20
        },

        smsimg:{
           height:25,
           width:30,
        
        },
        text1:{
            fontFamily:'Poppins-SemiBold',
            fontSize:20,
            paddingLeft:10
        },
        pickerContainer:{
            color:'#6C6C6C',
             width:wp('75%'),
             borderWidth:1,
             borderRadius:30,
             justifyContent:'center',
            backgroundColor:'#F2F2F2',
            borderColor:'#F2F2F2',
            marginLeft:wp('5%'),
            paddingLeft:10,
            marginTop:10,
            fontFamily:'Poppins-SemiBold',
            
         },
         text:{
          margin:20,
          marginTop:30,
          borderRadius:20,
          paddingLeft:20,
          color: '#6F6F6F',
            height:200,
             backgroundColor:'#F2F2F2',
            borderColor:'#F2F2F2',
            textAlignVertical: "top"
         },

         text2:{
           textAlign:'right',
           marginRight:20,
           fontFamily:'Poppins-SemiBold',
           color:'#6C6C6C'
         },

         left:{
           borderBottomWidth:4,
           borderBottomColor:'#6C6C6C',
           margin:20,
           color:'#6C6C6C'
           
         },

         lefttext:{

          fontFamily:'Poppins-SemiBold',
          color:'#6C6C6C',
          
         },

         button:{
           backgroundColor:'#CC3739',
           padding:10,
          width:wp('50%'),
          borderRadius:30,
          marginLeft:20,
          marginTop:20
      
         },
         SubmitText:{
           textAlign:'center',
           fontFamily:'Poppins-Regular',
           color:'#fff',
           fontSize:16
         }


    })

import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,
    Text,
    TextInput,BackHandler,
    Alert,
    TouchableOpacity,
    Linking,SafeAreaView,
    ScrollView,
  } from "react-native";

  import React, { Component } from "react";
  import {Picker} from '@react-native-picker/picker';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import Header from '../Components/Header/index'
  import { ApiScreen } from "../API/ApiScreen";
  import AsyncStorage from "@react-native-community/async-storage";
  
  export default class AddDonation extends Component {

    constructor(props) {
          super(props);
          this.state = {
          dataSource2:'',
          isLoading:'',
          donorname:'',
          email:'',
          refer:'',
          amount:"",
          checknumber:'',
          current_org:''
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      
      }

      componentDidMount = async () => {

        this.setState({
          isLoading:true
        })
        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
      //  console.log('#################3',data)
        this.access_token =data.token
        //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);
        const url2 = ApiScreen.base_url + ApiScreen.fund_list;
        console.log("url>>>>>>>>>>:"+url2);
        fetch(url2 ,
          {
            method: 'POST',
            headers: new Headers({
                'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token': this.access_token
            // <-- Specifying the Content-Type
              
          }),
         
      
      }).then(response => response.json())
            .then((responseJson) => {
               // console.log('FUND LIST>>>>>>>>>>>>>>>>',responseJson.data[0].organization)
              
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                       dataSource2:responseJson.data[0].organization,
                     
                      
                    })
                }, 2000)
        
            })
            .catch(error => console.log(error))


            let device_token = await AsyncStorage.getItem('currentFund');

            //  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',device_token)
          
              
            const fundDetail = ApiScreen.base_url + ApiScreen.fund_detail
            console.log("url:" + fundDetail,device_token);
            fetch(fundDetail,
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
        
                  
                    fund_id: device_token.replace(/^"(.*)"$/, '$1')
        
                  })
        
        
              }).then(response => response.json())
              .then((responseJson) => {
                 console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.organization)
        
                setTimeout(() => {
                  this.setState({
                    isLoading: false,
                    current_org: responseJson.data.organization,
        
                  })
                }, 2000)
        
              })
              .catch(error => console.log(error))
        
        
           
      }



      componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    
      }
    
      handleBackButtonClick() {
    
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
        return true;
    }

      goBack = () => {
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
    }


    refresh() {

     
      this.componentDidMount();
   
    }
      add_donation = async() => {

        console.log('Add donation');
        const donorname = this.state.donorname;
        const refer = this.state.refer;
        const email = this.state.email;
       
        const checknumber = this.state.checknumber;
        const amount = this.state.amount;
        //console.log(firstname,lastname,email,mobile,refer);

        this.setState({
          isLoading:true
        })

        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
      //  console.log('#################3',data)
        this.access_token =data.token;
        const addurl = ApiScreen.base_url + ApiScreen.offline_donation ;
      

        fetch(addurl,
    
          {
              method: 'POST',
              headers: 
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'token': this.access_token
              },

              body: JSON.stringify(
              {
                
               
                name:donorname,
                amount:amount,
                check_no:checknumber,
                message:refer,
                email:refer
                
              })

          }).then((response) => response.json()).then((responseJson) =>
          
          {
          
          //  console.log("from login*** ",responseJson.data);
            this.setState({  isLoading:false })
          console.log(responseJson.message)
             if(responseJson.response_code == 200){
              console.log(responseJson.message)
             Alert.alert(responseJson.message)
             //this.props.route.params.onGoBack();
             this.props.navigation.goBack();
             this.props.navigation.navigate('ManageDonor')
              //this.props.route.params.onGoBack();
              // this.props.navigation.goBack();
            
 
             }

             else{

               
                const invalid =  responseJson.message
                Alert.alert(invalid);
             
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
        
        if(this.state.isLoading == true)  
        
        return <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>

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

     </View>

        return(
        <View  style={styles.container}>
    
                <Header
                  navigation={this.props.navigation}
                />
                    <View style={styles.One}>
                        <Image style={styles.smsimg} source={require('../assets/22.png')}/>
                        <Text style={styles.text1}>Add Offline Donations</Text>
                    </View>

<ScrollView>
                <View style={styles.textcontainer}>
                
                    <TextInput style={styles.subtext}
                        
                        placeholder="Team/Organization"
                        value={this.state.current_org}
                        />

                        <TextInput style={styles.subtext}
                          onChangeText={(donorname) => this.setState({donorname})}
                        placeholder="Donator Name"/>
             
                </View>

                <View style={styles.text2container}>
                
                    <TextInput style={styles.subtext2}
                    onChangeText={(email) => this.setState({email})}
                        placeholder="Donor Email Address/Mobile NO"
                    
                        />
               
                </View>

                <View style={styles.text2container}>

                
                    <TextInput style={styles.subtext2}
                onChangeText={(refer) => this.setState({refer})}        
                        placeholder="How do you Refer to this Person?"
                    
                        />
               
                </View>
              
                <View style={styles.textcontainer}>
                
                    <TextInput style={styles.subtext}
                          onChangeText={(amount) => this.setState({amount})}
                        placeholder="Offline Donation Amount"
                    
                        />

                     <TextInput style={styles.subtext}
                      onChangeText={(checknumber) => this.setState({checknumber})}
                    placeholder="Offline Check Number"
                 
                    />
             
                </View>
              

                <TouchableOpacity style={styles.button} onPress={() => this.add_donation()}>
                      <Text style={styles.SubmitText}>Submit</Text>
                </TouchableOpacity>
              
                   <Text style={styles.helpText}>Need Help?</Text>
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
            paddingLeft:30,
            paddingBottom:10,
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

        textcontainer:{
            marginTop:10,
            flexDirection:'row',
           //padding:10
           //marginLeft:10,
           //marginRight:10
        },
        
        text2container:{
            marginTop:0,
            marginBottom:5
          //  flexDirection:'row',
           
        },

         subtext:{
            margin:5,
           
            fontFamily:'Poppins-SemiBold',
            fontSize:10,
            //marginTop:50,
            borderRadius:20,
            color: '#6F6F6F', 
             paddingLeft:10,
             width:wp('48%'),
               backgroundColor:'#F2F2F2',
              borderColor:'#F2F2F2',
             
         },

         subtext2:{
            marginLeft:5,
            marginRight:5,
            marginTop:20,
            borderRadius:20,
             paddingLeft:20,
             fontFamily:'Poppins-SemiBold',
             fontSize:10,
             color: '#6F6F6F', 
               backgroundColor:'#F2F2F2',
              borderColor:'#F2F2F2',
             
         },

         text:{
          marginLeft:20,
          marginRight:20,
         marginTop:10,
          borderRadius:20,
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
          marginTop:50,
          alignSelf:'center'
      
         },

         SubmitText:{
           textAlign:'center',
           fontFamily:'Poppins-Regular',
           color:'#fff',
           fontSize:16
         },
         helpText:{
             textAlign:'center',
             fontFamily:'Poppins-SemiBold',
             color:'#CC3739',
             marginTop:50
         }


    })

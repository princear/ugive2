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
  import OneSignal from 'react-native-onesignal';
  import React, { Component } from "react";
  import {ApiScreen} from './API/ApiScreen'
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import AsyncStorage from "@react-native-community/async-storage";

  export default class Login extends Component {
    device_type = '';
    constructor(properties) {
      
      super(properties);
      
      OneSignal.init('882776e4-d816-493b-920e-c72b58ab8671', {
        kOSSettingsKeyAutoPrompt: true,
        kOSSettingsKeyInAppLaunchURL: false,
        kOSSettingsKeyInFocusDisplayOption: 2,
      });
      OneSignal.inFocusDisplaying(2);
       
      this.state = {

         isLoading:false,
        
         // email:'garun@delimp.com',
          //email:'tysellespencer@aol.com',
         // password:'1234',
          //password:'gocgoq-2futto-be
        
        };
        if (Platform.OS === 'ios') {
          this.device_type = 'ios';
        } else {
          this.device_type = 'android';
        }
    
      
      }


      async componentDidMount() 
  {

    console.log('Device:',this.device_type);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    //        OneSignal.addEventListener('subscription', this.onSubscriptionChange);
    //        OneSignal.addEventListener('permission', this.onPermissionChange);
    OneSignal.addEventListener(
      'emailSubscription',
      this.onEmailSubscriptionChange,
    );
    OneSignal.addEventListener(
      'inAppMessageClicked',
      this.onInAppMessageClicked,
    );
  }



  onReceived(notification) {

    console.log("Notification received: ", notification);
  
  }


  onOpened(openResult) { 
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device,"device_token",device.userId);
    ApiScreen.device_token = device.userId;
    AsyncStorage.setItem("device_token",device.pushToken);
    AsyncStorage.setItem("device_userId",device.userId);
  }


        on_login = async() => {

          const device_token = await AsyncStorage.getItem('device_token');
          const device_userId = await AsyncStorage.getItem('device_userId');
      
          console.log('click to login');
          const email = this.state.email;
          const password = this.state.password;
          console.log('email:'+email,'pass:'+password,'devicetoken:'+device_token,'deviceType:'+this.device_type,'userid:'+device_userId);

          this.setState({
            isLoading:true
          })

          const url = ApiScreen.base_url + ApiScreen.login ;
          console.log(url,email,password);

          fetch(url,
      
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(
                {
                  
 
                  email :email,
                  password:password,
                  device_type: this.device_type,
                  device_token: device_token,
                  device_user_id: device_userId

                  
                })
 
            }).then((response) => response.json()).then((responseJson) =>
            
            {
              console.log("from login*** ");
              console.log("from login*** ",responseJson.data);
              this.setState({  isLoading:false })
               if(responseJson.success == true){
                console.log(responseJson.success)
                  //console.log("from login ",responseJson.data);
                
                AsyncStorage.setItem("login",JSON.stringify(responseJson.data));
             
               //this.props.navigation.goBack(null);
                this.props.navigation.replace("Home");

               }

               else
               {

                  console.log(responseJson.success)
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
    
          return (
             <SafeAreaView  style={styles.container}>
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

               <ScrollView>
                 
                    <ImageBackground   imageStyle={{ borderRadius: 15}} source={require('./assets/32.png')} style={styles.image}>
                      
                        <Image style={styles.image1} source={require('./assets/Ugive-img.png')}></Image>
                        <Image style={styles.logo} source={require('./assets/36.png')}></Image>

                    </ImageBackground>

                 <View style={{marginTop:30}}>
               
                     <Text style={styles.text1}>
                       {this.state.Id}
                         Sharing with others helps them to{"\n"} achieve their dreams.
                     </Text>
                     <Text style={styles.text2}>
                         Start your fundrasier now.
                     </Text>
                 </View>
                 <SafeAreaView>
                 <View style={styles.searchSection}> 
                    <Image style={styles.searchIcon} source={require('./assets/05.png')}/>
                      <TextInput    
                           onChangeText={(email) => this.setState({email})}
                          //value='garun@delimp.com'
                       
                          placeholder="Login with Email"
                         
                          style={styles.input}
                        >
                      </TextInput>
                 </View>
                 </SafeAreaView>               
                 <View style={styles.searchSection}> 
                      <Image style={styles.searchIcon} source={require('./assets/34.png')}/>
                        <TextInput   
                         onChangeText ={(password) => this.setState({password})}
                        //value='123456'
                     
                        secureTextEntry={true}
                          placeholder="Password"
                          style={styles.input}
                          >
                      </TextInput>
                 </View>

               
                 <TouchableOpacity style={styles.button} 
                  onPress={() => this.on_login()}>
                      <Text style={styles.SubmitText}>Submit</Text>
                </TouchableOpacity>
                
               
               {/* <View style={{flexDirection:'row',alignSelf:'center'}}>
                 <Text style={styles.text3}> Don't have an account?</Text>
                    <TouchableOpacity 
                          onPress={() => this.props.navigation.navigate('Home')}>
                        <Text style={styles.text4}>Sign up</Text>
                    </TouchableOpacity>
                
              </View> */}
            

                </ScrollView>
            </SafeAreaView>
          )
        
      }

  }


  const styles = StyleSheet.create({
    container: {
        flex: 1, 
     //   flexDirection: "column",
        backgroundColor:'#fff'
     
      
    },
    image: {
       height:hp('50%'),
       margin:15,
       resizeMode: "cover",
       justifyContent:'center',
      
      
      },
      image1: {
        height:hp('37%'),
        margin:15,
       width:wp('80%'),
        alignSelf:'center',
        marginTop:50
       
       },

       logo: {
        height:hp('15%'),
        
       width:wp('38%'),
        alignSelf:'center',
        position:'absolute',
        top:hp('39%'),
        
       
       },
      text1: {
        color: "#4B4B4B",
        fontSize: 16,
        textAlign: "center",
       fontFamily:'Poppins-SemiBold'
      },

      text2: {
        color: "#666666",
        fontSize: 12,
       marginTop:15,
       marginBottom:15,
        textAlign: "center",
        fontFamily:'Poppins-SemiBold'
      
      },
      text3: {
        color: "#666666",
        fontSize: 12,
       marginTop:5,
      
        textAlign: "center",
        fontFamily:'Poppins-Bold'
        
      },
      text4: {
        color: '#DA171B',
        fontSize: 12,
       marginTop:5,
      paddingLeft:5,
        textAlign: "center",
        fontFamily:'Poppins-Bold'
        
      },
      searchSection:{
          flexDirection: 'row',
        //  width:wp('95%'),
          margin:10,
          borderWidth:1,
          borderColor: '#424242',
      
     
          borderRadius:30,
          paddingTop:3,
          paddingLeft:10

      },
      button:{
        backgroundColor:'#CC3739',
        padding:10,
       width:wp('90%'),
       borderRadius:30,
       marginLeft:20,
       marginTop:10,
       marginBottom:10
   
      },
      SubmitText:{
        textAlign:'center',
        fontFamily:'Poppins-Regular',
        color:'#fff',
        fontSize:16
      },

      searchIcon:{
         
          height:40,
          width:40,
          
      
        },

      input: {
        
       width:wp('75%'),
        textAlign:'center',
         color: '#6F6F6F',
     // marginLeft:wp('20%'),
        fontFamily:'Poppins-Bold',
       // backgroundColor:'red',
        //paddingLeft:100
        
        
      
     },
    
  });
  
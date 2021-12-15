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
  import {ApiScreen} from './API/ApiScreen'
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import AsyncStorage from "@react-native-community/async-storage";

  export default class Splash extends Component {

    constructor(props) {
      
      super(props);
        this.state = {

         isLoading:false,
        
        
        
        };
      
      }


      componentDidMount() { // B
        if (Platform.OS === 'android') {
          Linking.getInitialURL().then(url => {
            this.navigate(url);
            console.log('>>>>>>>>>>>>>',url)
            
            
          });
        } 
        else {
           console.log('>>>>>>>>>>>>>HIIIIIIIIII')
            Linking.addEventListener('url', this.handleOpenURL);

          }
        }
        
        componentWillUnmount() { // C
          Linking.removeEventListener('url', this.handleOpenURL);
        }

        handleOpenURL = (event) => { // D
          this.navigate(event.url);
        }

        navigate = (url) => {
           console.log('%%%%%%%%%',url)
           if(url == null)
           {

              this.props.navigation.navigate('Login')
           }
           else{

          //  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>456',id);
          const { navigate } = this.props.navigation;
      
          const route = url.replace(/.*?:\/\//g, '');
          const id = route.match(/\/([^\/]+)\/?$/)[1];
          console.log('%%%%%%%%%%%%%%AAAAAAAAAAAAAAAAAAAAAAA',id)
        //  const routeName = route.split('/')[0];
        
          this.props.navigation.navigate('people',{id,name:'chris'})
          // if (routeName === 'people') {
          //   navigate('people', { id, name: 'chris' })
          //   console.log('id',id)
          // };
        }
        }
      

      
      render(){

        
          return <Text>Splash</Text>
            //  <SafeAreaView  style={styles.container}>
            //     {(this.state.isLoading) &&
            //             <View style={{flex:1,justifyContent:'center',position:'absolute',top:'50%',left:'40%'}}>
            //                 <ActivityIndicator 
            //                  color="#00ff00"
            //                  size="large"
                            
            //                    style={{
            //                       backgroundColor: "rgba(204,55,57,.8)",
            //                       height: 80,
            //                       width: 80,
            //                       zIndex: 999,
            //                       borderRadius: 15
            //                     }}
                            
            //                     size="small"
            //                     color="#0000ff"
            //                   /> 

            //             </View>}

            //    <ScrollView>
                 
            //         <ImageBackground   imageStyle={{ borderRadius: 15}} source={require('./assets/32.png')} style={styles.image}>
                      
            //             <Image style={styles.image1} source={require('./assets/33.png')}></Image>
            //             <Image style={styles.logo} source={require('./assets/36.png')}></Image>

            //         </ImageBackground>

            //      <View style={{marginTop:30}}>
            //      <TouchableOpacity
            //     onPress={() => this.props.navigation.navigate('SendSMS',{Id:'1'})}
            //     >
            //       <Text>Press</Text>
            //       </TouchableOpacity>
            //          <Text style={styles.text1}>
            //            {this.state.Id}
            //              Sharing with others helps them to{"\n"} achieve their dreams.
            //          </Text>
            //          <Text style={styles.text2}>
            //              Start your fundrasier now.
            //          </Text>
            //      </View>

            //      <View style={styles.searchSection}> 
            //         <Image style={styles.searchIcon} source={require('./assets/05.png')}/>
            //           <TextInput autoCorrect={false}
            //                onChangeText={(email) => this.setState({email})}
            //               //value='garun@delimp.com'
            //               placeholder="Login with Email"
            //               style={styles.input}
            //             >
            //           </TextInput>
            //      </View>

            //      <View style={styles.searchSection}> 
            //           <Image style={styles.searchIcon} source={require('./assets/34.png')}/>
            //             <TextInput autoCorrect={false}
            //              onChangeText ={(password) => this.setState({password})}
            //             //value='123456'
            //             secureTextEntry={true}
            //               placeholder="Password"
            //               style={styles.input}
            //               >
            //           </TextInput>
            //      </View>

               
            //      <TouchableOpacity style={styles.button} 
            //       onPress={() => this.on_login()}>
            //           <Text style={styles.SubmitText}>Submit</Text>
            //     </TouchableOpacity>
                
               
            //    <View style={{flexDirection:'row',alignSelf:'center'}}>
            //      <Text style={styles.text3}> Don't have an account?</Text>
            //         <TouchableOpacity 
            //               onPress={() => this.props.navigation.navigate('Home')}>
            //             <Text style={styles.text4}>Sign up</Text>
            //         </TouchableOpacity>
                
            //   </View>
            
            //     </ScrollView>
            // </SafeAreaView>
        
      }

  }


  const styles = StyleSheet.create({
    container: {
        flex: 1, 
     //   flexDirection: "column",
        backgroundColor:'#fff'
     
      
    },
    
  });
  
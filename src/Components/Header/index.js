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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ApiScreen } from "../../API/ApiScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { back } from "react-native/Libraries/Animated/Easing";

  export default class Home extends Component {

    constructor(props) {
        
      super(props);
        this.state = {
        dataSource:[],
        name:''
        };
      
      }

      componentDidMount = async () => {

        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
        console.log('#################3',data)
        this.access_token =data.token
        console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);

        const url = ApiScreen.base_url + ApiScreen.me
        console.log("url:"+url);
        fetch(url ,
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
                console.log('getting data from fetch',responseJson.data.name)
              
               // setTimeout(() => {
                    this.setState({
                      //  isloading: false,
                       dataSource:responseJson.data,
                       name : responseJson.data.name
                    })
                //}, 2000)
        
            })
            .catch(error => console.log(error))
        
      }

      render(){
        
        return(

            <View style={styles.header}>
              
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()} style={{width:wp('48%')}}>
                   <Image
                       style={{
                       margin: 10,
                       // tintColor: '#f05c54',
                       width: 30,
                       height: 30,
                       
                       }}
                       source={require('../../assets/02.png')}
                   />
            </TouchableOpacity>
            <TouchableOpacity style={{width:wp('48%'),flexDirection:'row',marginTop:10,justifyContent:'flex-end'}}
            onPress={()=> this.props.navigation.navigate('EditProfile')}
            >
                <Text style={styles.usertext}>{this.state.name}:</Text>
                <Image style={styles.userimg} source={require('../../assets/icon.png')}/>
              
            </TouchableOpacity>
           
       </View>


        )
      }
    }


    const styles = StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor:'#F8F8F8'
       
          
        },
        header:{
                flexDirection:'row',
                borderBottomWidth:1,
                borderBottomColor:'#F2F2F2',
               
                padding:10
        },
        usertext:{
            fontFamily:'Poppins-SemiBold',
            color:'#5F5F5F',
            paddingTop:5,
            fontSize:14,
           
        },
        userimg:{
                height:30,
                width:30,
                
        },

    })

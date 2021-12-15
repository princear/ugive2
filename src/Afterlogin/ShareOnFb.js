import React from 'react';
import { Text, Image, View, StyleSheet,Alert,ActivityIndicator,
    TouchableOpacity,TextInput } from 'react-native';
import {ApiScreen} from '../API/ApiScreen'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-community/async-storage";
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { ScrollView } from 'react-native-gesture-handler';
import Share from 'react-native-share';



class ShareOnFb extends React.Component {


    constructor(props) {
        super(props);
        this.state={
          isLoading:false,
            dataSource:[],
            ShareLink:'',
           
        }
       
      }

     MyFacebookShare = async () => {
        const login = await AsyncStorage.getItem('login');
        
        let data = JSON.parse(login);
    
        this.access_token =data.token
       


        const url = ApiScreen.base_url + ApiScreen.ShareOnSocial
        console.log("url<<<<<<<<<<<<<<<<:"+url);
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
                console.log('getting data from fetchaaaaaaaaaaa',responseJson.data[0].url)

                const shareOptions = {
                    // title: 'Title',
                    // quote: 'Hello',
                    social: Share.Social.FACEBOOK,
                    url: responseJson.data[0].url,
                }
                try {
                    const ShareResponse =  Share.shareSingle(shareOptions)
                    .then((res) => {
                      console.log('>>>????????????',res);
                    })
                    .catch((err) => {
                      err && console.log(err);
                    });
                    console.log('>>>>>>>>>.',ShareResponse)
                    
                } catch (error) {
                    console.log('error =>', error)
                }
    
              
                // setTimeout(() => {
                //     this.setState({
                //         isLoading: false,
                //        ShareLink:responseJson.data[0].url,
                     
                //     })
                // }, 2000)
        
                
            })
            .catch(error => console.log(error))
        

     
           
    }




    MyTwitterShare = async () => {

        const login = await AsyncStorage.getItem('login');
        
        let data = JSON.parse(login);
    
        this.access_token =data.token
       


        const url = ApiScreen.base_url + ApiScreen.ShareOnSocial
        console.log("url<<<<<<<<<<<<<<<<:"+url);
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
                console.log('getting data from fetchaaaaaaaaaaa',responseJson.data[0].url)

                const shareOptions = {
                    // title: 'Title',
                    // quote: 'Hello',
                    social: Share.Social.TWITTER,
                    url: responseJson.data[0].url,
                }
                try {
                    const ShareResponse =  Share.shareSingle(shareOptions)
                    .then((res) => {
                      console.log('>>>????????????',res);
                    })
                    .catch((err) => {
                      err && console.log(err);
                    });
                    console.log('>>>>>>>>>.',ShareResponse)
                    
                } catch (error) {
                    console.log('error =>', error)
                }
    
              
                // setTimeout(() => {
                //     this.setState({
                //         isLoading: false,
                //        ShareLink:responseJson.data[0].url,
                     
                //     })
                // }, 2000)
        
                
            })
            .catch(error => console.log(error))
        

      
 
      
}

    componentDidMount = async () => {
      const  AppName = this.props.route.params.AppName;


        console.log('>>>>>>>>>>>>>.',AppName);

      

        if(AppName == 'Facebook'){
                this.MyFacebookShare()

        }
        else{
            this.MyTwitterShare();
        }

       
        this.props.navigation.navigate('Homep');
    }
        

    render(){
        return(
            <View>

            </View>
        )
    }
}

export default ShareOnFb;

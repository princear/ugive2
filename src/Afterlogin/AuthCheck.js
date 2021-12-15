import React, {Component} from 'react';

import {View, StyleSheet, Alert, Image, ActivityIndicator,Linking} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

export default class AuthCheck extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading:false,
      login: false,
    };

  }

  componentDidMount() {

    console.log('wokring from Auth check');

    // setTimeout(() => {
    // this.setState({isLoading:true});
    // this.setState({isLoading:false});     
    // this.readData();
    // }, 2000);
  

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

  readData = async () => {
 
     
      const login = await AsyncStorage.getItem('login');
      

      if (login !== null) {
       

        this.props.navigation.replace('Home');

      } 
      
      else {
        
       // this.setState({isLoading:true})
        this.props.navigation.replace('Login');
       // this.setState({isLoading:false})
      }
   
  };


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

      setTimeout(() => {
        
        this.readData();
        }, 1000);
     }

     else{

      this.setState({
        isLoading:true
      })
      
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>456');
    const { navigate } = this.props.navigation;

    const route = url.replace(/.*?:\/\//g, '');
    const id = route.match(/\/([^\/]+)\/?$/)[1];
  
    //  const routeName = route.split('/')[0];
  
    this.props.navigation.navigate('people',{id,name:'chris'})
   
    // if (routeName === 'people') {
    //   navigate('people', { id, name: 'chris' })
    //   console.log('id',id)
    // };
  
  }

  }


  render() {

    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      
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
    );
  }
}

const styles = StyleSheet.create({
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width:'100%',
    height:'100%',
    
    
        resizeMode: 'stretch'
        
  }
});

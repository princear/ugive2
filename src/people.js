import React from 'react';
import { Text, Image, View, StyleSheet,Alert,ActivityIndicator,
        TouchableOpacity,FlatList } from 'react-native';
import {ApiScreen} from './API/ApiScreen'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

//import AsyncStorage from "@react-native-community/async-storage";

// const people = {

//   0: {

//     name: 'Leela',
//     image: 'https://vignette1.wikia.nocookie.net/en.futurama/images/d/d4/Turanga_Leela.png/revision/latest?cb=20150218013044',
  
//   },

//   1: {
//     name: 'Bender',
//     image: 'https://vignette2.wikia.nocookie.net/en.futurama/images/4/43/Bender.png/revision/latest?cb=20150206072725',
//   },

//   2: {
//     name: 'Amy',
//     image: 'https://i.ytimg.com/vi/4sCtTq7K3yI/hqdefault.jpg',
//   },

//   3: {
//     name: 'Fry',
//     image: 'https://68.media.tumblr.com/6407f6763cc78a289ee88160838a29b4/tumblr_nqdq8jkmTS1uz53k3o1_400.jpg',
//   }

// }

class People extends React.Component {


  constructor(props) {
      
    super(props);
      this.state = {

        isLoading:false,
        dataSource:[],
        one:'',
        two:'',
        three:'',
        four:'',
        email:'',
        name:''

      };
    
    }

  
  static navigationOptions = {
    title: 'People',
  };

  componentDidMount(){
   
 
    this.setState({
      isLoading:true

  })

     const id = this.props.route.params.id.split('?')[0];
  
      const dd = JSON.stringify({  participant_id :id})
      console.log('<<<<<<<<<>>>>>>>>>>>>>}}}}}}}}}}',id.split('_')[0],dd)
    const url = ApiScreen.base_url + ApiScreen.start;

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
            
             participant_id : id.split('_')[0]
            
          })

      }).then((response) => response.json()).then((responseJson) =>
      
      {
        
        console.log("from loginnnnnnnnnnnnnnnnnnnn*** ",responseJson.data);
       // this.setState({  isLoading:false })


       if(responseJson.data.already_setup == true){

        

          this.props.navigation.navigate('Login');
       }

        else if(responseJson.success == true){
          console.log(responseJson.success)
          
          setTimeout(() => {

            this.setState({
             
               isLoading: false,
               one:responseJson.data.show_message.one,
               two:responseJson.data.show_message.two,
               three:responseJson.data.show_message.three,
               four:responseJson.data.show_message.four,
               email:responseJson.data.email,
               name:responseJson.data.name
             
            })

        }, 2000)

        //console.log("from login ",responseJson.data);
          
        // AsyncStorage.setItem("login",JSON.stringify(responseJson.data));
       
        //this.props.navigation.goBack(null);
        // this.props.navigation.navigate("Home");

         }

         else {

            console.log(responseJson.success)
            this.props.navigation.navigate('Login');
            // const invalid =  responseJson.message
            // Alert.alert(invalid);
         
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

  render() {

   // const id = this.props.route.params.id;
    
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
   
     const id = this.props.route.params.id;
    // if (this.state.dataSource.participant_id != id) return <Text>Sorry, no data exists for this user</Text>
    return (
      <View style={styles.container}>
         
       
         <View style={styles.Headercontainer}>
          <Text style={styles.Headertext}>Welcome {this.state.name},</Text>
          </View>
         
          <View style={styles.textcontainer}>
            <Text style={styles.numtext}>1</Text>
            <Text style={styles.text}>{this.state.one}</Text>
          </View>  

          <View style={styles.textcontainer}>
            <Text style={styles.numtext}>2</Text>
            <Text style={styles.text}>{this.state.two}</Text>
          </View> 

          <View style={styles.textcontainer}>
            <Text style={styles.numtext}>3</Text> 
            <Text style={styles.text}>{this.state.three}</Text>
          </View>

          <View style={styles.textcontainer}>
            <Text style={styles.numtext}>4</Text>    
            <Text style={styles.text}>{this.state.four}</Text>
           
          </View>
        
          
          <TouchableOpacity style={styles.button} 
                      onPress={() => this.props.navigation.navigate('CreateProfile',{
                        id:id,
                        name:this.state.name,
                        email:this.state.email
                        })}>
                      <Text style={styles.SubmitText}>CLICK HERE TO START</Text>
          </TouchableOpacity>

                
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {

    flex: 1, 
    justifyContent:'center'
 
},
  text: {
  
    margin: 10,
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    
  },

  Headertext: {
  
    margin: 10,
    fontSize: 16,
    fontFamily:'Poppins-Bold',
    
  },

  Welcometext:{

   
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    textAlign:'center',
    paddingTop:5,
       
   
  },

  numtext:{

    margin: 10,
    fontSize: 14,
    fontFamily:'Poppins-Regular',
    backgroundColor:'#CC3739',
    height:30,
    width:30,
    textAlign:'center',
    paddingTop:5,
    color:'#fff',    
    borderRadius:100

  },
  
  textcontainer:{

      flexDirection:'row',
      marginRight:10,
      width:wp('85%')

  },

  Headercontainer:{

    flexDirection:'row',
    fontFamily:'Poppins-Bold',
    backgroundColor:'#f5f5fa',
    borderWidth:1,
    borderColor:'#dbdfea'    

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
})

export default People;

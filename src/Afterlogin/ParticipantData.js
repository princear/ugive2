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

  export default class ParticipantData extends Component {

    constructor(props) {
        super(props);
        this.state = {
        
        };
      
      }

      render(){
        
        return(

            <View  style={styles.container}>
              <Header
                navigation={this.props.navigation}
              />      
<View style={styles.greybox}>

<Text style={{fontFamily:'Poppins-SemiBold',fontSize:18,padding:30}}>Participant Data</Text>
<View style={{flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>

<View style={{paddingTop:30,flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>

<View style={{paddingTop:30,flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>
<View style={{paddingTop:30,flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>

<View style={{paddingTop:30,flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>

<View style={{paddingTop:30,flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>
<View style={{paddingTop:30,flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>

<View style={{paddingTop:30,flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>

<View style={{paddingTop:30,flexDirection:'row',width:wp('85%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'#D1D1D1'}}>
    <Text style={{fontSize:16,fontFamily:'Poppins-SemiBold',color:'#CB3A3F'}}>Fundraiser</Text>
    <Text style={{color:'#5F5F5F',fontFamily:'Poppins-SemiBold',fontSize:16,textAlign:'right',marginLeft:wp('35%')}}>11U Area Stars</Text>
</View>
</View>
            </View>
        )
      }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor:'#fff'
   
      
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
    fontSize:14
},
userimg:{
        height:30,
        width:30
},
    greybox:{
       
        backgroundColor:'#F8F8F8',
        marginTop:50,
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        height:hp('100%')
    }

})
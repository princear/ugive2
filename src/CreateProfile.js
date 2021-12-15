import React from 'react';
import { Text, Image, View, StyleSheet,Alert,ActivityIndicator,
    TouchableOpacity,TextInput } from 'react-native';
import {ApiScreen} from './API/ApiScreen'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-community/async-storage";
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { ScrollView } from 'react-native-gesture-handler';



class CreateProfile extends React.Component {


  constructor(props) {
      
    super(props);
      this.state = {

       isLoading:false,
       name:'',
       email:'',
       password:'',

       isLoading:false,
       isPrivate: false,
       isoptional:false,
       isVisible: true,
       
      
       choose_photo:null,
       optional_photo:null,
      
       isUploading:false,
       choose_photo2:'',
       optional_photo2:'',
       video1:null,
       video2:null
      
      
      };
    
    }

  
  static navigationOptions = {

    title: 'People',
 
};


choose_photo() {
  console.log('addd')

  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  }).then(image => {
    console.log(image);
    if (image.path) {
      const source = { uri: image.path,name:'file.jpg',type:'image/jpg'};
        console.log('imagessssssssssssssss',source)
       this.setState({

         choose_photo: source,
         isPrivate:false
     
       });
    }
  });
  // this.setState({
  //   isPrivate: true
  // })
}

choose_picture_model (){
this.setState({
    isPrivate: true
  })

}


choose_photo_model (){
  this.setState({
      isoptional: true
    })

  }

optional_photo() {
  console.log('addd')
  ImagePicker.openPicker({
    width: 300,
    height: 400,
    cropping: true
  }).then(image => {
    console.log(image);
    if (image.path) {
      const source = { uri: image.path,name:'file.jpg',type:'image/jpg'};
        console.log('imagessssssssssssssss',source)
       this.setState({

         optional_photo: source,
         isoptional:false
     
       });
    }
  });
  // this.setState({
  //   isPrivate: true
  // })
  // this.setState({
  //   isoptional: true
  // })
}

modelfalse = () => {



  this.setState({ isPrivate: false })
  this.componentDidMount()


}

modelfalse1 = () => {

  this.setState({ isoptional: false })
  this.componentDidMount()

}

  componentDidMount(){
    const id = this.props.route.params.id;

    console.log('Add donation',id);
   
  }

  add_profile = async() => {

    if(this.state.password == '')
    {
      Alert.alert('Enter Password')
    }

   else if(this.state.choose_photo == null)
   
    {
      Alert.alert('Please select Choose Photo')
    }
   

   else if(this.state.optional_photo == null)
    {
      Alert.alert('Please select optional Photo')
    }


    else{


    const choose_photo1 =  this.state.choose_photo.uri;
   

    const optional_photo1 = this.state.optional_photo.uri;
   

    ImgToBase64.getBase64String(choose_photo1)
  .then(base64String  => {

    if (base64String) {
      const pic1 = "data:image/jpeg;base64," + base64String
       // console.log('imagessssssssssssssss',pic1)
       this.setState({

         choose_photo2: pic1,
     
       });
    }
  
    
  })

  console.log('%%%%%%%%%%%%%%%55',this.state.choose_photo2)

  ImgToBase64.getBase64String(optional_photo1)
  .then(base64String  => {
    if (base64String) {
      const pic2 = "data:image/jpeg;base64," + base64String
       // console.log('imagessssssssssssssss',pic2)
       this.setState({

         optional_photo2: pic2,
     
       });
    }

  })

  
  console.log('&&&&&&&&&&&&&&&&&&',this.state.optional_photo2)
  
    const id = this.props.route.params.id;

    console.log('Add donation',id);
    const name = this.state.name;
    const password = this.state.password;
    const email = this.state.email;
   
    
    //console.log(firstname,lastname,email,mobile,refer);

    this.setState({
      isLoading:true
    })

  
    const addurl = ApiScreen.base_url + ApiScreen.step1 ;
  

    fetch(addurl,

      {
          method: 'POST',
          headers: 
          {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
             
          },

          body: JSON.stringify(
          {
            
           
            participant_id:id.split('_')[0],
            name:name,
            password:password,
            video1:this.state.video1,
              video2:this.state.video2,
              pic1:this.state.choose_photo2,
              pic2:this.state.optional_photo2
             
           
            
          })

      }).then((response) => response.json()).then((responseJson) =>
      
      {
      
      //  console.log("from login*** ",responseJson.data);
        this.setState({  isLoading:false })
      console.log(responseJson.message)
         if(responseJson.response_code == 200){
          //console.log(responseJson.message,responseJson.data[0].fund_heading1)
         Alert.alert(responseJson.message)
        const head1 = responseJson.data[0].fund_heading1;
     
         this.props.navigation.navigate('UpdateMsg',{
          fund_heading1:head1,
           fund_text1:responseJson.data[0].fund_text1,
           fund_heading2:responseJson.data[0].fund_heading2,
           fund_text2:responseJson.data[0].fund_text2,
           fund_photo2:responseJson.data[0].fund_photo2,
           start_no:responseJson.data[0].start_no,
           participant_id:responseJson.data[0].participant_id,
           participant_heading:responseJson.data[0].participant_heading1,
           participant_text:responseJson.data[0].participant_text1

            })

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

  }

  render() {
    const name = this.props.route.params.name;
    const email = this.props.route.params.email;
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

    // const id = this.props.route.params.id;
    // if (this.state.dataSource.participant_id != id) return <Text>Sorry, no data exists for this user</Text>
    return (

      <View>
           <Text style={styles.text2}>CreateProfile</Text>

<ScrollView>
          <View style={styles.textcontainer}>
                
                    <TextInput style={styles.subtext}
                      onChangeText={(name) => this.setState({name})}
                      value={name}
                    placeholder="Name"/>

                    <TextInput style={styles.subtext}
                      onChangeText={(password) => this.setState({password})}
                      secureTextEntry={true}
                    placeholder="Password"/>

                      <TextInput style={styles.subtext}
                      onChangeText={(email) => this.setState({email})}
                      value={email}
                    placeholder="Email"/>


<View style={{ flexDirection: 'row', marginBottom: 10,alignSelf:'center' }}>

<TouchableOpacity
  //onPress={() => this.choose_photo()}
  onPress={() => this.choose_picture_model()}
  //onPress={() => }
  style={styles.imgbutton}>
  <Text style={styles.SubmitText}>CHOOSE PICTURE</Text>
</TouchableOpacity>



<TouchableOpacity
 // onPress={() => this.optional_photo()}
  onPress={() => this.choose_photo_model()}
  style={styles.imgbutton}>
  <Text style={styles.SubmitText}>OPTIONAL PHOTO</Text>
</TouchableOpacity>

</View>

<View style={{ flexDirection: 'row', marginBottom: 10,alignSelf:'center' }}>

{
  this.state.choose_photo && 
  <Image source={{uri:this.state.choose_photo.uri}} style={{height:100,width:100}}/>
}

{
  this.state.optional_photo && 
  <Image source={{uri:this.state.optional_photo.uri}} style={{height:100,width:100}}/>
}
</View>


{this.state.isPrivate == true && (
          // <View>
          //     <Text style={styles.privateTextStyle}>
          //       {I18n.t('add_poll.private_poll_desc')}
          //     </Text>
          //   <Text></Text>

          <Modal isVisible={this.state.isVisible}>
            <View style={{ backgroundColor: 'white', paddingBottom:20}}>

              <TouchableOpacity
                onPress={() => this.modelfalse()}
              >
                <Text style={styles.closemodalStyle}>X</Text>



              </TouchableOpacity>

              <View>
                <Text style={{ textAlign: 'center' }}>Upload Picture or video</Text>

                <View>

                  <View style={styles.searchSection}>
                  <TouchableOpacity
                      onPress={() => this.choose_photo()}
                    
                      style={styles.imgbutton1}>
                      <Text style={styles.SubmitText}>CHOOSE PICTURE</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.searchSection}>
                    <Text style={styles.urltext}>Enter URL of video From youtube or vimeo</Text>
                    <TextInput autoCorrect={false}
                      onChangeText={(video1) => this.setState({ video1 })}
                      //value='garun@delimp.com'
                     // placeholder="First Name"
                      style={styles.input}
                    >
                    </TextInput>
                  </View>
                  <TouchableOpacity
                      onPress={() => this.modelfalse()}
                    
                      style={styles.imgbutton1}>
                      <Text style={styles.SubmitText}>Save</Text>
                    </TouchableOpacity>

                </View>
              </View>
            </View>

          </Modal>

        )}




{this.state.isoptional == true && (
          // <View>
          //     <Text style={styles.privateTextStyle}>
          //       {I18n.t('add_poll.private_poll_desc')}
          //     </Text>
          //   <Text></Text>

          <Modal isVisible={this.state.isVisible}>
            <View style={{ backgroundColor: 'white',paddingBottom:20 }}>

              <TouchableOpacity
                onPress={() => this.modelfalse1()}
              >
                <Text style={styles.closemodalStyle}>X</Text>



              </TouchableOpacity>

              <View>
                <Text style={{ textAlign: 'center' }}>Optional Photo</Text>
                <View>
                <Text style={{ textAlign: 'center' }}>Upload Picture or video</Text>

                <View>

                  <View style={styles.searchSection}>
                  <TouchableOpacity
                      onPress={() => this.optional_photo()}
                    
                      style={styles.imgbutton1}>
                      <Text style={styles.SubmitText}>CHOOSE PICTURE</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.searchSection}>
                    <Text style={styles.urltext}>Enter URL of video From youtube or vimeo</Text>
                    <TextInput autoCorrect={false}
                      onChangeText={(video2) => this.setState({ video2 })}
                      //value='garun@delimp.com'
                     // placeholder="First Name"
                      style={styles.input}
                    >
                    </TextInput>
                  </View>
                  <TouchableOpacity
                      onPress={() => this.modelfalse1()}
                    
                      style={styles.imgbutton1}>
                      <Text style={styles.SubmitText}>Save</Text>
                    </TouchableOpacity>
                 


                </View>
              </View>
              
              </View>
            </View>

          </Modal>

        )}




          <TouchableOpacity style={styles.button} 
                  onPress={() => this.add_profile()}>
                      <Text style={styles.SubmitText}>SAVE & CONTINUE</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
      </View>
    
    )
  }
}

const styles = StyleSheet.create({
  text: {
    margin: 19,
    fontSize: 22,
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

  imgbutton1:{
    backgroundColor:'#CC3739',
    padding:10,
    width:wp('40%'),
    alignSelf:'center',
   marginLeft:10,
   marginTop:10,
   marginBottom:10

  },

  input: {
    width: wp('80%'),
  
    color: '#000',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center', 
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#424242',

  },

  urltext:{
    marginTop:20,
  fontFamily: 'Poppins-Regular',
  alignSelf: 'center',
},

  subtext:{
   margin:5,
   fontFamily:'Poppins-SemiBold',
   fontSize:12,
    //marginTop:50,
   borderRadius:5,
    alignSelf:'center',
     paddingLeft:10,
     width:wp('90%'),
   
      borderColor:'#424242',
      borderWidth:1
     
 },

  SubmitText:{
    textAlign:'center',
    fontFamily:'Poppins-Regular',
    color:'#fff',
    fontSize:16
  },

  text2: {
    color: "#666666",
    fontSize: 16,
   marginTop:15,
   marginBottom:15,
    textAlign: "center",
    fontFamily:'Poppins-SemiBold'
  
  },

  imgbutton:{
    backgroundColor:'#CC3739',
    padding:10,
    width:wp('40%'),
    
   marginLeft:10,
   marginTop:10,
   marginBottom:10

  },
})

export default CreateProfile;

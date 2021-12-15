import React from 'react';
import { Text, Image, View, StyleSheet,Alert,ActivityIndicator,SafeAreaView,BackHandler,
    TouchableOpacity,TextInput } from 'react-native';
import {ApiScreen} from '../API/ApiScreen'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-community/async-storage";
import Header from '../Components/Header/index'
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { ScrollView } from 'react-native-gesture-handler';
import PTRView from 'react-native-pull-to-refresh';
import YouTube from 'react-native-youtube';



class EditProfile extends React.Component {


  constructor(props) {
      
    super(props);
      this.state = {

       isLoading:false,
       isPrivate: false,
       isoptional:false,
       isVisible: true,
       name:'',
       email:'',
       choose_photo:'',
       choose_photoaa:'',
       optional_photo:'',
       optional_photoaa:'',
       password:'',
       isUploading:false,
       choose_photo2:'',
       optional_photo2:'',
       video1:null,
       video2:null,
       participant_video1:'',
       choose_Video_thumb:'',
       optional_Video_thumb:''

      
      
      };
      //this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

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

  componentDidMount = async () => {
   
    this.setState({
        isLoading: true
    })
   
    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);

    let data = JSON.parse(login);
    //  console.log('#################3',data)
    this.access_token = data.token
    //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);

    const url = ApiScreen.base_url + ApiScreen.me
    console.log("url:" + url);

    fetch(url,
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
            // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.name)

            setTimeout(() => {
                this.setState({
                    isLoading: false,
                    
                    // dataSource:responseJson.data,
                    name: responseJson.data.name,
                    email:responseJson.data.login,
                    password:responseJson.data.password,
                })
            }, 2000)

        })
        .catch(error => console.log(error))

  
        const Preview = ApiScreen.base_url + ApiScreen.preview
        console.log("url:"+Preview);
        fetch(Preview ,
          {
            method: 'GET',
            headers: new Headers({
                'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token': this.access_token
            // <-- Specifying the Content-Type
              
          }),
         
          // body: JSON.stringify(
          //   {

          //       donatee_id:'1092'
              
          //   })
      
  
      }).then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from fetchaaaaaaaaaaa',responseJson.data[0].participant_heading1)
              
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                       dataSource:responseJson.data,
                       choose_photoaa : responseJson.data[0].participant_photo1_thumb,
                       optional_photoaa: responseJson.data[0].participant_photo2_thumb,
                       choose_Video_thumb : responseJson.data[0].participant_img_video1,
                       optional_Video_thumb: responseJson.data[0].participant_img_video2,
                      // participant_video1: responseJson.data[0].participant_video1.split("https://www.youtube.com/watch?v=")[1],
                    })
                }, 2000)
        
            })
            .catch(error => console.log(error))
        

   
  }

    
uploadImage = async (image_uri) => {
  this.setState({ isUploading :true });

  let base_url = '';
  let UploadData = new FormData();
  UploadData.append('submit','ok');
  UploadData.append('file',{type:'image/jpg',uri:image_uri,name:'uploadimgtmp.jpg'})
  fetch(base_url,{
    method:'POST',
    body:UploadData
  }).then(response => response.Json())
    .then(response => {
        
      if(response.status)
        {
          this.setState({isUploading :false,choose_photo:base_url+response.image});

        }

        else{
          this.setState({isUploading:false});
          Alert.alert('error',response.message)
        }

    }).catch(() => {

      this.setState({isUploading:false});
      Alert.alert('error',response.message)

    })
}

  add_profile = async() => {

   console.log('vedio2',this.state.video2)

 
    

if( this.state.choose_photo.uri){
  const choose_photo1 =  this.state.choose_photo.uri;


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

  console.log('%%%%%%%%%%%%%%%choosephoto255',this.state.choose_photo2)
}
else{
  this.setState({
    choose_photo2:this.state.choose_photoaa
  })

}

if(this.state.optional_photo.uri){
  const optional_photo1 = this.state.optional_photo.uri;


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
}
else{

  this.setState({
    optional_photo2:this.state.optional_photoaa
  })
}
  
 

    const name = this.state.name;
    const password = this.state.password;
    const email = this.state.email;

   
  
   
    
    // console.log('%%%%%%%%%%%%%%%%%%%%',name,password,email,choose_photo2,optional_photo2);
  

     this.setState({
       isLoading:true
     })

     const login = await AsyncStorage.getItem('login');
    
 
     let data = JSON.parse(login);
     //  console.log('#################3',data)
     this.access_token = data.token
     const addurl = ApiScreen.base_url + ApiScreen.update_profile ;
  

     fetch(addurl,

      {
          method: 'POST',
          headers: 
          {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'token': this.access_token
          },

        body:  JSON.stringify(
            {
              
             
              name:name,
              password:password,
              video1:this.state.video1,
              video2:this.state.video2,
              pic1:this.state.choose_photo2,
              pic2:this.state.optional_photo2
             
              
            })

      }).then((response) => response.json()).then((responseJson) =>
      
      {
      
        console.log("from login*** ",responseJson.data.token,this.state.choose_photo2);
        this.setState({  isLoading:false })
        console.log(responseJson.message)
         if(responseJson.response_code == 200){
          AsyncStorage.setItem("login",JSON.stringify(responseJson.data));
          //console.log(responseJson.message,responseJson.data[0].fund_heading1)
         Alert.alert(responseJson.message)
      
         this.props.navigation.navigate("Preview");
     
   
      
        
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


  _refresh =async () => {

    this.setState({
      isLoading: true
  })
 
  const login = await AsyncStorage.getItem('login');
  //console.log("dashboard", login);

  let data = JSON.parse(login);
  //  console.log('#################3',data)
  this.access_token = data.token
  //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);

  const url = ApiScreen.base_url + ApiScreen.me
  console.log("url:" + url);

  fetch(url,
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
          // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.name)

          setTimeout(() => {
              this.setState({
                  isLoading: false,
                  
                  // dataSource:responseJson.data,
                  name: responseJson.data.name,
                  email:responseJson.data.login,
                  password:responseJson.data.password,
              })
          }, 2000)

      })
      .catch(error => console.log(error))


      const Preview = ApiScreen.base_url + ApiScreen.preview
      console.log("url:"+Preview);
      fetch(Preview ,
        {
          method: 'GET',
          headers: new Headers({
              'Accept': 'application/json',
            'Content-Type': 'application/json',
            'token': this.access_token
          // <-- Specifying the Content-Type
            
        }),
       
        // body: JSON.stringify(
        //   {

        //       donatee_id:'1092'
            
        //   })
    

    }).then(response => response.json())
          .then((responseJson) => {
              console.log('getting data from ',responseJson.data[0].participant_img_video1)
            
              setTimeout(() => {
                  this.setState({
                      isLoading: false,
                     dataSource:responseJson.data,
                     choose_photoaa : responseJson.data[0].participant_photo1_thumb,
                     optional_photoaa: responseJson.data[0].participant_photo2_thumb,
                     choose_Video_thumb : responseJson.data[0].participant_img_video1,
                     optional_Video_thumb: responseJson.data[0].participant_img_video2,

                  })
              }, 2000)
      
          })
          .catch(error => console.log(error))
      

  }

  
 


  render() {
   // const name = this.props.route.params.name;
   // const email = this.props.route.params.email;
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
    // const id = this.props.route.params.id;
    // if (this.state.dataSource.participant_id != id) return <Text>Sorry, no data exists for this user</Text>
    return (


        <SafeAreaView style={styles.container}>
  
        {/* {(this.state.isLoading) &&
          <View style={{ flex: 1, justifyContent: 'center', position: 'absolute', top: '50%', left: '40%' }}>

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

          </View>} */}

        <Header
          navigation={this.props.navigation}
        />

        
<PTRView onRefresh={this._refresh} >

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


      <View>
           <Text style={styles.text2}>Edit Your Profile</Text>
<ScrollView>
          <View style={styles.textcontainer}>
                
                    <TextInput style={styles.subtext}
                      onChangeText={(name) => this.setState({name})}
                      value={this.state.name}
                    placeholder="Name"/>

                    <TextInput style={styles.subtext}
                      onChangeText={(password) => this.setState({password})}
                      value={this.state.password}
                      secureTextEntry={true}
                    placeholder="Password"/>

                      <TextInput style={styles.subtext}
                     onChangeText={(email) => this.setState({email})}
                     value={this.state.email}
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

<View style={{ flexDirection: 'row', marginBottom: 10,alignSelf:'center', }}>



                {(() => {
                        if (this.state.choose_photo == '' && this.state.choose_Video_thumb == null) {
                          return (
                            <View/>
                          )
                        }

                        else if (this.state.choose_photo == '') {
                          return (
                            <View>

                                <Image source={{uri:this.state.choose_photoaa}} style={{height:100,width:100,margin:5}}/>
                            </View>
                          )
                        }

                        else if (this.state.choose_photo) {
                          return (
                            <View>

                                <Image source={{uri:this.state.choose_photo.uri}} style={{height:100,width:100,margin:5}}/>
                            </View>
                          )
                        }

                        else {
                          return (
                            <View>
                              <Image
                                style={{ height: 100, width: 100,margin:5 }}
                                source={{ uri: this.state.choose_Video_thumb }} />

                            </View>
                          )
                        }
                      })()}




{/* {
  this.state.choose_photo != '' ?
  <Image source={{uri:this.state.choose_photo.uri}} style={{height:100,width:100}}/>:
 
  <Image source={{uri:this.state.choose_photoaa}} style={{}}/>
} */}



{/* {
  this.state.optional_photo  != '' ?
  <Image source={{uri:this.state.optional_photo.uri}} style={{height:100,width:100}}/>:
  <Image source={{uri:this.state.optional_photoaa}} style={{marginLeft:20}}/>
} */}


{(() => {
                        if (this.state.optional_photo == '' && this.state.optional_Video_thumb == null) {
                          return (
                           <View/>
                          )
                        }

                        else if (this.state.optional_photo == '') {
                          return (
                            <View>

                                <Image source={{uri:this.state.optional_photoaa}} style={{height:100,width:100,margin:5}}/>
                            </View>
                          )
                        }

                        else if (this.state.optional_photo) {
                          return (
                            <View>

                                <Image source={{uri:this.state.optional_photo.uri}} style={{height:100,width:100,margin:5}}/>
                            </View>
                          )
                        }

                        else {
                          return (
                            <View>
                              <Image
                                style={{ height: 100, width: 100,margin:5 }}
                                source={{ uri: this.state.optional_Video_thumb }} />

                            </View>
                          )
                        }
                      })()}





</View>

          <TouchableOpacity style={styles.button} 
                  onPress={() => this.add_profile()}>
                      <Text style={styles.SubmitText}>SAVE</Text>
          </TouchableOpacity>
            </View>
            </ScrollView>
            
      </View>
      </PTRView>
      </SafeAreaView>
     
    
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

  imgbutton:{
    backgroundColor:'#CC3739',
    padding:10,
    width:wp('40%'),
    
   marginLeft:10,
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


  subtext:{
    margin:5,  
    color: '#6F6F6F',
   
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
 input: {
    width: wp('80%'),
    //textAlign:'center',
   
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#424242',

    //  borderRadius:30,
    //  backgroundColor:'red'
  },
  urltext:{
      marginTop:20,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
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
})

export default EditProfile;

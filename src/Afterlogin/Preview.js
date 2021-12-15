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
    ScrollView,FlatList
  } from "react-native";
  import VideoPlayer from 'react-native-video-player';
  import YouTube from 'react-native-youtube';
  import Video from 'react-native-video';
  import { Vimeo } from 'react-native-vimeo-iframe'
  import React, { Component } from "react";
  import Dialog from "react-native-dialog";
  import { Table, Row, Rows } from 'react-native-table-component';
  import {Picker} from '@react-native-picker/picker';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import Header from '../Components/Header/index'
  import { ApiScreen } from "../API/ApiScreen";
  import AsyncStorage from "@react-native-community/async-storage";
  import Modal from 'react-native-modal';
  import { WebView } from 'react-native-webview'
  
  

  export default class Preview extends Component {

    constructor(props) {
        super(props);
        this.state={
          isLoading:false,
            dataSource:[],
            logo:'',
            isVisible:true,
            isPrivate: false,
            participant_text:'',
            participant_heading:'',
            participant_video1:null,
            participant_video2:null,
            videoUrl:'',
            thumbnailUrl:'',
            video:'',
            banner_video:''
        }
       
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


       




        const url = ApiScreen.base_url + ApiScreen.preview
        console.log("url:"+url);
        fetch(url ,
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
               // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data[0].participant_heading1)
              
                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                       dataSource:responseJson.data,
                      participant_heading : responseJson.data[0].participant_heading1,
                      participant_text: responseJson.data[0].participant_text1,
                      // participant_video1: responseJson.data[0].participant_video1.split("https://www.youtube.com/watch?v=")[1],
                      // participant_video2: responseJson.data[0].participant_video1.split("https://www.youtube.com/watch?v=")[1]
                    })
                }, 2000)
        
                // console.log('vedio>>>>>>>>',this.state.participant_video1)
            })
            .catch(error => console.log(error))
        

      }

      Edit_Donor_msg = async() => {

          console.log(this.state.participant_text,this.state.participant_heading)

          const heading = this.state.participant_heading;
          const text = this.state.participant_text;

        
           
            const login = await AsyncStorage.getItem('login');
          
    
            let data = JSON.parse(login);
          //  console.log('#################3',data)
            this.access_token =data.token
            //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);
    
            const meurl = ApiScreen.base_url + ApiScreen.edit_message
            console.log("url:"+meurl);
          
            fetch(meurl ,
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
                  
  
                  heading:heading,
                  message:text,
                
                })
    
          }).then(response => response.json())
                .then((responseJson) => {
                   // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.current_fund)
                
                    if(responseJson.success == true){
                     console.log(responseJson.message)
                       Alert.alert(responseJson.message)
                       this.setState({isPrivate:false})
                       this.componentDidMount()   
                  
                    }
     
                    else{
     
                       console.log(responseJson.message)
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

      Edit_Message(){

        console.log('edit');
        this.setState({
          isPrivate:true
        })
      }

      modelfalse = () => {
   
   

        this.setState({isPrivate:false})
        this.componentDidMount()   
            
    
    }


      render(){

        const state = this.state;
        const logourl = 'https://ugive2.com/dashboard/public/images/upload_petimage/thumb/'+ this.state.logo;
        return(
        
        <View style={styles.container}>

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
              <Header
                navigation={this.props.navigation}
              />

                <View style={styles.One}>
                 
                    {/* <Image style={styles.smsimg} source={require('../assets/03.png')}/> */}
                    <Text style={styles.text1}>Preview Your Fundraiser</Text>
               
                </View>

            <View style={{flexDirection:'row',marginBottom:20}}>

                    <TouchableOpacity style={styles.button}
                      onPress={()=> this.props.navigation.navigate('EditProfile')}>
                        <Text style={styles.SubmitText}>Add/Edit Photo</Text>
                    </TouchableOpacity>

                
                
                <TouchableOpacity style={styles.button}
                onPress={() => this.Edit_Message()}
                >
                        <Text style={styles.SubmitText}>Edit Message</Text>
                    </TouchableOpacity>

                        <TouchableOpacity style={styles.button1}
                          onPress={() => this.props.navigation.navigate('DonorActivity')}
                          >
                            <Text style={{textAlign:'center',fontSize:12,fontFamily:'Poppins-SemiBold'}}>Return</Text>
                        </TouchableOpacity>
              
     
                </View>
           
    {this.state.isPrivate == true && (
                // <View>
                //     <Text style={styles.privateTextStyle}>
                //       {I18n.t('add_poll.private_poll_desc')}
                //     </Text>
                //   <Text></Text>
            
                  <Modal  isVisible={this.state.isVisible}>
                    
                     <View style={{flex:1,backgroundColor:'white',paddingBottom:20,borderColor:'#000',borderWidth:2}}>
                 <ScrollView>
                 <TouchableOpacity
                   onPress={() => this.modelfalse()}
                   >
                      <Text style={styles.closemodalStyle}>X</Text>
                   


                   </TouchableOpacity>

                   <View>
                    <Text style={{textAlign:'center',fontSize:14,fontFamily:'Poppins-SemiBold',paddingBottom:20}}>Edit Your Message</Text>

                    <View>

                    <View style={styles.searchSection}> 
                  
                      <TextInput autoCorrect={false}
                           onChangeText={ participant_heading => this.setState({ participant_heading : participant_heading }) }
                           value={this.state.participant_heading}
                          placeholder="Heading"
                          style={styles.input}
                        >
                      </TextInput>
                      
                 </View>

                 <View style={styles.searchSection}> 
                  
                  <TextInput autoCorrect={false}
                      onChangeText={ participant_text => this.setState({ participant_text : participant_text }) }
                      value={this.state.participant_text}
                      placeholder="Message"
                      style={styles.msgtext}
                      multiline={true}
                      numberOfLines={10}
                    >
                  </TextInput>
             </View>

        

             <TouchableOpacity style={styles.button2} 
                 onPress={() => this.Edit_Donor_msg()}
                 >
                  <Text style={styles.SubmitText}>Update</Text>
                </TouchableOpacity>

                    </View>
                    </View> 
                    </ScrollView>
                   </View>
                  
                  </Modal>
                
                )}
         


           <FlatList
     
     data={this.state.dataSource}
     keyExtractor={(item, index) => index}
     horizontal={false}
   
     renderItem={({ item, index }) => (
       
      <View>


<View 
         

style={{padding:10,resizeMode:'contain',flex:1,backgroundColor:'#CC0000'}}>
 
{/* {item.fund_logo == '' ? 
<View/>:
<View style={styles.imagecontain}>

<Image
style={styles.image}
source={{uri:item.fund_logo}}/>

</View>

} */}



{(() => {
                        if (item.banner_type == '') {
                          return (
                            <View />
                          )
                        }

                        else if (item.banner_type == 'yes') {
                          return (
                            <View style={styles.imagecontain}>

                            <VideoPlayer
                                                video={{ uri: item.banner_video_url }}
                                                style={ styles.equipvideo }
                                                fullScreenOnLongPress
                                                //onShowControls	={true}
                                                fullscreen={true}
                                                resizeMode="cover"
                                                controls={true}
                                                paused={false}
                                                autoplay={false}
                                                thumbnail={{uri:item.fund_logo}}
                                                ref={(ref) => {
                                                this.player = ref
                                                }} />
                            
                            </View>
                          )
                        }

                        else {
                          return (
                            <View style={styles.imagecontain}>

                            <Image
                            style={styles.image}
                            source={{uri:item.fund_logo}}/>
                            
                            </View>
                          )
                        }
                      })()}






                   

<ScrollView
horizontal={true}
>
<View style={{padding:20,flexDirection:'row',alignContent:'space-between'}}>


  


                {(() => {
                        if (item.fund_photo1 == '' && item.fund_video1 == '') {
                          return (
                            <View />
                          )
                        }

                        else if (item.fund_photo1 == '') {
                          return (
                            <View>
                                
                                {item.fund_video1.includes('youtube') ?
                                
                                <YouTube
                                apiKey='AIzaSyC9_3qqiPcYuXb8VhEp0rEwBIXIbNEeapI'

                                videoId={item.fund_video1.split("https://www.youtube.com/watch?v=")[1]} // The YouTube video ID
                                play={false} // control playback of video with true/false
                                autoplay={false}
                                //fullscreen // control whether the video should play in fullscreen or inline
                                //loop // control whether the video should loop when ended
                                //onReady={e => this.setState({ isReady: true })}
                                //onChangeState={e => this.setState({ status: e.state })}
                                //onChangeQuality={e => this.setState({ quality: e.quality })}
                                //onError={e => this.setState({ error: e.error })}
                                style={{height:200,width:200,marginRight:5}}
                              />
                                
                                
                                :
                                <View>
                                {console.log(item.fund_video1.split("https://vimeo.com/")[1])}
                                <Vimeo
                                videoId={item.fund_video1.split("https://vimeo.com/")[1]}
                                onReady={() => console.log('Video is ready')}
                                onPlay={() => console.log('Video is playing')}
                                onPlayProgress={(data) => console.log('Video progress data:', data)}
                                onFinish={() => console.log('Video is finished')}
                                loop={false}
                                autoPlay={false}
                                controls={true}
                                speed={false}
                                time={'0m0s'}
                                fullscreen={true}
                                style={{height:200,width:200,marginRight:5}}
                              />
                                </View>
                        }
                            </View>
                          )
                        }

                        else {
                          return (
                            <View>
                              <Image
                                style={{  height: 200, width: 200,marginRight:5 }}
                                source={{ uri: item.fund_photo1 }} />

                            </View>
                          )
                        }
                      })()}



                      {(() => {
                        if (item.fund_photo2 == '' && item.fund_video2 == '') {
                          return (
                            <View />
                          )
                        }

                        else if (item.fund_photo2 == '') {
                          return (
                            <View>

                                {item.fund_video2.includes('youtube') ?
                                
                                <YouTube
                                apiKey='AIzaSyC9_3qqiPcYuXb8VhEp0rEwBIXIbNEeapI'

                                videoId={item.fund_video2.split("https://www.youtube.com/watch?v=")[1]} // The YouTube video ID
                                play={false} // control playback of video with true/false
                                autoplay={false}
                                //fullscreen // control whether the video should play in fullscreen or inline
                                //loop // control whether the video should loop when ended
                                //onReady={e => this.setState({ isReady: true })}
                                //onChangeState={e => this.setState({ status: e.state })}
                                //onChangeQuality={e => this.setState({ quality: e.quality })}
                                //onError={e => this.setState({ error: e.error })}
                                style={{height:200,width:200,marginRight:5}}
                              />
                                
                                
                                :

                                <View>
                                {console.log(item.fund_video2.split("https://vimeo.com/")[1])}
                                <Vimeo
                                videoId={item.fund_video2.split("https://vimeo.com/")[1]}
                                onReady={() => console.log('Video is ready')}
                                onPlay={() => console.log('Video is playing')}
                                onPlayProgress={(data) => console.log('Video progress data:', data)}
                                onFinish={() => console.log('Video is finished')}
                                loop={false}
                                autoPlay={false}
                                controls={true}
                                speed={false}
                                time={'0m0s'}
                                fullscreen={true}
                                style={{height:200,width:200,marginRight:5}}
                              />

                               </View>
                        }
                            </View>
                          )
                        }

                        else {
                          return (
                            <View>
                              <Image
                                style={{ height: 200, width: 200,marginRight:5}}
                                source={{ uri: item.fund_photo2 }} />

                            </View>
                          )
                        }
                      })()}




{(() => {
                        if (item.participant_photo1 == '' && item.participant_video1 == null) {
                          return (
                            <View />
                          )
                        }

                        else if (item.participant_photo1 == '') {
                          return (
                            <View>
                                {item.participant_video1.includes('youtube') ?
                                
                                <YouTube
                                apiKey='AIzaSyC9_3qqiPcYuXb8VhEp0rEwBIXIbNEeapI'

                                videoId={item.participant_video1.split("https://www.youtube.com/watch?v=")[1]} // The YouTube video ID
                                play={false} // control playback of video with true/false
                                autoplay={false}
                                //fullscreen // control whether the video should play in fullscreen or inline
                                //loop // control whether the video should loop when ended
                                //onReady={e => this.setState({ isReady: true })}
                                //onChangeState={e => this.setState({ status: e.state })}
                                //onChangeQuality={e => this.setState({ quality: e.quality })}
                                //onError={e => this.setState({ error: e.error })}
                                style={{height:200,width:200,marginRight:5}}
                              />
                                
                                
                                :
                                <View>
                                {console.log(item.participant_video1.split("https://vimeo.com/")[1])}
                                <Vimeo
                                videoId={item.participant_video1.split("https://vimeo.com/")[1]}
                                onReady={() => console.log('Video is ready')}
                                onPlay={() => console.log('Video is playing')}
                                onPlayProgress={(data) => console.log('Video progress data:', data)}
                                onFinish={() => console.log('Video is finished')}
                                loop={false}
                                autoPlay={false}
                                controls={true}
                                speed={false}
                                time={'0m0s'}
                                fullscreen={true}
                                style={{height:200,width:200,marginRight:5}}
                              />
                                </View>
                                
                                }
                             
                            </View>
                          )
                        }

                        else {
                          return (
                            <View>
                              <Image
                                style={{  height: 200, width: 200,marginRight:5}}
                                source={{ uri: item.participant_photo1_thumb }} />

                            </View>
                          )
                        }
                      })()}



{(() => {
                        if (item.participant_photo2 == '' && item.participant_video2 == null) {
                          return (
                            <View />
                          )
                        }

                        else if (item.participant_photo2 == '') {
                          return (
                            <View>

                            {item.participant_video2.includes('youtube') ?
                                
                                <YouTube
                                apiKey='AIzaSyC9_3qqiPcYuXb8VhEp0rEwBIXIbNEeapI'

                                videoId={item.participant_video2.split("https://www.youtube.com/watch?v=")[1]} // The YouTube video ID
                                play={false} // control playback of video with true/false
                                autoplay={false}
                                //fullscreen // control whether the video should play in fullscreen or inline
                                //loop // control whether the video should loop when ended
                                //onReady={e => this.setState({ isReady: true })}
                                //onChangeState={e => this.setState({ status: e.state })}
                                //onChangeQuality={e => this.setState({ quality: e.quality })}
                                //onError={e => this.setState({ error: e.error })}
                                style={{height:200,width:200,marginRight:5}}
                              />
                                
                                
                                :
                                <View>
                                {console.log(item.participant_video2.split("https://vimeo.com/")[1])}
                                <Vimeo
                                videoId={item.participant_video2.split("https://vimeo.com/")[1]}
                                onReady={() => console.log('Video is ready')}
                                onPlay={() => console.log('Video is playing')}
                                onPlayProgress={(data) => console.log('Video progress data:', data)}
                                onFinish={() => console.log('Video is finished')}
                                loop={false}
                                autoPlay={false}
                                controls={true}
                                speed={false}
                                time={'0m0s'}
                                fullscreen={true}
                                style={{height:200,width:200,marginRight:5}}
                              />
                                </View>
                        }
                            </View>
                          )
                        }

                        else {
                          return (
                            <View>
                              <Image
                                style={{ height: 200, width: 200,marginRight:5 }}
                                source={{ uri: item.participant_photo2_thumb }} />

                            </View>
                          )
                        }
                      })()}



</View> 

</ScrollView>
<View style={styles.greybox}>
<Text style={styles.textcontainer1}>{item.fund_heading1}</Text>
<Text style={styles.textcontainer2}>{item.fund_text1}</Text>
<Text style={styles.textcontainer1}>{item.fund_heading2}</Text>
<Text style={styles.textcontainer2}>{item.fund_text2}</Text>
<Text style={styles.textcontainer1}>{item.participant_heading1}</Text>
<Text style={styles.textcontainer2}>{item.participant_text1}</Text>

</View>
 



</View>

  
         {/* <ImageBackground 
         
          source={{uri:item.background.b_id}}
         style={{padding:10,resizeMode:'contain',flex:1}}>
           
  {item.fund_logo == '' ? 
  <View/>:
    <View style={styles.imagecontain}>
        
    <Image
    style={styles.image}
    source={{uri:item.fund_logo}}/>
   
</View>

}

      <ScrollView
      horizontal={true}
      >
   <View style={{padding:20,flexDirection:'row',alignContent:'space-around'}}>

   {item.fund_photo1 == '' ? 
  <View/>:

      <View>
          <Image
                style={{height:100,width:100}}
                source={{uri:item.fund_photo1}}/>
          
    </View>
     }
 {item.fund_photo2 == '' ? 
  <View/>:
     
    <View style={{marginLeft:10}}>
          <Image
              style={{height:100,width:100}}
              source={{uri:item.fund_photo2}}/>
    </View>
     }

{item.participant_photo1_thumb == '' ? 
  <View/>:
    <View style={{marginLeft:10}}>
          <Image
              style={{height:100,width:100}}
              source={{uri:item.participant_photo1_thumb}}/>

               


    </View>
    
     }

{item.participant_photo2_thumb == '' ? 
  <View/>:
    <View style={{marginLeft:10}}>
          <Image
              style={{height:100,width:100}}
              source={{uri:item.participant_photo2_thumb}}/>
    </View>
     }     
  </View> 
  </ScrollView>
      <View style={styles.greybox}>
      <Text style={styles.textcontainer1}>{item.fund_heading1}</Text>
      <Text style={styles.textcontainer2}>{item.fund_text1}</Text>
      <Text style={styles.textcontainer1}>{item.fund_heading2}</Text>
      <Text style={styles.textcontainer2}>{item.fund_text2}</Text>
      <Text style={styles.textcontainer1}>{item.participant_heading1}</Text>
      <Text style={styles.textcontainer2}>{item.participant_text1}</Text>
  
  </View>
           



  </ImageBackground> */}
     
</View>

     
     )}
   />   
  
                {/* <Dialog.Container visible={true}>
                        <Dialog.Title style={{fontFamily:'Poppins-SemiBold',alignSelf:'center',fontSize:18}}>"RWConnect" Would You Like To</Dialog.Title>
                        <Dialog.Title style={{fontFamily:'Poppins-SemiBold',alignSelf:'center',fontSize:18}}>Access Your Contact</Dialog.Title>

                        <Dialog.Description style={{alignSelf:'center',fontFamily:'Poppins-Regular',fontSize:12}}>Access is needed to save your RWConnect friends information to your contact list
                        </Dialog.Description>
                        <Dialog.Button style={{alignSelf:'flex-start'}} label="Cancel" />
                        <Dialog.Button label="Delete" />
                </Dialog.Container> */}
               
             
            </View>
        )
      }
    }

    const styles = StyleSheet.create({
       
        container: {

            flex: 1, 
            backgroundColor:'#fff'
         
        },
        imagecontain:{
                height:hp('30%'),
                
               
        },
        closemodalStyle:{
    
          fontSize:22,
          borderRadius:50,
          width:30,
          height:30,
          textAlign:'center',
          alignSelf:'flex-end'
        
        },
        image:{
            height:'100%',
            width:'100%',
           resizeMode:'contain',
           alignSelf:'center'
        },
        input: {
          width:wp('80%'),
         //textAlign:'center',
        // backgroundColor: '#fff',
         fontFamily:'Poppins-Regular',
         alignSelf:'center',
         borderWidth:1,
         color: '#6F6F6F',
         borderColor: '#F2F2F2',
         marginBottom:15
      //  borderRadius:30,
       //  backgroundColor:'red'
      },
        button2:{
          backgroundColor:'#CC3739',
          padding:15,
         width:wp('75%'),
         borderRadius:30,
         alignSelf:'center',
         marginLeft:20,
         marginTop:20,
         marginBottom:10
     
        },
        msgtext:{
          
          width:wp('80%'),
          //textAlign:'center',
         // backgroundColor: '#fff',
          fontFamily:'Poppins-Regular',
          alignSelf:'center',
          borderWidth:1,
          color: '#6F6F6F',
         // borderColor:'#F2F2F2',
         borderColor: '#F2F2F2',
          marginBottom:15,
            textAlignVertical: "top"
         },
        textContainer:{

            fontFamily:'Poppins-SemiBold',
            height:hp('10%'),
            fontSize:12,
            color:'#000'
        },

        pickerContainer:{
        
           // color:'#6C6C6C',
             width:wp('30%'),
             height:hp('5%'),
             borderWidth:1,
             borderRadius:30,
             justifyContent:'center',
             backgroundColor:'#F2F2F2',
             borderColor:'#F2F2F2',
             marginLeft:wp('5%'),
             paddingLeft:10,
             fontFamily:'Poppins-SemiBold',
            
         },

         button:{

            backgroundColor:'#CC3739',
            padding:8,
            width:wp('30%'),
            borderRadius:30,
            marginLeft:10,
            alignSelf:'center'
       
          },

          button1:{
            
            backgroundColor:'#f2f2f2',
            padding:8,
            width:wp('23%'),
            borderRadius:30,
            marginLeft:10,
            alignSelf:'center'
       
          },
 
          SubmitText:{
       
            textAlign:'center',
            fontFamily:'Poppins-Regular',
            color:'#fff',
            fontSize:10
       
        },

        text: {
       
            //margin: 6,
             fontFamily:'Poppins-SemiBold',
             fontSize:10,
           //  textAlign:'center'
             alignSelf:'center',
       
            },

            text2: {
            
                fontFamily:'Poppins-Regular',
                fontSize:10,
                alignSelf:'center',
                padding:10
               
            },

        One:{
       
            flexDirection:'row',
            padding:30,
          
       
        },

        smsimg:{
       
            height:30,
            width:30,
        
        },

        text1:{
        
            fontFamily:'Poppins-SemiBold',
            fontSize:20,
            paddingLeft:10
       
        },
        greybox:{
           // height:hp('60%'),
            backgroundColor:'#F2F2F2',
            marginTop:30,
            paddingBottom:20,
            borderTopLeftRadius:30,
            borderTopRightRadius:30,

        },
        textcontainer1:{
            fontFamily:'Poppins-SemiBold',
            padding:20,
            fontSize:14,
            color:'#2B2B2B'
        },
        textcontainer2:{
            fontFamily:'Poppins-SemiBold',
            paddingLeft:20,
            color:'#929091',
            fontSize:12,
            lineHeight:22
        }

    })

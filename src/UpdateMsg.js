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
  import Video from 'react-native-video';
  import React, { Component } from "react";
  import Dialog from "react-native-dialog";
  import { Table, Row, Rows } from 'react-native-table-component';
  import {Picker} from '@react-native-picker/picker';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  
import { ApiScreen } from './API/ApiScreen'
import AsyncStorage from "@react-native-community/async-storage";
import Modal from 'react-native-modal';

  export default class UpdateMsg extends Component {

    constructor(props) {
        super(props);
        this.state={
          isLoading:false,
            dataSource:[],
            logo:'',
            isVisible:true,
            isVisible1:true,
            isPrivate: false,
            isPrivate1: false,
            participant_text:'',
            participant_heading:''

        }
       
      }


     
      componentDidMount = async () => {
        
        this.setState({
          isLoading:true
        })

        this.setState({
          isLoading: false,
          
          // dataSource:responseJson.data,
          participant_heading :this.props.route.params.participant_heading,
          participant_text : this.state.participant_text,
      })

       

      }

      Edit_Donor_msg = async() => {
console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

        this.setState({isLoading:true})
          console.log(this.state.participant_text,this.state.participant_heading)

          const heading = this.state.participant_heading;
          const text = this.state.participant_text;
          const participant_id = this.props.route.params.participant_id;

        
           
           // const login = await AsyncStorage.getItem('login');
          
    
         //   let data = JSON.parse(login);
          //  console.log('#################3',data)
          //  this.access_token =data.token
            //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);
    
            const meurl = ApiScreen.base_url + ApiScreen.update_message
            console.log("url:"+meurl);
          
            fetch(meurl ,
              {
                method: 'POST',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                 // 'token': this.access_token
                // <-- Specifying the Content-Type
                  
              }),
             
              body: JSON.stringify(
                {
                  
  
                  heading:heading,
                  message:text,
                  participant_id:participant_id
                
                })
    
          }).then(response => response.json())
                .then((responseJson) => {
                   // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.current_fund)
                
                    if(responseJson.success == true){

                      setTimeout(() => {
                        console.log(responseJson.message)
                        Alert.alert(responseJson.message)
                         this.modelfalse()
                        this.setState({isLoading:false})
                      }, 2000);
                    
                       //this.componentDidMount()   
                  
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


    
  Add_donor() {
    console.log('addd')
    this.setState({
      isPrivate1: true
    })
  }

  modelfalse1 = () => {



    this.setState({ isPrivate1: false })
    this.componentDidMount()


  }

      render(){

        const fund_heading1 = this.props.route.params.fund_heading1;
        const fund_text1 = this.props.route.params.fund_text1;
        const fund_heading2 = this.props.route.params.fund_heading2;
        const fund_text2 = this.props.route.params.fund_text2;
        const fund_photo2 = this.props.route.params.fund_photo2;
        const start_no = this.props.route.params.start_no;
        const participant_id = this.props.route.params.participant_id;
        //  participant_heading = this.props.route.params.participant_heading;
        //  participant_text = this.props.route.params.participant_text;

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
             
              

            <View style={{flexDirection:'row',marginTop:20}}>

                   

                
                
                <TouchableOpacity style={styles.button}
                onPress={() => this.Edit_Message()}
                >
                        <Text style={styles.SubmitText}>Edit Message</Text>
                    </TouchableOpacity>

              

                    <TouchableOpacity style={styles.button1}
          onPress={() => this.Add_donor()}
          >
            <Text style={{textAlign:'center', color: '#000', fontSize: 10, fontFamily: 'Poppins-SemiBold' }}>Help</Text>
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
                           onChangeText={(participant_heading) => this.setState({participant_heading})}
                           value={this.state.participant_heading}
                          placeholder="Heading"
                          style={styles.input}
                        >
                      </TextInput>
                 </View>

                 <View style={styles.searchSection}> 
                  
                  <TextInput autoCorrect={false}
                  onChangeText={(participant_text) => this.setState({participant_text})}
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


{this.state.isPrivate1 == true && (
        

        <Modal isVisible={this.state.isVisible1}>
          <View style={{ flex: 1,height:hp('80%'),backgroundColor:'#fff',borderWidth:2,borderColor:'#000' }}>

            <TouchableOpacity
              onPress={() => this.modelfalse1()}
            >
              <Text style={styles.closemodalStyle}>X</Text>



            </TouchableOpacity>

            <View>
              <Text style={{ textAlign: 'center',fontSize:14, fontFamily: 'Poppins-Regular', }}>Some Simple Suggestion</Text>
            <View style={{height:hp('85%')}}>
              <ScrollView>

                <View style={styles.searchSection}>
                <Text>First - <Text style={styles.ListText2}>Start by adding your donor emails. Simply add their name and email address. We've included a few suggestions below, but please don't limit your self to just these.</Text></Text>
                
                </View>

                <View style={styles.searchSection}>
                <Text>Next  - <Text style={styles.ListText2}>In the "how do you refer to this person" field, list their name the way you would normally address this person (Coach Smith, Dr. Phil, Grandpa Jones). This is an important step, your message and all follow up "thank you" emails will use this greeting.</Text></Text>
                
                 
                </View>

                <View style={styles.searchSection}>
                <Text>Finally   - <Text style={styles.ListText2}>Log back in periodically to review your results. A facebook link is included, so post for everyone to view! The color coded legend helps identify and track the donation process. A few donor suggestions might be:</Text></Text>
                
                
                </View>

              
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>1</Text>
                    <Text style={styles.textlist}>Grandparents</Text>
                  </View>  
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>2</Text>
                    <Text style={styles.textlist}>Relatives</Text>
                  </View>  
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>3</Text>
                    <Text style={styles.textlist}>Former coaches, teachers, instructors</Text>
                  </View>  
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>4</Text>
                    <Text style={styles.textlist}>Your doctor, dentist or friends in your local community</Text>
                  </View>  
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>5</Text>
                    <Text style={styles.textlist}>Parents close friends and business associates</Text>
                  </View>  
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>6</Text>
                    <Text style={styles.textlist}>Church family</Text>
                  </View>  
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>7</Text>
                    <Text style={styles.textlist}>Facebook contacts</Text>
                  </View>  
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>8</Text>
                    <Text style={styles.textlist}>Neighbors</Text>
                  </View>  
                  <View style={styles.textcontainer}>
                    <Text style={styles.numtext}>9</Text>
                    <Text style={styles.textlist}>Many, many more...</Text>
                  </View>  

              

                <View style={styles.searchSection}>
                    <Text style={styles.ListText2}>Remember, your local business community is a great place to ask for help. Most local business owners understand the benefits of corporate responsibility and community involvement. Go ahead; send your page to your favorite restaurant, store or shop. It's truly a win-win for everyone!</Text>
                  
                </View>

               

              </ScrollView>
              </View>
            </View>
          </View>

        </Modal>

      )}
         

           {/* <FlatList
     
     data={this.state.dataSource}
     keyExtractor={(item, index) => index}
     horizontal={false}
   
     renderItem={({ item, index }) => ( */}
         <ScrollView>
        {/* <View style={styles.imagecontain}>
      
    </View> */}
   {/* <View style={{padding:20,flexDirection:'row',alignContent:'space-around'}}>
      <View>
          <Image
                style={{height:100,width:100}}
                source={{uri:fund_photo2}}/>
    </View>

    <View style={{marginLeft:10}}> */}
          {/* <Image
              style={{height:100,width:100}}
              source={{uri:item.participant_photo1}}/> */}
    {/* </View>
        
  </View>  */}
      <View style={styles.greybox}>
      <Text style={styles.textcontainer1}>{fund_heading1}</Text>
      <Text style={styles.textcontainer2}>{fund_text1}</Text>

      <Text style={styles.textcontainer1}>{fund_heading2}</Text>

       <Text style={styles.textcontainer2}>{fund_text2}</Text>

       <Text style={styles.textcontainer1}>{this.state.participant_heading}</Text>

<Text style={styles.textcontainer2}>{this.state.participant_text}</Text>

       <TouchableOpacity style={styles.button} 
                  onPress={() => this.props.navigation.navigate('AddDonorStep3',{
                    participant_id:participant_id

                  })}>
                      <Text style={styles.SubmitText}>SAVE & CONTINUE</Text>
                </TouchableOpacity>        

       {/* <Text style={styles.textcontainer1}>{item.participant_heading1}</Text>

<Text style={styles.textcontainer2}>{item.participant_text1}</Text> */}

      

  </View>
           



  </ScrollView>
     {/* )}
    />    */}
               

              

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
            backgroundColor:'#fff',
            justifyContent:'center'
         
        },
        imagecontain:{
                height:hp('30%'),
               
        },
        closemodalStyle:{
    
          fontSize:18,
          borderRadius:50,
          width:30,
          height:30,
          textAlign:'center',
          alignSelf:'flex-end'
        
        },
        textlist: {
  
          marginLeft: 10,
          marginTop:5,
          fontSize: 12,
          fontFamily:'Poppins-Regular',
          color:'#6d6c6a'
          
        },
        image:{
            height:'100%',
            width:'100%',
           resizeMode:'cover',
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
      searchSection: {
        padding:10
    
      },
      
      textcontainer:{

        flexDirection:'row',
        marginRight:10,
        width:wp('85%')
    
    },
numtext:{

  marginLeft: 10,
  marginTop:5,
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
      ListText2: {

        fontFamily: 'Poppins-Regular',
        fontSize: 12,
        color:'#6d6c6a',
        padding: 10
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
          fontFamily:'Poppins-Regular',
          alignSelf:'center',
          borderWidth:1,
          color: '#6F6F6F',
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

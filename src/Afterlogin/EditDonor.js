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
    ScrollView,FlatList,BackHandler
  } from "react-native";
  import React, { Component } from "react";
  import { Table, Row, Rows,TableWrapper, Cell  } from 'react-native-table-component';
  import {Picker} from '@react-native-picker/picker';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import Header from '../Components/Header/index'
  import { ApiScreen } from "../API/ApiScreen";
  import AsyncStorage from "@react-native-community/async-storage";
  import Modal from 'react-native-modal';

  export default class EditDonor extends Component {

    constructor(props) {
        super(props);
        this.state = {
          donorid:this.props.route.params.donorid,
           name:this.props.route.params.donorname,
           email:this.props.route.params.donoremail,
           mobile:this.props.route.params.donormob.toString(),
           refer:this.props.route.params.donorrefer,
           offchek:this.props.route.params.donoroffcheck,
           offline:this.props.route.params.donoroffline, 
          isLoading:false,
          id:'',
          current_fund:'',
        
          dataSource:[],
          isVisible:true,
          isPrivate: false,
          dataSource2:'',
        
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      }

      componentDidMount = async () => {

       
        
        const login = await AsyncStorage.getItem('login');
        console.log('donorid%%%%%%%%%%%%%%%%%%%',this.state.donorid,this.state.mobile);

        let data = JSON.parse(login);
      //  console.log('#################3',data)
        this.access_token =data.token
        //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);

        const meurl = ApiScreen.base_url + ApiScreen.me
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
         

      }).then(response => response.json())
            .then((responseJson) => {
               // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.current_fund)
             
                setTimeout(() => {

                    this.setState({
                      isLoading: false,
                      // dataSource:responseJson.data,
                      id : responseJson.data.id,
                      current_fund : responseJson.data.current_fund
                    })
                }, 2000)
                console.log('%%%%%%%%%%%%%%%%%%%%%%%',this.state.id,this.state.current_fund)
            })
            .catch(error => console.log(error))

       

          
      }


      Edit_Donor = async (donorID) => {

        this.setState({
          isLoading:true
        })

          console.log('%%%%%%%%%%%donor>>>>>>>>>>',donorID)

          const login = await AsyncStorage.getItem('login');
        
  
          let data = JSON.parse(login);
        //  console.log('#################3',data)
          this.access_token =data.token
          //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);
  
          const meurl = ApiScreen.base_url + ApiScreen.Edit_donor
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
                

                name:this.state.name,
                email:this.state.email,
                mobile : this.state.mobile.toString(),
                message : this.state.refer,
                check_no:this.state.offchek,
                amount:this.state.offline,
                donor_id:donorID
              })
  
        }).then(response => response.json())
              .then((responseJson) => {
                 // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.current_fund)
               

            
                  if(responseJson.success == true){
                   console.log(responseJson.message)
                     Alert.alert(responseJson.message)
                     this.setState({
                      isLoading:false
                    })
                     this.props.route.params.onGoBack();
                   this.props.navigation.goBack();
                   this.props.navigation.navigate("ManageDonorList");
                
                  }
   
                  else{
                    this.setState({
                      isLoading:false
                    })
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

      componentWillMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    
      }
    
      handleBackButtonClick() {
    
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
        return true;
    }

      goBack = () => {
        this.props.route.params.onGoBack();
        this.props.navigation.goBack();
    }


    refresh() {

     
      this.componentDidMount();
   
    }


  
      render(){
       
       
        
        return(
          <SafeAreaView  style={styles.container}>

              
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
                    <Image style={styles.smsimg} source={require('../assets/26.png')}/>

                    <Text style={styles.text1}>Edit Donor Profile</Text>
                
                </View>


                    <ScrollView>

                    <View style={styles.searchSection}> 
                      <View>
                      <Text style={styles.text}>Name</Text>
                      <TextInput ref={input => { this.textInput = input }} autoCorrect={false}
                          onChangeText={ name => this.setState({ name : name }) }
                          value={this.state.name}
                          style={styles.input}
                          placeholder="Name"
                        >
                          
                      </TextInput>
                      </View>
                      <View>
                        <Text style={styles.text}>Donor Email Address</Text>
                        <TextInput autoCorrect={false}
                       onChangeText={ email => this.setState({ email : email }) }
                      value={this.state.email}
                     placeholder="Donor Email Address"
                      style={styles.input}
                    >
                  </TextInput>
                
                  </View>
                 </View>

               

             <View style={styles.searchSection}> 
                  
                
                <View>
                  <Text style={styles.text}>Mobile</Text>
                  <TextInput autoCorrect={false}
                        onChangeText={ mobile => this.setState({ mobile : mobile }) }
                      value={this.state.mobile}
                      placeholder="Mobile"
                      style={styles.input}
                    >
                  </TextInput>
                  </View>

                  <View>
                  <Text style={styles.text}>How do you Refer to this Person?</Text>
                  <TextInput autoCorrect={false}
                      onChangeText={ refer => this.setState({ refer : refer }) }  
                      value={this.state.refer}
                      placeholder="How do you refer to this Person"
                      style={styles.input}
                    >
                  </TextInput>
                  </View>
             </View>

             <View style={styles.searchSection}> 
                  
                
                  <View>
                    <Text style={styles.text}>Offline Donation Amount</Text>
                    <TextInput autoCorrect={false}
                        onChangeText={ offline => this.setState({ offline : offline }) }
                        value={this.state.offline}
                        placeholder="Offline Donation Amount"
                        style={styles.input}
                      >
                    </TextInput>
                    </View>
  
                    <View>
                    <Text style={styles.text}>Offline Check Number</Text>
                    <TextInput autoCorrect={false}
                      onChangeText={ offchek => this.setState({ offchek : offchek }) }
                        value={this.state.offchek}
                        placeholder="Offline Check Number"
                        keyboardType="numeric"
                        style={styles.input}
                      >
                    </TextInput>
                    </View>
               </View>

            

            

             <TouchableOpacity style={styles.button2} 
                 onPress={() => this.Edit_Donor(this.state.donorid)}
                 >
                  <Text style={styles.SubmitText}>Save CHANGES</Text>
                </TouchableOpacity>

                    </ScrollView>
                   
                  
              
                
                
         
       
          
           </SafeAreaView>
        )
      }
    }

    const styles = StyleSheet.create({
       
        container: {
            flex: 1, 
            backgroundColor:'#fff'
         
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
        SubmitText:{
          textAlign:'center',
          fontFamily:'Poppins-Bold',
          color:'#fff',
          fontSize:16
        },
  
        closemodalStyle:{
    
          fontSize:18,
          borderRadius:50,
          width:30,
          height:30,
          textAlign:'center',
          alignSelf:'flex-end'
        
        },

        table:{

            width:wp('90%'),
            justifyContent:'center',
            alignSelf:'center'
        
          },

        head: { 

          height: 40, 
            borderRadius:20,
            backgroundColor: '#F2F2F2',
            flexDirection:'row',
            justifyContent:'center',
            alignSelf:'center'

        },

        row:
        {
            borderBottomWidth:1,
            borderBottomColor: '#D1D1D1',
            flexDirection:'row',
          //  width:800,
            //flexDirection:'row-reverse'
        },
        pickerContainer:{
            color:'#6C6C6C',
             width:wp('35%'),
           
             borderRadius:30,
             justifyContent:'center',
            backgroundColor:'#F2F2F2',
            borderColor:'#F2F2F2',
            marginLeft:wp('5%'),
            paddingLeft:10,
          borderWidth:1,
            fontFamily:'Poppins-SemiBold',
            
         },

         input: {
          width:wp('95%'),
         //textAlign:'center',
       //  backgroundColor: '#fff',
         fontFamily:'Poppins-Regular',
         alignSelf:'center',
         borderWidth:1,
         color: '#6F6F6F',
         fontFamily: 'Poppins-Regular',
         borderColor: '#6C6C6C',
         marginBottom:15
      //  borderRadius:30,
       //  backgroundColor:'red'
      },
      searchSection:{
     // flexDirection:'row',
      //justifyContent:'space-between',
    

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
            backgroundColor:'#CC3739',
            padding:8,
          width:wp('22%'),
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
           
             fontFamily:'Poppins-SemiBold',
             fontSize:14,
            color:'#6C6C6C',
           justifyContent:'center',
         //  alignSelf:'center',
           paddingLeft:10
           
          
            },
            text2: {
            
                fontFamily:'Poppins-Regular',
                fontSize:10,
              //alignSelf:'center',
                padding:10
               },

        One:{
            flexDirection:'row',
            padding:30,
            marginTop:20
        },

        smsimg:{
           height:20,
           width:20,
        
        },
        text1:{
            fontFamily:'Poppins-SemiBold',
            fontSize:20,
            paddingLeft:10
        },

    })

import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    Platform,
    Text,
    TextInput,BackHandler,
    Alert,
    TouchableOpacity,
    Linking,SafeAreaView,
    ScrollView,FlatList
  } from "react-native";
  import React, { Component } from "react";
  import { Table, Row, Rows,TableWrapper, Cell  } from 'react-native-table-component';
  //import {Picker} from '@react-native-picker/picker';
  import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
  import Header from '../Components/Header/index'
  import { ApiScreen } from "../API/ApiScreen";
  import AsyncStorage from "@react-native-community/async-storage";
  import Modal from 'react-native-modal';
  import  ModalSelector  from "react-native-modal-selector";


  export default class ManageDonorList extends Component {

    constructor(props) {
        super(props);
        this.state = {
          firstname:'',
          lastname:'',
          email:'',
          mobile:'',
          refer:'',
          isLoading:false,
          id:'',
          currunt_org:'',
          current_fund:'',
        pledge_amt:'',
        offline_amt:'',
        donation_amt:'',
          dataSource:[],
          isVisible:true,
          isPrivate: false,
          EditModel:false,
          dataSource2:[],
          Total_records:'',
          Limit:'',
          CurrentOffset:'',
          offset:0,
         
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
        

    

        const url = ApiScreen.base_url + ApiScreen.get_donorlist
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
         
          body: JSON.stringify(
            {
  
              limit : 15,
              offset:this.state.offset
  
            })
      
  
      }).then(response => response.json())
            .then((responseJson) => {
              console.log('getting data from fetchaaaaaaaaaaa',responseJson.data)
              
                setTimeout(() => {
                    this.setState({
                          isLoading:false,
                       dataSource:responseJson.data,
                       pledge_amt:responseJson.data.pledge_amt,
                       offline_amt:responseJson.data.offline_amt,
                       donation_amt:responseJson.data.donation_amt,
                       Total_records:responseJson.pagination.total,
                       Limit:responseJson.pagination.limit,
                       CurrentOffset:responseJson.pagination.offset
                  
                    })
                }, 2000)
        
            })
            .catch(error => console.log(error))


           

            const url2 = ApiScreen.base_url + ApiScreen.fund_list;
                console.log("url>>>>>>>>>>:"+url2);
                fetch(url2 ,
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
                        console.log('FUND LIST>>>>>>>>>>>>>>>>',responseJson.data[0].organization)
                      
                        setTimeout(() => {
                            this.setState({
                                isLoading: false,
                               dataSource2:responseJson.data,
                               //name : responseJson.data.name,
                              
                            })
                        }, 2000)
                
                    })
                    .catch(error => console.log(error))


                    let device_token = await AsyncStorage.getItem('currentFund');

                    //  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',device_token)
                  
                      
                    const fundDetail = ApiScreen.base_url + ApiScreen.fund_detail
                    console.log("url:" + fundDetail,device_token);
                    fetch(fundDetail,
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
                
                          
                            fund_id: device_token.replace(/^"(.*)"$/, '$1')
                
                          })
                
                
                      }).then(response => response.json())
                      .then((responseJson) => {
                         console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.organization)
                
                        setTimeout(() => {
                          this.setState({
                            isLoading: false,
                            currunt_org: responseJson.data.organization,
                
                          })
                        }, 2000)
                
                      })
                      .catch(error => console.log(error))
                
                
                   
 
       

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
      Add_New_Donor = async () => 
      {
        console.log('Add new donoe');
        const firstname = this.state.firstname;
        const lastname = this.state.lastname;
        const email = this.state.email;
        const mobile = this.state.mobile;
        const refer = this.state.refer;
        //console.log(firstname,lastname,email,mobile,refer);

        this.setState({
          isLoading:true
        })

        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
      //  console.log('#################3',data)
        this.access_token =data.token;
        const addurl = ApiScreen.base_url + ApiScreen.add_donor ;
        console.log(addurl,email,firstname,lastname,email,mobile,refer);

        fetch(addurl,
    
          {
              method: 'POST',
              headers: 
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'token': this.access_token
              },

              body: JSON.stringify(
              {
                
                fname:firstname,
                lname:lastname,
                email :email,
                mobile:mobile,
                message:refer,
                
              })

          }).then((response) => response.json()).then((responseJson) =>
          
          {
          
          //  console.log("from login*** ",responseJson.data);
          //  this.setState({  isLoading:false })
          console.log(responseJson.message)
             if(responseJson.response_code == 200){
              console.log(responseJson.message)
             
              this.setState({isPrivate:false})
                this.componentDidMount()   

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
      

      Add_donor()

      {
        console.log('addd')
        this.setState({
          isPrivate:true
        })
      }


      del_Donor = async (donor_id) =>

      Alert.alert(
        "Delete",
        "Are you sure ?",
        [
          {
            text: "Yes",
            onPress: async() =>
            
            {
              console.log('Donorid=',donor_id);
    
              this.setState({
                isLoading:true
              })
      
              const login = await AsyncStorage.getItem('login');
              //console.log("dashboard", login);
      
              let data = JSON.parse(login);
         
              this.access_token =data.token;
              const addurl = ApiScreen.base_url + ApiScreen.del_donor;
             
      
              fetch(addurl,
          
                {
                    method: 'POST',
                    headers: 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'token': this.access_token
                    },
      
                    body: JSON.stringify(
                    {
                      
                      donor_id:donor_id
                      
                    })
      
                }).then((response) => response.json()).then((responseJson) =>
                
                {
                 
                   if(responseJson.response_code == 200){
                    console.log(responseJson.message)
                   
                    const invalid =  responseJson.message
                      Alert.alert(invalid);
    
                    this.setState({isPrivate:false})
                      this.componentDidMount() 
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
          
          
          
          },

          
          { text: "No", onPress: () => console.log("No Pressed") }
        ]
      );

     
      

      edit_Donor(donor_id)
      {
        

      
          
      }

      modelfalse = () => {
   
        this.setState({isPrivate:false})
        this.setState({EditModel:false})
        this.componentDidMount()   
            
    
    }


    renderElement(){
      render()
      {
        return (
            <View>

            </View>
        )
      }
     
     
   }


   
  edit_email_status = async (status, Did) => {
    console.log('>>>>>>>', status, Did)


    this.setState({
      isLoading: true
    })

    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);

    let data = JSON.parse(login);
    //  console.log('#################3',data)
    this.access_token = data.token;
    const addurl = ApiScreen.base_url + ApiScreen.change_email_status;

    fetch(addurl,

      {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': this.access_token
        },

        body: JSON.stringify(
          {

            status: status.toString(),
            donor_id: Did.toString(),


          })

      }).then((response) => response.json()).then((responseJson) => {

        //  console.log("from login*** ",responseJson.data);
        //  this.setState({  isLoading:false })
        console.log(responseJson.message)
        if (responseJson.response_code == 200) {
          console.log(responseJson.message)

          const invalid = responseJson.message
          Alert.alert(invalid);
          this.componentDidMount()

        }

        else {


          const invalid = responseJson.message
          Alert.alert(invalid);
          this.componentDidMount()

        }

        this.setState({ ActivityIndicator_Loading: false });

      }).catch((error) => {
        this.setState({
          isLoading: false
        })
        console.error(error);

      });



  }


  Offset_Add (){

    this.setState({
     
      offset:this.state.offset + 15
    })
    console.log('updated>>>>>>>>>.',this.state.offset)
    this.componentDidMount();

  }

  Offset_Remove (){

    this.setState({
     
      offset:this.state.offset - 15
    })
    console.log('updated>>>>>>>>>.',this.state.offset)
    this.componentDidMount();

  }

      render(){
        const data = [
          { label: 'No', key: 1, value: 'No' },
          { label: 'Yes', key: 0, value: 'Yes' },
    
        ];
      
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
                    <Text style={styles.text1}>Add/Manage Donors</Text>
                
                </View>
            
                <View style={{flexDirection:'row',marginBottom:20}}>

            
                <View style={styles.pickerContainer}>
              <Text>{this.state.currunt_org}</Text>
                {/* {<Picker
                selectedValue={this.state.selectedValue} 
                    
                onValueChange={this.onPickerValueChange} >
                { this.state.dataSource2.map((item, key)=>
                  <Picker.Item label={item.organization} value={item.id} key={key} />
                )}

              </Picker>} */}
      </View>
          <TouchableOpacity
            //onPress={() => this.Add_donor()}
            onPress={() => this.props.navigation.navigate('AddNewDonor', { onGoBack: () => this.refresh() })}
            style={styles.button}>
            <Text style={styles.SubmitText}>Add New Donor</Text>
          </TouchableOpacity>

                <TouchableOpacity style={styles.button1}
                  onPress={() => this.Add_donor()}
                >
                  <Text style={{textAlign:'center',color:'#fff',fontSize:10,fontFamily:'Poppins-Regular'}}>Help</Text>
                </TouchableOpacity>
     
                </View>
               
                <View style={styles.head}>
              <View>
               
                  <Text style={styles.text}>Name</Text>
             
              </View>
              <View style={{flex:1}}>
              
                  <Text style={{width:150,color:'#6F6F6F',fontFamily:'Poppins-SemiBold',fontSize:12,justifyContent:'center',padding:10}}>Cancel Donor Emails</Text>
                
              </View>

              <View style={{flex:1}}>
              
              <Text style={styles.text}>Status</Text>
              
              </View>

              <View style={{flex:1}}>
              
                <Text style={styles.text}>Action</Text>
              
              </View>
             
            </View>
           
             {this.state.isPrivate == true && (
              
            
              <Modal isVisible={this.state.isVisible}>
              <View style={{ flex: 1,height:hp('80%'),backgroundColor:'#fff',borderWidth:2,borderColor:'#000' }}>
  
                <TouchableOpacity
                  onPress={() => this.modelfalse()}
                >
                  <Text style={styles.closemodalStyle}>X</Text>
  
  
  
                </TouchableOpacity>
  
                <View>
                  <Text style={{ textAlign: 'center',fontSize:14, fontFamily: 'Poppins-Regular', }}>Some Simple Suggestion</Text>
                <View style={{height:hp('85%')}}>
                  <ScrollView>
  
                    <View style={styles.searchSection1}>
                    <Text>First - <Text style={styles.ListText2}>Start by adding your donor emails. Simply add their name and email address. We've included a few suggestions below, but please don't limit your self to just these.</Text></Text>
                    
                    </View>
  
                    <View style={styles.searchSection1}>
                    <Text>Next  - <Text style={styles.ListText2}>In the "how do you refer to this person" field, list their name the way you would normally address this person (Coach Smith, Dr. Phil, Grandpa Jones). This is an important step, your message and all follow up "thank you" emails will use this greeting.</Text></Text>
                    
                     
                    </View>
  
                    <View style={styles.searchSection1}>
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
  
                  
  
                    <View style={styles.searchSection1}>
                        <Text style={styles.ListText2}>Remember, your local business community is a great place to ask for help. Most local business owners understand the benefits of corporate responsibility and community involvement. Go ahead; send your page to your favorite restaurant, store or shop. It's truly a win-win for everyone!</Text>
                      
                    </View>
  
                   
  
                  </ScrollView>
                  </View>
                </View>
              </View>
  
            </Modal>
                )}
         




         {this.state.EditModel == true && (
                
                  <Modal  isVisible={this.state.isVisible}>
                     <View style={{flex:1,backgroundColor:'white'}}>
                 
                 <TouchableOpacity
                   onPress={() => this.modelfalse()}
                   >
                      <Text style={styles.closemodalStyle}>X</Text>
                   
                   </TouchableOpacity>

                   <View>
                    <Text style={{textAlign:'center'}}>Edit Donor</Text>

                    <View>

                    <View style={styles.searchSection}> 
                  
                      <TextInput autoCorrect={false}
                           onChangeText={(firstname) => this.setState({firstname})}
                          //value='garun@delimp.com'
                          placeholder="First Name"
                          style={styles.input}
                        >
                      </TextInput>
                 </View>

                 <View style={styles.searchSection}> 
                  
                  <TextInput autoCorrect={false}
                       onChangeText={(lastname) => this.setState({lastname})}
                      //value='garun@delimp.com'
                      placeholder="Last Name"
                      style={styles.input}
                    >
                  </TextInput>
             </View>

             <View style={styles.searchSection}> 
                  
                  <TextInput autoCorrect={false}
                       onChangeText={(email) => this.setState({email})}
                      //value='garun@delimp.com'
                      placeholder="Email Address"
                      style={styles.input}
                    >
                  </TextInput>
             </View>

             <View style={styles.searchSection}> 
                  
                  <TextInput autoCorrect={false}
                       onChangeText={(mobile) => this.setState({mobile})}
                      //value='garun@delimp.com'
                      placeholder="Mobile"
                      style={styles.input}
                    >
                  </TextInput>
             </View>

             <View style={styles.searchSection}> 
                  
                  <TextInput autoCorrect={false}
                       onChangeText={(refer) => this.setState({refer})}
                      //value='garun@delimp.com'
                      placeholder="How do you refer to this Person"
                      style={styles.input}
                    >
                  </TextInput>
             </View>

             <TouchableOpacity style={styles.button2} 
                 onPress={() => this.Add_New_Donor()}
                 >
                  <Text style={styles.SubmitText}>Share Your Page</Text>
                </TouchableOpacity>

                    </View>
                    </View> 
                   </View>
                  
                  </Modal>
                
                )}
         




       
            <FlatList
     
     data={this.state.dataSource}
     keyExtractor={(item, index) => index}
    // horizontal={true}
   
     renderItem={({ item, index }) => (


     
      <View style={styles.row}>

        <View style={{ flex: 1}}>
               
               <Text style={styles.text2}>{item.name}</Text>
          
        </View>
           <View style={{ flex: 1}}>
           <View style={{flexDirection:'row'}}>
                
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('EditDonor',{
                    donorid:item.id,
                    donorname:item.name,
                    donoremail:item.email1,
                    donormob:item.mobile.toString(),
                    donorrefer:item.text1,
                    donoroffline:item.offline_amt,
                    donoroffcheck:item.offline_checkno,
                    onGoBack:() => this.refresh()

                    
                    })}>
                    <Text style={styles.text}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => this.del_Donor(item.id)}
                >
                      <Text style={styles.Redtext}>Delete</Text>
                </TouchableOpacity>
            </View>
           </View>
           <View style={{ flex: 1}}>
             {(() => {
              if (item.pledge_amt == '0.00' && item.offline_amt == '0.00' && item.donation_amt == '0.00'){
                  return (
                    <Text style={styles.text2}> No Activity</Text>
                  )
              }
              else if(item.pledge_amt != '0.00' && item.offline_amt == '0.00' && item.donation_amt == '0.00'){
                return(
                  <Text style={styles.Orangetext}> Pledge</Text>
                )
              }
              
              return  <Text style={styles.Greentext}>Conguratulations</Text>;
            })()}

             {/* {this.renderElement()} */}

           {/* {(item.pledge_amt == '0.00' && item.offline_amt == '0.00' && item.donation_amt == '0.00')? 
                  
                 <Text style={styles.text2}> No Activity</Text>:
                 
                    <Text style={styles.Greentext}>Conguratulations</Text>                 
     }  */}

              
           </View>
           <View style={{ flex: 1}}>

           {item.sendemail == '1' ?
                  <ModalSelector
                    data={data}
                    initValue='No'
                    supportedOrientations={['landscape', 'portrait']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option) => { this.edit_email_status(option.key, item.id) }}>
                

                    <TextInput
                      style={{ textAlign: 'center', padding: 10, height: 50 }}
                      editable={false}
                      //placeholder="Select"
                      value="No" />

                  </ModalSelector>


                  :

                  <ModalSelector
                    data={data}
                    initValue='Yes'
                    supportedOrientations={['landscape', 'portrait']}
                    accessible={true}
                    scrollViewAccessibilityLabel={'Scrollable options'}
                    cancelButtonAccessibilityLabel={'Cancel Button'}
                    onChange={(option) => { this.edit_email_status(option.key, item.id) }}>
                   


                    <TextInput
                      style={{textAlign: 'center', padding: 10, height: 50 }}
                      editable={false}
                      //placeholder="Select"
                      value="Yes" />

                  </ModalSelector>



                }
           
           {/* <Picker style={{ height: 30, fontFamily:"Poppins-Regular",}}
      
              //  onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            >
            <Picker.Item style={styles.text2} label='No' value='1' />
            <Picker.Item style={styles.text2} label='Yes' value='0' />

           </Picker> */}
           
           </View>
          
       
           </View>
          
     )}
     />
           
       
<View style={{flexDirection:'row',alignSelf:'center',paddingTop:10}}> 

{this.state.CurrentOffset == 0 ?

<TouchableOpacity style={styles.disablebutton} disabled ={true}
onPress={()=> this.Offset_Remove()}
>
<Text  style={styles.DisableText}>Prev</Text>
</TouchableOpacity>
:
<TouchableOpacity style={styles.button}
onPress={()=> this.Offset_Remove()}
>
<Text  style={styles.SubmitText}>Prev</Text>
</TouchableOpacity>

}


{/* <Text style={{alignSelf:'center'}}>{this.state.offset}</Text> */}

{this.state.Total_records - this.state.CurrentOffset >= this.state.Limit ?

<TouchableOpacity
onPress={()=> this.Offset_Add()}
style={styles.button}
>
<Text style={styles.SubmitText}>Next</Text>
</TouchableOpacity>
:
<TouchableOpacity disabled={true}
onPress={()=> this.Offset_Add()}
style={styles.disablebutton}
>
<Text style={styles.DisableText}>Next</Text>
</TouchableOpacity>

}


</View>

                 {/* <Table style={styles.table}>
          <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows dataSource={this.state.dataSource && this.state.dataSource} style={styles.row} textStyle={styles.text2}/>
        </Table>  */}

          
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
         marginLeft:20,
         marginTop:20,
         marginBottom:10
     
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
        SubmitText:{
          textAlign:'center',
          fontFamily:'Poppins-Regular',
          color:'#fff',
          fontSize:16
        },
        DisableText: {
          textAlign: 'center',
          fontFamily: 'Poppins-Regular',
          color: '#000',
          fontSize: 10
        },
        disablebutton: {
          backgroundColor: '#F2F2F2',
          padding: 8,
          width: wp('30%'),
          borderRadius: 30,
          marginLeft: 10,
      
          alignSelf: 'center'
      
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
             borderWidth:1,
             borderRadius:30,
             justifyContent:'center',
            backgroundColor:'#F2F2F2',
            borderColor:'#F2F2F2',
            marginLeft:wp('5%'),
            paddingLeft:10,
          
            fontFamily:'Poppins-SemiBold',
            
         },
         input: {
          width:wp('75%'),
         //textAlign:'center',
         backgroundColor: '#fff',
         fontFamily:'Poppins-Regular',
         alignSelf:'center',
        borderWidth:1,
        marginTop:10,
        borderColor: '#424242',
      
      //  borderRadius:30,
       //  backgroundColor:'red'
      },
      searchSection1:{
        padding:10

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
             fontSize:12,
            color:'#6F6F6F',
          justifyContent:'center',
           alignSelf:'center',
           padding:10
          
            },

            Redtext: {
           
              fontFamily:'Poppins-SemiBold',
              fontSize:12,
             color:'#CB5350',   
           justifyContent:'center',
            alignSelf:'center',
            padding:10
           
             },
             
             Orangetext: {
           
              fontFamily:'Poppins-SemiBold',
              fontSize:12,
             color:'#FBA048',
           justifyContent:'center',
            alignSelf:'center',
            padding:10
           
             },
             Greentext: {
           
              fontFamily:'Poppins-SemiBold',
              fontSize:10,
             color:'#559555', 
           justifyContent:'center',
            alignSelf:'center',
            paddingTop:10
           
             },   
            text2: {
              color:'#6F6F6F',
                fontFamily:'Poppins-SemiBold',
                fontSize:12, 
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

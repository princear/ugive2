import {
    View,
    Image,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,
    PermissionsAndroid,
    Platform,
    Text,
    TextInput, BackHandler,
    Alert,
    TouchableOpacity,
    Linking, SafeAreaView,
    ScrollView, FlatList
  } from "react-native";
  import React, { Component } from "react";
  import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
  import { Picker } from '@react-native-picker/picker';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  
  import { ApiScreen } from './API/ApiScreen'
  import AsyncStorage from "@react-native-community/async-storage";
  import Modal from 'react-native-modal';
  import Contacts from 'react-native-contacts';
  
  export default class AddDonorStep3 extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        contacts:[],
        firstname: '',
        lastname: '',
        email: '',
        mobile: '',
        refer: '',
        isLoading: false,
        id: '',
        current_fund: '',
        pledge_amt: '',
        offline_amt: '',
        donation_amt: '',
        dataSource: [],
        isVisible: true,
        isPrivate: false,
        EditModel: false,
        dataSource2: '',
  
      }
    
    }
  
    // componentDidMount = async () => {
  
    //   this.setState({
    //     isLoading: true
    //   })
  
      
  
    //   const login = await AsyncStorage.getItem('login');
    //   //console.log("dashboard", login);
  
    //   let data = JSON.parse(login);
    //   //  console.log('#################3',data)
    //   this.access_token = data.token
    //   //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);
  
    //   const meurl = ApiScreen.base_url + ApiScreen.me
    //   console.log("url:" + meurl);
  
    //   fetch(meurl,
    //     {
    //       method: 'POST',
    //       headers: new Headers({
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'token': this.access_token
    //         // <-- Specifying the Content-Type
  
    //       }),
  
  
    //     }).then(response => response.json())
    //     .then((responseJson) => {
    //       // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.current_fund)
  
    //       setTimeout(() => {
  
    //         this.setState({
    //           isLoading: false,
    //           // dataSource:responseJson.data,
    //           id: responseJson.data.id,
    //           current_fund: responseJson.data.current_fund
    //         })
    //       }, 2000)
    //       console.log('%%%%%%%%%%%%%%%%%%%%%%%', this.state.id, this.state.current_fund)
    //     })
    //     .catch(error => console.log(error))
  
  
  
  
    //   const url = ApiScreen.base_url + ApiScreen.get_donorlist
    //   console.log("url:" + url);
    //   fetch(url,
    //     {
    //       method: 'POST',
    //       headers: new Headers({
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'token': this.access_token
    //         // <-- Specifying the Content-Type
  
    //       }),
  
    //       body: JSON.stringify(
    //         {
  
    //           donatee_id: '1182',
    //           fund_id: '122'
  
    //         })
  
  
    //     }).then(response => response.json())
    //     .then((responseJson) => {
    //       console.log('getting data from fetchaaaaaaaaaaa', responseJson.data)
  
    //       setTimeout(() => {
    //         this.setState({
    //           isLoading: false,
    //           dataSource: responseJson.data,
    //           pledge_amt: responseJson.data.pledge_amt,
    //           offline_amt: responseJson.data.offline_amt,
    //           donation_amt: responseJson.data.donation_amt
  
    //         })
    //       }, 2000)
  
    //     })
    //     .catch(error => console.log(error))
  
  
  
  
    //   const url2 = ApiScreen.base_url + ApiScreen.fund_list;
    //   console.log("url>>>>>>>>>>:" + url2);
    //   fetch(url2,
    //     {
    //       method: 'POST',
    //       headers: new Headers({
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'token': this.access_token
    //         // <-- Specifying the Content-Type
  
    //       }),
  
  
    //     }).then(response => response.json())
    //     .then((responseJson) => {
    //       console.log('FUND LIST>>>>>>>>>>>>>>>>', responseJson.data[0].organization)
  
    //       setTimeout(() => {
    //         this.setState({
    //           isLoading: false,
    //           dataSource2: responseJson.data[0].organization,
    //           //name : responseJson.data.name,
  
    //         })
    //       }, 2000)
  
    //     })
    //     .catch(error => console.log(error))
  
  
  
  
    // }
  
    async componentDidMount() {
          
      if (Platform.OS === "android") {
        PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
          title: "Contacts",
          message: "This app would like to view your contacts."
        }).then(() => {
          this.loadContacts();
        });
      } else {
        this.loadContacts();
      }
    }
  
    async loadContacts() {
  
      await Contacts.getAll((err,contacts) => {
  
       if(err === 'denied'){
           console.log('err')
  
       }
  
       else{
         this.setState({contacts})
         console.log('>>>>>>>>>>>',contacts)
       }
  
      })
         
      
       //Contacts.checkPermission();
     
     }
  
  
  
  
  
  
  
    Add_New_Donor = async () => {

      const participant_id = this.props.route.params.participant_id;
      console.log('>>>>>>>>>',participant_id);

      console.log('Add new donoe');
      const firstname = this.state.firstname;
      const lastname = this.state.lastname;
      const email = this.state.email;
      const mobile = this.state.mobile;
      const refer = this.state.refer;
      
      
      if(mobile.length > 12 || mobile.length < 9)
      {
        Alert.alert('Mobile number should be Min 9 and Max 12 Character')
      }
  
      else{

        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      
      if (this.state.email  != '' && reg.test(this.state.email) === false) {
        Alert.alert("Email is Not Correct");
        this.setState({ email: this.state.email })
        return false;
      }
      else {
        this.setState({ email: this.state.email })
        console.log("Email is Correct");
      }
      //console.log(firstname,lastname,email,mobile,refer);
  
      this.setState({
        isLoading: true
      })
  
    //  const login = await AsyncStorage.getItem('login');
      //console.log("dashboard", login);
  
      //let data = JSON.parse(login);
      //  console.log('#################3',data)
      //this.access_token = data.token;
      const addurl = ApiScreen.base_url + ApiScreen.add_donorStep3;
      console.log(addurl, email, firstname, lastname, email, mobile, refer);
  
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
  
              fname: firstname,
              lname: lastname,
              email: email,
              mobile: mobile,
              message: refer,
              participant_id: participant_id
  
            })
  
        }).then((response) => response.json()).then((responseJson) => {
  
          //  console.log("from login*** ",responseJson.data);
            this.setState({  isLoading:false })
          console.log(responseJson.message)
          if (responseJson.response_code == 200) {
            console.log(responseJson.message)
  
            AsyncStorage.setItem("login",JSON.stringify(responseJson.data));
             
            //this.props.navigation.goBack(null);
             this.props.navigation.navigate("Home");
           //this.props.navigation.navigate('ManageDonor');
           //this.props.route.params.onGoBack();
         // this.props.navigation.goBack();
  
          }
  
          else {
  
  
            const invalid = responseJson.message
            Alert.alert(invalid);
  
          }
  
          this.setState({ ActivityIndicator_Loading: false });
  
        }).catch((error) => {
          this.setState({
            isLoading: false
          })
          console.error(error);
  
        });
  
      }
    }
  
  
    Add_donor() {
      console.log('addd')
      this.setState({
        isPrivate: true
      })
    }
  
  
    del_Donor = async (donor_id) => {
      console.log('Donorid=', donor_id);
  
      this.setState({
        isLoading: true
      })
  
      const login = await AsyncStorage.getItem('login');
      //console.log("dashboard", login);
  
      let data = JSON.parse(login);
  
      this.access_token = data.token;
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
  
              donor_id: donor_id
  
            })
  
        }).then((response) => response.json()).then((responseJson) => {
  
          if (responseJson.response_code == 200) {
            console.log(responseJson.message)
  
            const invalid = responseJson.message
            Alert.alert(invalid);
  
            this.setState({ isPrivate: false })
            this.componentDidMount();
          }
  
          else {
  
            const invalid = responseJson.message
            Alert.alert(invalid);
  
          }
  
          this.setState({ ActivityIndicator_Loading: false });
  
        }).catch((error) => {
          this.setState({
            isLoading: false
          })
          console.error(error);
  
        });
  
    }
  
    add_donor_contact(name,mobile) {
  
  
      console.log(name,mobile);
      this.setState({ firstname: name,mobile:mobile }, () => {
       console.log('>>>>.',this.state.firstname) // 'bar', what we expect it to be.
       this.setState({ isPrivate: false })
  
    });
  
  
    }
  
    modelfalse = () => {
  
      this.setState({ isPrivate: false })
      this.setState({ EditModel: false })
      this.componentDidMount()
  }
  
  
  
  
    render() {
  
      return (
  
        <SafeAreaView style={styles.container}>
  
  
          {(this.state.isLoading) &&
  
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
            </View>}
  
  
         
  
  {this.state.isPrivate == true && (
            // <View>
            //     <Text style={styles.privateTextStyle}>
            //       {I18n.t('add_poll.private_poll_desc')}
            //     </Text>
            //   <Text></Text>
  
            <Modal isVisible={this.state.isVisible}>
              <View style={{ flex: 1, backgroundColor: 'white' }}>
  
                <TouchableOpacity
                  onPress={() => this.modelfalse()}
                >
                  <Text style={styles.closemodalStyle}>X</Text>
  
  
  
                </TouchableOpacity>
  
                <View>
                  <Text style={{ textAlign: 'center' }}>Choose Contact</Text>
  
                  <View>
                  <FlatList
       
       data={this.state.contacts}
       keyExtractor={(item, index) => index}
      // horizontal={true}
     
       renderItem={({ item, index }) => (
       <View>
        
          {item.phoneNumbers && item.phoneNumbers.length > 0 && item.phoneNumbers.map(
  
            (numberData,numberIndex) =>{
              return(
                <TouchableOpacity 
                  onPress={()=> this.add_donor_contact(item.givenName,numberData.number)}
                  style={{ backgroundColor:'#F2F2F2',padding:10,margin:5,height:70}}
                >
                  <View style={{flexDirection:'row'}}>
                       <Text style={{width:wp('45%'),fontFamily:'Poppins-Regular'}}>Name</Text>
                       <Text style={{width:wp('45%'),fontFamily:'Poppins-Regular',justifyContent:'flex-end'}}>{item.givenName}</Text> 
                  </View>
                  <View style={{flexDirection:'row'}}>
                      <Text style={{width:wp('45%'),fontFamily:'Poppins-Regular'}}>
                      
                        Mobile Number
                      </Text>
                      <Text style={{width:wp('45%'),color:'red',height:50,backgroundColor:'yelllow'}}>
                        {' '}
                        {numberData.number}
                      </Text>
                  </View>
                </TouchableOpacity>
              )
  
            }
          )
          
          }
             
       </View>
       
        )}
       />
  
  
                  </View>
                </View>
              </View>
  
            </Modal>
  
          )}
          <View style={styles.One}>
  
            <Image style={styles.smsimg} source={require('./assets/26.png')} />
            <Text style={styles.text1}>Add New Donors</Text>
  
          </View>
  
          <View style={{ marginBottom: 20 }}>
    
    
             
              
    <TouchableOpacity
      //onPress={() => this.Add_donor()}
       onPress={() => this.props.navigation.navigate('BulkUpload')}
      style={styles.button}>
      <Text style={styles.SubmitText}>Add Bulk Contacts</Text>
    </TouchableOpacity>
  
    
  
  </View>
          <View>
                 
  
                  <ScrollView>
  
                    <View style={styles.searchSection}>
  
                      <TextInput autoCorrect={false}
                        onChangeText={(firstname) => this.setState({ firstname })}
                        value={this.state.firstname}
                        placeholder="First Name"
                        style={styles.input}
                      >
                      </TextInput>
                    </View>
  
                    <View style={styles.searchSection}>
  
                      <TextInput autoCorrect={false}
                        onChangeText={(lastname) => this.setState({ lastname })}
                        //value='garun@delimp.com'
                        placeholder="Last Name"
                        style={styles.input}
                      >
                      </TextInput>
                    </View>
  
                    <View style={styles.searchSection}>
  
                      <TextInput autoCorrect={false}
                        onChangeText={(email) => this.setState({ email })}
                        //value='garun@delimp.com'
                        placeholder="Email Address"
                        style={styles.input}
                      >
                      </TextInput>
                    </View>
  
                    <View style={styles.searchSection1}>
                   
                      <TextInput autoCorrect={false}
                        onChangeText={(mobile) => this.setState({ mobile })}
                        value={this.state.mobile}
                        placeholder="Mobile"
                        keyboardType="numeric"
                        maxLength={12}
                        style={styles.input1}
                      >
                        
                      </TextInput>
                      
                      <TouchableOpacity
                       onPress={() => this.Add_donor()}
                      > 
  
                          <Image style={styles.searchIcon} source={require('./assets/05.png')}/>
                      </TouchableOpacity>
                    </View>
  
                    <View style={styles.searchSection}>
  
                      <TextInput autoCorrect={false}
                        onChangeText={(refer) => this.setState({ refer })}
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
  
                  </ScrollView>
                </View>
  
  
  
  
        </SafeAreaView>
      )
    }
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: '#fff'
  
    },
  
    button2: {
  
      backgroundColor: '#CC3739',
      padding: 15,
      width: wp('75%'),
      borderRadius: 30,
      marginLeft: 20,
      marginTop: 20,
      marginBottom: 10,
      alignSelf:'center'
  
    },
  
    SubmitText: {
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
      color: '#fff',
      fontSize: 16
    },
  
    closemodalStyle: {
  
      fontSize: 18,
      borderRadius: 50,
      width: 30,
      height: 30,
      textAlign: 'center',
      alignSelf: 'flex-end'
  
    },
  
    table: {
  
      width: wp('90%'),
      justifyContent: 'center',
      alignSelf: 'center'
  
    },
  
    head: {
  
      height: 40,
      borderRadius: 20,
      backgroundColor: '#F2F2F2',
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center'
  
    },
    row:
    {
      borderBottomWidth: 1,
      borderBottomColor: '#D1D1D1',
      flexDirection: 'row',
      //  width:800,
      //flexDirection:'row-reverse'
    },
  
  
    pickerContainer: {
      color: '#6C6C6C',
      width: wp('35%'),
      borderWidth: 1,
      borderRadius: 30,
      justifyContent: 'center',
      backgroundColor: '#F2F2F2',
      borderColor: '#F2F2F2',
      marginLeft: wp('5%'),
      paddingLeft: 10,
      fontFamily: 'Poppins-SemiBold',
  
    },
  
    searchIcon:{
           
      height:30,
      width:30,
      marginTop:20,
      marginLeft:20
  
    },
  
    input: {
      width: wp('90%'),
      color: '#6F6F6F',
     fontFamily: 'Poppins-Regular',
      alignSelf: 'center',
      borderWidth: 1,
    
      marginTop: 10,
      borderColor: '#F2F2F2',
  
    },
  
    input1: {
      width: wp('70%'),
      color: '#6F6F6F',
     
      fontFamily: 'Poppins-Regular',
      alignSelf: 'center',
      borderWidth: 1,
      marginTop: 10,
      borderColor: '#F2F2F2',
  
    },
    searchSection1:{
  
      width:wp('90%'),
      flexDirection: 'row',
     
      alignSelf:'center'
  
  
  },
  
    button: {
      backgroundColor: '#CC3739',
      padding: 8,
      width: wp('30%'),
      borderRadius: 30,
      marginLeft: 10,
      alignSelf: 'center'
  
    },
    button1: {
      backgroundColor: '#CC3739',
      padding: 8,
      width: wp('22%'),
      borderRadius: 30,
      marginLeft: 10,
  
      alignSelf: 'center'
  
    },
  
    SubmitText: {
      textAlign: 'center',
      fontFamily: 'Poppins-Regular',
      color: '#fff',
      fontSize: 10
    },
    text: {
  
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
      color: '#6F6F6F',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 10
  
    },
  
    Redtext: {
  
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
      color: '#CB5350',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 10
  
    },
  
    Orangetext: {
  
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
      color: '#FBA048',
      justifyContent: 'center',
      alignSelf: 'center',
      padding: 10
  
    },
    Greentext: {
  
      fontFamily: 'Poppins-SemiBold',
      fontSize: 10,
      color: '#559555',
      justifyContent: 'center',
      alignSelf: 'center',
      paddingTop: 10
  
    },
    text2: {
      color: '#6F6F6F',
      fontFamily: 'Poppins-SemiBold',
      fontSize: 12,
      //alignSelf:'center',
      padding: 10
    },
  
    One: {
      flexDirection: 'row',
      padding: 30,
      marginTop: 20
    },
  
    smsimg: {
      height: 20,
      width: 20,
  
    },
    text1: {
      fontFamily: 'Poppins-SemiBold',
      fontSize: 20,
      paddingLeft: 10
    },
  
  })
  
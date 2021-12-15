import {
  View,
  Image,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
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
import Header from '../Components/Header/index'
import { ApiScreen } from "../API/ApiScreen";
import AsyncStorage from "@react-native-community/async-storage";
import Modal from 'react-native-modal';
import PTRView from 'react-native-pull-to-refresh';
import { grey100 } from "react-native-paper/lib/typescript/styles/colors";


export default class ManageDonor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      refer: '',
      isLoading: false,
      id: '',
      current_fund1: '',
      current_fund: '',
      dataSource: [],
      isVisible: true,
      currunt_org:'',
      isPrivate: false,
      offset:0,
      dataSource2: [],
      Total_records:'',
      Limit:'',
      CurrentOffset:'',

    }

  }

  componentDidMount = async () => {

   
    this.setState({
      isLoading: true,
   
    })
    
  
    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);

    let data = JSON.parse(login);
    //  console.log('#################3',data)
    this.access_token = data.token
    //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);

    const meurl = ApiScreen.base_url + ApiScreen.me
    console.log("url:" + meurl);

    fetch(meurl,
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
         console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.current_fund)

        setTimeout(() => {

          this.setState({
            isLoading: false,
            // dataSource:responseJson.data,
            id: responseJson.data.id,
            current_fund1: responseJson.data.current_fund
          })
        }, 2000)
        
      })
      .catch(error => console.log(error))




    const url = ApiScreen.base_url + ApiScreen.get_donorlist
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

        body: JSON.stringify(
          {

            limit : 15,
	          offset:this.state.offset

          })


      }).then(response => response.json())
      .then((responseJson) => {
         console.log('getting data from pagination',responseJson.pagination.total,responseJson.pagination.limit,responseJson.pagination.offset)

        setTimeout(() => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,
            Total_records:responseJson.pagination.total,
            Limit:responseJson.pagination.limit,
            CurrentOffset:responseJson.pagination.offset

          })
        }, 2000)

      })
      .catch(error => console.log(error))




    const url2 = ApiScreen.base_url + ApiScreen.fund_list;
    console.log("url>>>>>>>>>>:" + url2);
    fetch(url2,
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
        // console.log('FUND LIST>>>>>>>>>>>>>>>>',responseJson.data[0].organization)

        setTimeout(() => {
          this.setState({
            isLoading: false,
            dataSource2: responseJson.data,
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

  _refresh = async () => {

    this.setState({
      isLoading: true
    })

  
    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);

    let data = JSON.parse(login);
    //  console.log('#################3',data)
    this.access_token = data.token
    //console.log('%%%%%%%%%%%%%%%%%%%%%%',this.access_token);

    const meurl = ApiScreen.base_url + ApiScreen.me
    console.log("url:" + meurl);

    fetch(meurl,
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
         console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.current_fund)

        setTimeout(() => {

          this.setState({
            isLoading: false,
            // dataSource:responseJson.data,
            id: responseJson.data.id,
            current_fund1: responseJson.data.current_fund
          })
        }, 2000)
        
      })
      .catch(error => console.log(error))




    const url = ApiScreen.base_url + ApiScreen.get_donorlist
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

        // body: JSON.stringify(
        //   {

        //     donatee_id: '1182',
        //     fund_id: '122'

        //   })


      }).then(response => response.json())
      .then((responseJson) => {
        // console.log('getting data from fetchaaaaaaaaaaa',responseJson.data)

        setTimeout(() => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,

          })
        }, 2000)

      })
      .catch(error => console.log(error))




    const url2 = ApiScreen.base_url + ApiScreen.fund_list;
    console.log("url>>>>>>>>>>:" + url2);
    fetch(url2,
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
        // console.log('FUND LIST>>>>>>>>>>>>>>>>',responseJson.data[0].organization)

        setTimeout(() => {
          this.setState({
            isLoading: false,
            dataSource2: responseJson.data,
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


    Add_New_Donor = async () => {
    console.log('Add new donoe');
    const firstname = this.state.firstname;
    const lastname = this.state.lastname;
    const email = this.state.email;
    const mobile = this.state.mobile;
    const refer = this.state.refer;
    //console.log(firstname,lastname,email,mobile,refer);

    this.setState({
      isLoading: true
    })

    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);

    let data = JSON.parse(login);
    //  console.log('#################3',data)
    this.access_token = data.token;
    const addurl = ApiScreen.base_url + ApiScreen.add_donor;
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

          })

      }).then((response) => response.json()).then((responseJson) => {

        //  console.log("from login*** ",responseJson.data);
        //  this.setState({  isLoading:false })
        console.log(responseJson.message)
        if (responseJson.response_code == 200) {
          console.log(responseJson.message)

          this.setState({ isPrivate: false })
          this.componentDidMount()

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


  Add_donor() {
    console.log('addd')
    this.setState({
      isPrivate: true
    })
  }

  modelfalse = () => {



    this.setState({ isPrivate: false })
    this.componentDidMount()


  }

  refresh() {


    this.componentDidMount();

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

        <Header
          navigation={this.props.navigation}
        />

        <View style={styles.One}>
          <Image style={styles.smsimg} source={require('../assets/26.png')} />

          <Text style={styles.text1}>Add/Manage Donors</Text>

        </View>
        <View style={{ flexDirection: 'row', marginBottom: 20 }}>


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
            <Text style={{textAlign:'center', color: '#fff', fontSize: 10, fontFamily: 'Poppins-Regular' }}>Help</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.head}>
          <View>

            <Text style={styles.text}>Name</Text>

          </View>
          <View style={{ flex: 1 }}>

            <Text style={styles.text}>Pledge</Text>

          </View>
          <View style={{ flex: 1 }}>

            <Text style={styles.text}>Offline Amount</Text>

          </View>
          <View style={{ flex: 1 }}>

            <Text style={styles.text}>Online Amount</Text>

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

<PTRView onRefresh={this._refresh} >
        <FlatList

          data={this.state.dataSource}
          keyExtractor={(item, index) => index}
          // horizontal={true}

          renderItem={({ item, index }) => (


            <TouchableOpacity onPress={() => this.props.navigation.navigate('ManageDonorList', { onGoBack: () => this.refresh() })}>
              <View style={styles.row} >

                <View style={{ flex: 1 }}>

                  <Text style={styles.text2}>{item.name}</Text>

                </View>

                <View style={{ flex: 1 }}>

                  <Text style={styles.text2}>{item.pledge_amt}</Text>

                </View>
                <View style={{ flex: 1 }}>

                  <Text style={styles.text2}>{item.offline_amt}</Text>

                </View>
                <View style={{ flex: 1 }}>

                  <Text style={styles.text2}>{item.donation_amt}</Text>

                </View>


              </View>
            </TouchableOpacity>
          )}
        />

</PTRView>

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
    backgroundColor: '#fff'

  },
  button2: {
    backgroundColor: '#CC3739',
    padding: 15,
    width: wp('75%'),
    borderRadius: 30,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10

  },
  textlist: {
  
    marginLeft: 10,
    marginTop:5,
    fontSize: 12,
    fontFamily:'Poppins-Regular',
    color:'#6d6c6a'
    
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
  input: {
    width: wp('75%'),
    //textAlign:'center',
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 10,
    borderColor: '#424242',

    //  borderRadius:30,
    //  backgroundColor:'red'
  },
  searchSection: {
    padding:10

  },

  button: {
    backgroundColor: '#CC3739',
    padding: 8,
    width: wp('30%'),
    borderRadius: 30,
    marginLeft: 10,

    alignSelf: 'center'

  },
  disablebutton: {
    backgroundColor: '#F2F2F2',
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
  DisableText: {
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    color: '#000',
    fontSize: 10
  },
  text: {

    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,

    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10

  },
  text2: {

    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    //alignSelf:'center',
    padding: 10
  },

  ListText2: {

    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color:'#6d6c6a',
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

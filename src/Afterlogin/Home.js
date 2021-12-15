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
    Linking, SafeAreaView,
    ScrollView, FlatList
} from "react-native";

import React, { Component } from "react";
import { Picker } from '@react-native-picker/picker';
import Header from '../Components/Header/index'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ApiScreen } from "../API/ApiScreen";
import AsyncStorage from "@react-native-community/async-storage";
import { roundToNearestPixel } from "react-native/Libraries/Utilities/PixelRatio";
import SendSMS from "./SendSMS";
import PTRView from 'react-native-pull-to-refresh';

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

            isLoading: false,
            dataSource: [],
        //  Id : this.props.route.params.Id,
            name: '',
            dataSource1: [],
            dataSource2: [],
            selectedValue:''
        
        };

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

                if(responseJson.data){
                    AsyncStorage.setItem("currentFund",JSON.stringify(responseJson.data.current_fund));
             
                
                    
                 console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.name)

                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        
                        // dataSource:responseJson.data,
                        name: responseJson.data.name,
                        selectedValue:responseJson.data.current_fund

                        


                    })
                }, 2000)

            }

            })
            .catch(error => console.log(error))


        const url1 = ApiScreen.base_url + ApiScreen.dashboard;

        console.log("url>>>>>>>>>>:" + url1);

        fetch(url1,
            {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': this.access_token
                    // <-- Specifying the Content-Type

                }),


            }).then(response => response.json())

            .then((responseJson) => {
            
                console.log('getting data from fetch>>>>>>>>>>>>>>>>', responseJson)

                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        dataSource1: responseJson.data,
                        //name : responseJson.data.name,

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
                console.log('FUND LIST>>>>>>>>>>>>>>>>', responseJson.data)

                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        dataSource2: responseJson.data,
                        
                        //name : responseJson.data.name,

                    })
                }, 2000)
               // this.setState({ PickerValueHolder });
            })
            .catch(error => console.log(error))


    }


     onPickerValueChange = async (itemValue, itemIndex)=>{

        this.setState({
           
        })
       
        
        this.setState({
            selectedValue: itemValue,
            isLoading: true
           // isLoading: false,
        })
        console.log('>>>>',this.state.selectedValue)

        const login = await AsyncStorage.getItem('login');
        //console.log("dashboard", login);

        let data = JSON.parse(login);
        //  console.log('#################3',data)
        this.access_token = data.token

        const changefund = ApiScreen.base_url + ApiScreen.change_fund
        console.log("changefund:" + changefund);

        fetch(changefund,
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
                      
                        fund_id:this.state.selectedValue
                     
                    })


            }).then(response => response.json())
            .then((responseJson) => {
                 console.log('getting data from fetchaaaaaaaaaaa',responseJson.data)

                
                 console.log("change fund*** ",responseJson.data);
                 this.setState({  isLoading:false })
                  if(responseJson.data.token){
                   console.log(responseJson.success)
                     //console.log("from login ",responseJson.data);
                   
                   AsyncStorage.setItem("login",JSON.stringify(responseJson.data));
                
                 this.componentDidMount()
                  
   
                  }

                  else{
                      
                  //  console.log("change fund%%%%%%%%%%%%%%%%%% ",responseJson.data);
                    this.props.navigation.navigate('people',{
                        id:responseJson.data.participant_sub_id
                    })

                  }

            })
            .catch(error => console.log(error))



      


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

                if(responseJson.data){
                    AsyncStorage.setItem("currentFund",JSON.stringify(responseJson.data.current_fund));
             
                  
                  
                    
                 console.log('getting data from fetchaaaaaaaaaaa',responseJson.data.name)

                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        
                        // dataSource:responseJson.data,
                        name: responseJson.data.name,
                        selectedValue:responseJson.data.current_fund

                        


                    })
                }, 2000)

            }

            })
            .catch(error => console.log(error))


        const url1 = ApiScreen.base_url + ApiScreen.dashboard;

        console.log("url>>>>>>>>>>:" + url1);

        fetch(url1,
            {
                method: 'GET',
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': this.access_token
                    // <-- Specifying the Content-Type

                }),


            }).then(response => response.json())

            .then((responseJson) => {
            
                console.log('getting data from fetch>>>>>>>>>>>>>>>>', responseJson)

                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        dataSource1: responseJson.data,
                        //name : responseJson.data.name,

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
                console.log('FUND LIST>>>>>>>>>>>>>>>>', responseJson.data)

                setTimeout(() => {
                    this.setState({
                        isLoading: false,
                        dataSource2: responseJson.data,
                        
                        //name : responseJson.data.name,

                    })
                }, 2000)
               // this.setState({ PickerValueHolder });
            })
            .catch(error => console.log(error))



      }

    render() {
      
        
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
       // const pname = params ? params.pname : null;
        return (

            <View style={styles.container}>

              
                <Header
                    navigation={this.props.navigation}
                />

                {/* <View style={styles.header}>
                 <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
                        <Image
                            style={{
                            margin: 10,
                            // tintColor: '#f05c54',
                            width: 30,
                            height: 30,
                            }}
                            source={require('../assets/02.png')}
                        />
                 </TouchableOpacity>
                 <View style={{marginLeft:wp('55%'),flexDirection:'row',marginTop:10}}>
                     <Text style={styles.usertext}>Participant:</Text>
                     <Image style={styles.userimg} source={require('../assets/icon.png')}/>
                   
                 </View>
                
            </View> */}
 <PTRView onRefresh={this._refresh} >
                <View style={styles.UserContainer}>
                    <Text style={styles.user}>Hi {this.state.name}</Text>
                    <Text style={styles.text1}>Fundraiser Progress</Text>
                </View>
              

                <View style={styles.pickerContainer}>
              
                {<Picker
                selectedValue={this.state.selectedValue} 
                    
                onValueChange={this.onPickerValueChange} >
                { this.state.dataSource2.map((item, key)=>
                  <Picker.Item label={item.organization} value={item.id} key={key} />
                )}

              </Picker>}

                </View>

                <View style={{ height: 15 }}>

                </View>

                <FlatList

                    data={this.state.dataSource1}
                    keyExtractor={(item, index) => index}
                    horizontal={false}

                    renderItem={({ item, index }) => (
                        <View>
                            <View style={styles.RedBox}>
                                <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular', fontSize: 18, paddingLeft: 20, paddingTop: 30 }}>Goal: ${item.goal_amount}</Text>
                                <View style={{ flexDirection: 'row', paddingLeft: 20, paddingTop: 15 }}>
                                    <View style={{ alignSelf: 'flex-end', justifyContent: 'center', alignContent: 'center', height: 120, width: 120, borderRadius: 120 / 2, borderWidth: 10, borderColor: '#F5F5F5', backgroundColor: '#fff' }}>
                                    {Math.round((parseInt(item.pledge) * 100) / parseInt(item.goal_amount)) >= '100' ?
                                    <Text style={{ color: '#C73A33', textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 26 }}>100%</Text>
                                   
                                :
                                <Text style={{ color: '#C73A33', textAlign: 'center', fontFamily: 'Poppins-Bold', fontSize: 26 }}>{Math.round((parseInt(item.pledge) * 100) / parseInt(item.goal_amount))}%</Text>
                                   
                                }
                                        
                                    </View>

                                    <View style={{ paddingTop: 30, paddingLeft: 30 }}>
                                        <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Poppins-Regular' }}>Pledged</Text>
                                        <Text style={{ color: '#fff', fontSize: 36, fontFamily: 'Poppins-Regular' }}>${item.pledge}</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.greybox}>

                                <Text style={{ fontFamily: 'Poppins-SemiBold', fontSize: 18, padding: 30 }}>Fund Data</Text>

                                <View style={{ flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Fundraiser</Text>
                                    <Text style={styles.fundrighttext}>{item.organization}</Text>
                                </View>

                                <View style={{ paddingTop: 30, flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Fund Start Date</Text>
                                    <Text style={styles.fundrighttext}>{item.start_date}</Text>
                                </View>

                                <View style={{ paddingTop: 30, flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Fund End Date</Text>
                                    <Text style={styles.fundrighttext}>{item.end_date}</Text>
                                </View>

                                <View style={{ paddingTop: 30, flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Of Donors</Text>
                                    <Text style={styles.fundrighttext}>{item.totalDonor}</Text>
                                </View>

                                <View style={{ paddingTop: 30, flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Pledge</Text>
                                    <Text style={styles.fundrighttext}>{item.pledge}</Text>
                                </View>

                                <View style={{ paddingTop: 30, flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Offline donations</Text>
                                    <Text style={styles.fundrighttext}>{item.offline}</Text>
                                </View>

                                <View style={{ paddingTop: 30, flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Donations</Text>
                                    <Text style={styles.fundrighttext}>{item.no_of_donation}</Text>
                                </View>

                                <View style={{ paddingTop: 30, flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Received</Text>
                                    <Text style={styles.fundrighttext}>{item.online}</Text>
                                </View>

                                <View style={{ paddingTop: 30, flexDirection: 'row', marginLeft: 20, marginRight: 20, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1' }}>
                                    <Text style={styles.fundlefttext}>Total Donations</Text>
                                    <Text style={styles.fundrighttext}>{parseInt(item.online) + parseInt(item.offline)}.00</Text>
                                </View>

                            </View>

                        </View>
                    )}
                />
</PTRView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

    fundlefttext: {
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
        color: '#CB3A3F',
        width: wp('45%'),


    },
    fundrighttext: {
        color: '#5F5F5F',
        fontFamily: 'Poppins-SemiBold',
        textAlign: 'right',
        fontSize: 16,
        width: wp('45%'),


    },
    header: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F2',

        padding: 10
    },

    usertext: {
        fontFamily: 'Poppins-SemiBold',
        color: '#5F5F5F',
        paddingTop: 5,
        fontSize: 14
    },

    userimg: {

        height: 30,
        width: 30
    },

    user: {
        fontFamily: 'Poppins-SemiBold',
        color: "#4B4B4B",
        fontSize: 16,
    },
    text1: {
        fontFamily: 'Poppins-SemiBold',
        //color: "#4B4B4B",
        fontSize: 22,
    },
    UserContainer: {
        paddingTop: 0,
        marginTop: 30,
        marginLeft: 30
    },
    pickerContainer: {
        // padding:20,
        width: wp('75%'),
        borderWidth: 1,
        borderRadius: 30,
        justifyContent: 'center',
        backgroundColor: '#F2F2F2',
        borderColor: '#F2F2F2',
        marginLeft: wp('15%'),
        paddingLeft: 20,
        marginTop: 10,


    },

    RedBox: {

        height: wp('55%'),
        backgroundColor: '#CC3739',
        margin: 20,
        borderRadius: 20,

    },

    greybox: {
        //  width:wp('90%'),
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 30,

    }
})
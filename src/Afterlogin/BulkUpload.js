import {
    View,
    Image,
    PermissionsAndroid,
    ActivityIndicator,
    ImageBackground,
    StyleSheet,Button,
    Platform,
    Text,
    TextInput, BackHandler,
    Alert,Input,
    TouchableOpacity,
    Linking, SafeAreaView,
    ScrollView, FlatList
  } from "react-native";
  import React, { PureComponent } from "react";
  import { Table, Row, Rows, TableWrapper, Cell } from 'react-native-table-component';
  import { Picker } from '@react-native-picker/picker';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  import Header from '../Components/Header/index'
  import { ApiScreen } from "../API/ApiScreen";
  import AsyncStorage from "@react-native-community/async-storage";
  import Modal from 'react-native-modal';
  import Contacts from 'react-native-contacts';
  import CheckBox from '@react-native-community/checkbox';
  const async = require('async');

  var selectedTags = [];
 var  mobile =[];
 var Allcontact =[];
  let st;

   class BulkUpload extends PureComponent {
  
    constructor(props) {
      super(props);
      this.state = {
        selectednumber:[],
        uniqueArray:[],
        firstname: '',
        text:'',
      //  mobile:[],
        lastname: '',
        email: '',
        mobile: '',
        refer: '',
        isLoading: false,
        id: '',
        current_fund: '',
        dataSource: [],
        isVisible: true,
        isPrivate: false,
        dataSource2: '',
        checked : true,
        disabled:false,
       
        
      }
      this.offset = 0;
      this.arrayholder = [];
  
    }
  
  

    async componentDidMount() {
      selectedTags = [];
     
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
  
          body: JSON.stringify(
            {
  
              limit : 15,
              offset:this.state.offset
  
            })
  
  
        }).then(response => response.json())
        .then((responseJson) => {
           console.log('getting data from Server>>>>>>>>>>>>',responseJson.data)
  
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
  
   
        if (Platform.OS === "android") {
          PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
            title: "Contacts",
            message: "This app would like to view your contacts."
          }).then(() => {
            setTimeout(() => {
  
                this.setState({
                  isLoading: false,
                 
                })
                this.loadContacts();
              
              }, 2000)
           
          });
        
        } else {

            setTimeout(() => {
  
                        this.setState({
                          isLoading: false,
                         
                        })

                        this.loadContacts();
                       

                        
                      }, 2000)
                      
        }
        
      }
    
       loadContacts = async() =>{
      
      
       
        
        await Contacts.getAll((err,contacts) => {
    
         if(err === 'denied'){
             console.log('errrrrrrrrrrrrrrrrrrrrrrrrrrr')
    
         }

    
         else{
        //  selectedTags = [];
        console.log('????????????????????')
        let serverdataArray = this.state.dataSource;
      
      //  console.log('DDDDDDDD',serverdataArray);
            var asd;
          
                   serverdataArray.forEach(element => {
                       asd =  element.mobile
                       mobile.push(element.mobile);
        
        });

        //   console.log('AAAAAAAAAAAaa',mobile)

          

        


           let newArray = contacts;
         let uniqueArray = [...new Set(newArray)]


        //  responseJson = uniqueArray.slice((this.offset*12),((this.offset+1)*12)-1)
        //  console.log("offset : "+this.offset);

 
         this.offset = this.offset + 1;




            var abc;


      abc =  uniqueArray.filter(function(item){
       // var withoutspace = (item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number).replace(/[^a-zA-Z ]/g, "");
//          var withoutspace = (item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number).replace(/ /g,'');
//          var withoutsymbol= withoutspace.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
// console.log(withoutsymbol);
        if(item.phoneNumbers.length > 0 || item.emailAddresses.length > 0 )
        {
       
          return true
         
        }


        else{
        
          return false
        
        }

          
         })

      //   console.log('>>>>>QQQQQQQQQQQQQQQQQQQ>>>>>>',abc)

          
      abc.forEach(item => {
        //Allcontact.push(item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number.replace(/[ &\/\\#,+()$~%.'":*?<>{}]/g, ''),item.displayName)
        var All_data = {};
       // All_data['mobile'] = item.phoneNumbers[0].number.replace(/[ &\/\\#,+()$~%.'":*?<>{}]/g, '');
        All_data['mobile'] = item.phoneNumbers[0]
        All_data['displayName'] = item.displayName;
        All_data['email'] = item.emailAddresses[0];
        All_data['lname'] = item.familyName;
        All_data['recordID'] = item.recordID;
      
        Allcontact.push(All_data);
        });

     //  console.log(Allcontact);
       var actualData = [];
       Allcontact.forEach(element => {
        var m_data = {};
        var isexistvalue = mobile.includes(element.mobile.number.replace(/[ &\/\\#,+()$~%.'":*?<>{}-]/g, ''));
     //   console.log(element.mobile);
        m_data['mobile'] = element.mobile;
        m_data['displayName'] = element.displayName;
        m_data['lname'] = element.lname;
        m_data['email'] = element.email;
        m_data['recordID'] = element.recordID;

        m_data['is_exist'] = isexistvalue;
        actualData.push(m_data);
       });
//  console.log(actualData);



      const newArraydata = [];
      abc.forEach(obj => {
        if (!newArraydata.some(o => o.displayName === obj.displayName)) {
          newArraydata.push({ ...obj })
        }
   
      });


     
   

    //  var sss ;
    //  sss=   this.state.dataSource.forEach(element => {
    //            element.mobile
      
    //   console.log('????aaaaaaaaaaaaaaaaaa',element.mobile);  
    //   });
          
    // //  console.log('????????????????',newArraydata,sss);
    //   console.log('????aaaaaaaaaaaaaaaaaa',sss);
    //   this.state.dataSource.map(item => {

    //     console.log('AAAAAAAAAAAAAAAAAAAAAAAA',item.mobile);

    // })

    //     var xyz  =  newArraydata.filter(function(item){
    //     //  var withoutspace = (item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number).replace(/[^a-zA-Z ]/g, "");
    //     // var withoutspace = (item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number).replace(/ /g,'');

    //      var withoutspace = (item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number).replace(/[ &\/\\#,+()$~%.'":*?<>{}]/g, '');
         
    //     // var withoutsymbol= withoutspace.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    //      // console.log(withoutspace)
          
     
    //     if(withoutspace  != '919988719795')
    //     {
      
    //       return true

    //     }


    //     else{
        
    //       return false
        
    //     }

        

          
    // })

     // console.log('????????????????',this.state.dataSource);
   
        // var xxyz;
        // xxyz = this.state.dataSource.forEach(element => {

          
        

        // console.log('LLLLLLLLLLLLLLLLL',element.mobile)
        // })
                

          // const index = newArraydata.findIndex(x => x.givenName === name);


          //     data[index].checked = !data[index].checked;
    
            //   newArraydata.filter(function(item){
            // var withoutspace = (item.phoneNumbers && item.phoneNumbers[0] && item.phoneNumbers[0].number).replace(/ /g,'');
            //   var withoutsymbol= withoutspace.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

            //   const index = newArraydata.findIndex(x => x.withoutspace === element.mobile);
            //   if(index)
            //   {
            //     console.log('exists');
            //   }
            //   else{
            //     console.log('not exissts');
            //   }
             
          //  // console.log('LLLLLL',withoutsymbol );
          
          //    if  (withoutsymbol != element.mobile){
          //     console.log('LLLLLLLLLLLLLLLLL',element.mobile)
          //      return true
          //    }
             
          //    else{

          //      return false
          //    // console.log('bbbbbbbbbbbbbbb');
          //    }

      //      })
      // });

    //   newArraydata.forEach(element => {
    //     var withoutspace = (element.phoneNumbers && element.phoneNumbers[0] && element.phoneNumbers[0].number).replace(/ /g,'');
    //     console.log('LLLLLL',withoutspace.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') )
       
        
    //  });
      //console.log('aaaaaaaaaaaaaaaaaaa',xyz);
    
         this.setState({
          uniqueArray: newArraydata,
          
         },() => {
           this.arrayholder = newArraydata
         })
        

       //  this.OnCheckPress();
     
        
         }
    
        })
        
         //Contacts.checkPermission();
       
       }

    
       loadMoreData = () => {
        //On click of Load More button We will call the web API again
          this.setState({ isLoading: true }, () => { 
            //fetch('http://aboutreact.com/demo/getpost.php?offset=' + this.offset)


           
                 responseJson = this.state.uniqueArray.slice((this.offset*12),((this.offset+1)*12)-1)
                  console.log("offset Load : "+this.offset);
                console.log(responseJson);
                //Successful response from the API Call 
                  this.offset = this.offset + 1;
                  
                  //After the response increasing the offset for the next API call.
                  this.setState({
                    //serverData: [...this.state.serverData, ...responseJson.results],
                    uniqueArray: [...this.state.uniqueArray, ...responseJson],
                    isLoading: false,
                    //updating the loading state to false
                  });
             
          });
        };


        
  renderFooter() {
    return (
    //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Loading</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }

    GetFlatListItem(name) {
      Alert.alert(name);
    }
   
    searchData(text) {
     
      const newData = this.arrayholder.filter(item => {
        const itemData = item.displayName.toUpperCase();
     
        const textData = text.toUpperCase();
       
        return itemData.indexOf(textData) > -1
      });
   
      this.setState({
        uniqueArray: newData,
        text: text
        })
      }
   
      itemSeparator = () => {
        return (
          <View
            style={{
              height: .5,
              width: "100%",
              backgroundColor: "#000",
            }}
          />
        );
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
  Alert.alert(responseJson.message);
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
  
  
    Add_donor = async () => {
     // let data1;

     console.log('ADDDDDDDDDDDDDDD',selectedTags);
     console.log('Length',selectedTags.length);
     
     if(selectedTags.length > 20)
     {

       Alert.alert('You cannot select more than 20 contacts.')
     
      }

     else{

     this.setState({
      isLoading: true
    })


    const login = await AsyncStorage.getItem('login');
    //console.log("dashboard", login);

    let data = JSON.parse(login);
    //  console.log('#################3',data)
    this.access_token = data.token;
    const addurl1 = ApiScreen.base_url + ApiScreen.bulkdonor;
    console.log(addurl1,selectedTags);

     let dd = JSON.stringify(selectedTags)
    //   {
        
    //     selectedTags
      
    //   })
       console.log('LLLLLLLLLLLLLLLLL',dd)
    fetch(addurl1,

      {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'token': this.access_token
        },

        body: JSON.stringify(selectedTags)

      

      }).then((response) => response.json()).then((responseJson) => {

        //  console.log("from login*** ",responseJson.data);
          this.setState({  isLoading:false })
        console.log(responseJson.message)
        if (responseJson.response_code == 200) {
          console.log('>>>>>>>>>>>>',responseJson.message)
            Alert.alert(responseJson.message)
          this.setState({ isPrivate: false })
         
          this.props.navigation.navigate('ManageDonorList')
          this.componentDidMount();
        }

        else {

          const invalid = responseJson.message
          console.log(invalid);
        
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
  
    modelfalse = () => {
  
      this.setState({ isPrivate: false })
      this.componentDidMount()
  
    }

  
   checkboxTest (){

    this.setState({
      checked:!this.state.checked
    })

   }
   

    renderHeader = () => (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          paddingTop:15,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
         onChangeText={this.handleSearch}
          status='info'
          placeholder='Search'
          style={{
           // borderRadius: 25,
            borderColor: '#333',
            width:wp('90%'),
            height:hp('6%'),
            backgroundColor: '#fff',
            borderWidth:1
          }}
          textStyle={{ color: '#000' }}
        />
      </View>
    )

    handleSearch = text => {
      console.log(text)
   //   const formattedQuery = text.toLowerCase()
     // const data = filter(this.state.fullData, user => {
       // return this.contains(user, formattedQuery)
      //})
      //this.setState({ data, query: text })
    }

    // contains = ({ name, email }, query) => {
    //   const { first, last } = name
    //   if (first.includes(query) || last.includes(query) || email.includes(query)) {
    //     return true
    //   }
    //   return false
    // }

    

//      onchecked(name,obj,email){
     
//     console.log('%%%%%%%%%%%%%%%%%%%%%',name,obj,email);        
    
//      var fname = '';
//      var lname = '';
//      var obj1 ={};
  

//       this.setState({
//         mobile: obj.number
//       }) 
      
//       console.log('<<<<<<<<<<<<<<<<<',obj.number)

//      if(name != '' && name != null)

//      {
//         var nameArr =  name.split(' ');
//         fname = nameArr[0];
//         //console.log('AAAAAAAAAAAAAAAAAAAAA',nameArr)
//         if(nameArr.length > 1)
//         {
//            lname = nameArr[nameArr.length-1];
//            //fname = nameArr[nameArr.length-1];
//         }

//       }

//      if(fname != '' && email != undefined)
//      {
// //console.log('CCCCCCCCCCCCCCCCCCCCCC',JSON.stringify(obj.number))
   
// obj1['fname'] = fname;
// obj1['lname'] = lname;
// obj1['email'] = email.email;
// obj1['mobile'] = obj.number;
// obj1['message'] = fname
  
//     }

//     if(email == undefined && fname != ''){
     
//       obj1['fname'] = fname;
//       obj1['lname'] = lname;
//       obj1['email'] = "";
//       obj1['mobile'] = obj.number;
//       obj1['message'] = fname;

//     }

//       const data = this.state.uniqueArray;
   
//       const index = data.findIndex(x => x.givenName === name);


//      data[index].checked = !data[index].checked;
    
//       this.setState(data);

    
           
//       if(selectedTags.includes(obj1)){
     
//         selectedTags.splice(selectedTags.indexOf(obj1), 1);
//         console.log('remove')
//       }

//         else{

//           console.log('add')
//           selectedTags.push( obj1);
        
//           }

//        console.log('ccsscc>>>>>>>>>>>>>>>',selectedTags)
     
//     }


onchecked(name, obj1, email) {

    
  
  //console.log('%%%%%%%%%%%%%%%%%%%%%', name, obj1, email);
//var obj1 ={};
  var fname = '';
  var lname = '';




  if (name != '' && name != null) {
    var nameArr = name.split(' ');
    fname = nameArr[0];
    //console.log('AAAAAAAAAAAAAAAAAAAAA',nameArr)
    if (nameArr.length > 1) {
      lname = nameArr[nameArr.length - 1];
      //fname = nameArr[nameArr.length-1];
    }

  }

  if (fname != '' && email != undefined) {
    //console.log('CCCCCCCCCCCCCCCCCCCCCC',JSON.stringify(obj.number))
    //  obj1['id'] = obj.id;
    obj1['fname'] = fname;
    obj1['lname'] = lname;
    obj1['email'] = email.email;
    obj1['mobile'] = obj1.number;
    obj1['message'] = fname

  }

  if (email == undefined && fname != '') {
    // obj['id'] = obj.id;
    obj1['fname'] = fname;
    obj1['lname'] = lname;
    obj1['email'] = "";
    obj1['mobile'] = obj1.number;
    obj1['message'] = fname;

  }

  // console.log('mmmmmmmmmmmmmmm', obj1)



  const data = this.state.uniqueArray;

  const index = data.findIndex(x => x.displayName === name);


  data[index].checked = !data[index].checked;
  

  this.setState(data);

  console.log('array length',selectedTags.length)

  if(selectedTags.length == 20)
  {
    Alert.alert('You cannot send more than 20 contacts..');
    
    if (selectedTags.includes(obj1)) {

      selectedTags.splice(selectedTags.indexOf(obj1), 1);
      console.log(obj1);
      console.log('remove');
    }
  
    else {
  
      console.log('add');
      console.log(obj1);
      selectedTags.push(obj1);
  
    }
    
  }

  else{


  if (selectedTags.includes(obj1)) {
    

    selectedTags.splice(selectedTags.indexOf(obj1), 1);
    console.log('remove');

  }

  else {

    console.log('add');
    console.log('XXXXXXXXXXXXXXXXXX',selectedTags.indexOf(obj1), 1);

    selectedTags.push(obj1);

  }

  }

  console.log('ccsscc>>>>>>>>>>>>>>>', selectedTags);


}




  
    OnCheckPress  ()  {

      console.log('ccsscc>>>>>>>>>>>>>>>',selectedTags)
      

   
  const data = this.state.uniqueArray;

  async.each(data, async function  (res)  {
    res.checked = !res.checked;
    // res.setState(res.checked);
   });
 
    }


  
    handleLOadmOre (){

     Alert.alert('End');
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
  
  
    
      return (
        <SafeAreaView style={styles.container}>
  
        
          <Header
            navigation={this.props.navigation}
          />

          <View style={styles.One}>
              <Image style={styles.smsimg} source={require('../assets/26.png')} />
              <Text style={styles.text1}>Sync Contact</Text>
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 20 }}>
{/*             
            <TouchableOpacity
              onPress={() => this.OnCheckPress()}
                
          //  onPress={() => this.onAllchecked(this.state.uniqueArray)}
              style={styles.button}>
              <Text style={styles.SubmitText}>Select All</Text>
            </TouchableOpacity>
   */}
            <TouchableOpacity style={styles.button1}
             onPress={() => this.Add_donor()}>
              <Text style={{ color: '#fff', fontSize: 10, fontFamily: 'Poppins-Regular',textAlign:'center' }}>Send Now</Text>
            </TouchableOpacity>
  
          </View>
  
          <View style={styles.head}>

              <View>
    
                <Text style={styles.text}>Select</Text>
    
              </View>

              <View style={{ flex: 1 }}>
    
                <Text style={styles.text}>Name</Text>
    
              </View>

              <View style={{ flex: 1 }}>
    
                <Text style={styles.text}>Contact</Text>
    
              </View>
           
  
          </View>
  
          {this.state.isPrivate == true && (
            // <View>
            //     <Text style={styles.privateTextStyle}>
            //       {I18n.t('add_poll.private_poll_desc')}
            //     </Text>
            //   <Text></Text>
  
            <Modal isVisible={this.state.isVisible}>
              <View style={{ flex: 1, backgroundColor: 'white' }}>
  
                <TouchableOpacity
                  onPress={() => this.modelfalse()}>
                      <Text style={styles.closemodalStyle}>X</Text>
                </TouchableOpacity>
  
                <View>
                  <Text style={{ textAlign: 'center' }}>Model</Text>
  
                  <View>
  
                    <View style={styles.searchSection}>
  
                      <TextInput autoCorrect={false}
                        onChangeText={(firstname) => this.setState({ firstname })}
                        //value='garun@delimp.com'
                        placeholder="First Name"
                        style={styles.input}>
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
  
                    <View style={styles.searchSection}>
  
                      <TextInput autoCorrect={false}
                        onChangeText={(mobile) => this.setState({ mobile })}
                        //value='garun@delimp.com'
                        placeholder="Mobile"
                        style={styles.input}
                      >
                      </TextInput>
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
                      onPress={() => this.Add_New_Donor()}>
                      <Text style={styles.SubmitText}>Share Your Page</Text>
                    </TouchableOpacity>
  
                  </View>
                </View>
              </View>
  
            </Modal>
  
          )}
  

  <TextInput 
         style={styles.textInput}
        onChangeText={(text) => this.searchData(text)}
         value={this.state.text}
         underlineColorAndroid='transparent'
         placeholder="Search Here" />
         <Text style={styles.totalcontacthead}>Total number of contacts {this.state.uniqueArray.length}</Text>

  <FlatList
     
     data={this.state.uniqueArray.sort((a,b) => a.displayName.localeCompare(b.displayName))}
   //  data={this.state.uniqueArray}
   ref={(ref) => { this.flatListRef = ref; }}
     keyExtractor={(item, index) => item.recordID}
    //  ItemSeparatorComponent={this.itemSeparator}
    // horizontal={true}
    // ListHeaderComponent={this.renderHeader}
     initialNumToRender={20}
   //  onEndReached={this.loadMoreData}
     onEndReachedThreshold ={0.1}
     ItemSeparatorComponent={() => <View style={styles.separator} />}
     ListFooterComponent={this.renderFooter.bind(this)}
  
     renderItem={({ item, index }) => (
     <View>
     
     <TouchableOpacity

    //  onPress={() => {
    //    this.onchecked(item.givenName,item.phoneNumbers[0],item.emailAddresses[0])}}
    
    >
        {/* {item.phoneNumbers && item.phoneNumbers.length > 0 && item.phoneNumbers.map(

          (numberData,numberIndex) =>{

            return( */}

                <View style={styles.row} >
          
                <View style={{ flex: 1 }}>

                 {/* {console.log( this.state.dataSource[0].mobile ) } 918146124588 */}
              {/* {'AZXXXXXXXXXXXXXXX',mobile} */}
              
           {item.is_exist == true ?

<View>
<CheckBox
           
//  value={item.checked,() => {this.onchecked(item.givenName,item.phoneNumbers[0],item.emailAddresses[0])}}
  value={true}
 //checked ={this.state.checked}
 onChange={() => this.checkboxTest(this)}  
   onValueChange={() => {this.onchecked(item.displayName,
    item.mobile,
    item.email)}}

    //  item.phoneNumbers[0],
    //  item.emailAddresses[0])}}
   disabled={true}
     style={styles.checkbox}
  
   /> 
  {/* <Text>{true}</Text> */}
</View>
           
           :
           
           <View>
           <CheckBox
                      
           //  value={item.checked,() => {this.onchecked(item.givenName,item.phoneNumbers[0],item.emailAddresses[0])}}
             value={item.checked}
            onChange={() => this.checkboxTest(this)}  
              onValueChange={() => {this.onchecked(item.displayName,
                item.mobile,
                item.email)}}
               // disabled={true}
                style={styles.checkbox}
              
              /> 
            {/* <Text>{false}</Text>  */}
</View>
           }
       
          
           
                 

                     

                </View>
               

                <View style={{ flex: 1 }}>

                  <Text style={styles.text2}>{item.displayName}</Text>

                </View>

                <View style={{ flex: 1 }}>

                {/* <Text style={styles.text2}>{item.mobile.number.replace(/[ &\/\\#,+()$~%.'":*?<>{}-]/g, '')}</Text>  */}
                 <Text style={styles.text2}>{item.phoneNumbers && item.phoneNumbers.length}</Text> 

                </View> 
                
                {/* <View style={{ flex: 1 }}>

<Text style={styles.text2}>{item.phoneNumbers[0].number.replace(/[ &\/\\#,+()$~%.'":*?<>{}]/g, '')}</Text>

</View>  */}


              </View>
              

             
            
        {/* //     )

        //   }
        // )
        
        // } */}
    
           </TouchableOpacity>
     </View>
     
      )}
     />

          {/* <FlatList
  
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
  
   */}
  
          {/* <Table style={styles.table}>
            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
            <Rows dataSource={this.state.dataSource && this.state.dataSource} style={styles.row} textStyle={styles.text2}/>
          </Table>  */}
  
  
        </SafeAreaView>
      )
    }
  }

  export default BulkUpload
  
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
      width:wp('100%'),
      textAlign:'center',
      borderRadius: 20,
      backgroundColor: '#F2F2F2',
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      fontFamily: 'Poppins-Bold',
  
    },
    totalcontacthead:{
     padding:10,
      width:wp('100%'),
      textAlign:'center',
     
      backgroundColor: '#F2F2F2',
    
      justifyContent: 'center',
    
      fontFamily: 'Poppins-Bold',

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

    separator: {
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
   
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadMoreBtn: {
      padding: 10,
      backgroundColor: "rgba(204,55,57,.8)",
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    },
  
  })
  
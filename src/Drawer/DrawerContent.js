import React, { Component } from 'react';
import { View, StyleSheet, Image, Text, SafeAreaView } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";


import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';



export function DrawerContent(props) {




//  Capitalize(str){
    // return str.charAt(0).toUpperCase() + str.slice(1);
    // }

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
                <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                      
 
                        <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem style={{marginTop:-30,backgroundColor:'#fff'}}
                        icon={({ focused, color, size }) => (
                          <Image
                            source={require('../assets/10.png')}
                            style={{ height: 15, width:15}}
                           
                          />
                        )}
                        onPress={() => {props.navigation.closeDrawer()}}
                      label=""
                        labelStyle={{color: '#CC3739', marginLeft: 10, fontSize: 16, fontFamily: 'Poppins-SemiBold' }}
                       
                    />

                        <DrawerItem style={{marginTop:20,}}
                       
                               onPress={() => { props.navigation.navigate('ParticipantData') }}
                                label="Participant Panal"
                                labelStyle={{color: '#CC3739', marginLeft: 10, fontSize: 16, fontFamily: 'Poppins-SemiBold' }}
                               
                            />

                            <DrawerItem style={{backgroundColor:'#CC3739',borderRadius:10}}
                             icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/03-a.png')}
                                  style={{ height: 30, width:30}}
                                 
                                />
                              )}
                               onPress={() => { props.navigation.navigate('Preview') }}
                                label="Preview Your Fundraiser"
                                labelStyle={{ color: '#fff', marginLeft: -25, fontSize: 12, fontFamily: 'Poppins-SemiBold' }}
                               
                            />    

                            <DrawerItem
                             icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/08.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}
                              
                               onPress={() => { props.navigation.navigate('DonorActivity') }}
                                label="Donor Activity"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                               
                            />

                            <DrawerItem style={{marginTop:-5,}}

                              icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/11.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                                 onPress={() => { props.navigation.navigate('Homep') }}
                                label="Fundraiser Progress"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                               
                            />

                          <DrawerItem style={{marginTop:-5,}}

                             icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/12.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}
                                 onPress={() => { props.navigation.navigate('AddDonation') }}
                                label="Enter Offline Donation"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                               
                            />

                             <DrawerItem style={{marginTop:-5,}}
                               
                               icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/14.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                               onPress={() => { props.navigation.navigate('ManageDonor') }}

                                label="Add/Manage Doner"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                              
                            />

<DrawerItem style={{marginTop:-5,}}
                               
                               icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/14.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                               onPress={() => { props.navigation.navigate('BulkUpload') }}

                                label="Add Bulk Doner"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                              
                            />

                             <DrawerItem style={{marginTop:-5,}}
                               
                               icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/13.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                               onPress={() => { props.navigation.navigate('SendEmail') }}

                                label="Send Emails"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                              
                            />

                             <DrawerItem style={{marginTop:-5,}}
                               
                               icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/15.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                               onPress={() => { props.navigation.navigate('SendSMS') }}

                                label="Send SMS"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                              
                            />

                            <DrawerItem style={{marginTop:-5,}}

                                icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/16.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                               
                              onPress={() => { props.navigation.navigate('Logout') }}

                                label="Logout"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                              
                            />
                            <DrawerItem style={{marginTop:20,}}
                               
                               icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/17.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                               onPress={() => { props.navigation.navigate('EditProfile') }}

                                label="Edit your profile"
                                labelStyle={{ color: '#5F5F5F', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                              
                            />

                             <DrawerItem style={{backgroundColor:'#4867AA',borderRadius:10}}
                               
                               icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/18.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                             //  onPress={() => { props.navigation.navigate('DonorActivity') }}

                               onPress={() => { props.navigation.navigate('ShareOnFb',{

                                AppName:'Facebook'
                               
                              }) }}

                                label="Share on facebook"
                                labelStyle={{ color: '#fff', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                              
                            />

                            <DrawerItem style={{backgroundColor:'#01A2F3',borderRadius:10}}
                               
                               icon={({ focused, color, size }) => (
                                <Image
                                  source={require('../assets/19.png')}
                                  style={{ height: 15, width:15}}
                                 
                                />
                              )}

                             //  onPress={() => { props.navigation.navigate('DonorActivity') }}
                               onPress={() => { props.navigation.navigate('ShareOnFb',{
                                 AppName:'Twitter'
                               })
                               }}
                                label="Share on twitter"
                                labelStyle={{ color: '#fff', marginLeft: -15, fontSize: 14, fontFamily: 'Poppins-SemiBold' }}
                              
                            />
                        </Drawer.Section>

                    </View>
                </DrawerContentScrollView>
              
            </View>


        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    userInfoSection: {

        height: 140,
        justifyContent: 'center',
        marginTop: 0
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',

    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 10,
        paddingTop: 20

    },
   
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,

        paddingHorizontal: 16,
    },
});

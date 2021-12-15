import React from 'react';
import { Text, Image, View, StyleSheet,Alert,ActivityIndicator,
    TouchableOpacity,TextInput } from 'react-native';
import {ApiScreen} from './API/ApiScreen'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-community/async-storage";
import Modal from 'react-native-modal';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { ScrollView } from 'react-native-gesture-handler';
import Share from 'react-native-share';



class ShareOnTwitter extends React.Component {

    

    render(){
        return(
            <View>

            </View>
        )
    }
}

export default ShareOnTwitter;

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Login';
import Splash from '../Splash';

import people from '../people';
import CreateProfile from '../CreateProfile';
import UpdateMsg from '../UpdateMsg';
import AddDonorStep3 from '../AddDonorStep3';
import Home from '../Afterlogin/Home';
import ParticipantData from '../Afterlogin/ParticipantData'
import SendSMS from '../Afterlogin/SendSMS'
import Logout from '../Logout';
import SendEmail from '../Afterlogin/SendEmail'
import AddDonation from '../Afterlogin/AddDonation'
import DonorActivity from '../Afterlogin/DonorActivity'
import ManageDonor from '../Afterlogin/ManageDonor'
import ManageDonorList from '../Afterlogin/ManageDonorList'
import EditDonor from '../Afterlogin/EditDonor'
import DelDonor from '../Afterlogin/DelDonor'
import SyncContact from '../Afterlogin/SyncContact'
import Preview from '../Afterlogin/Preview';
import AuthCheck from '../Afterlogin/AuthCheck';
import { DrawerContent } from '../Drawer/DrawerContent'
import AddNewDonor from '../Afterlogin/AddNewDonor';
import BulkUpload from '../Afterlogin/BulkUpload';
import linking from '../../linking';
import EditProfile from '../Afterlogin/EditProfile';
import ShareOnFb from '../Afterlogin/ShareOnFb';
import ShareOnTwitter from '../Afterlogin/ShareOnTwitter';

const Stack = createStackNavigator();

function SignInScreen() {
  return (


    <Stack.Navigator initialRouteName="AuthCheck">

      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          title: 'Splash',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="AuthCheck"
        component={AuthCheck}
        options={{
          title: 'AuthCheck',
          headerShown: false,
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
       <Stack.Screen
        name="people"
        component={people}
        options={{
          title: 'people',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
       <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{
          title: 'CreateProfile',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<Stack.Screen
        name="UpdateMsg"
        component={UpdateMsg}
        options={{
          title: 'UpdateMsg',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


<Stack.Screen
        name="AddDonorStep3"
        component={AddDonorStep3}
        options={{
          title: 'AddDonorStep3',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
            
    </Stack.Navigator>
  )
}

const HomeStack = createStackNavigator();

function MainNavigation1() {

  return (

    <HomeStack.Navigator initialRouteName={"Homep"}>

      <HomeStack.Screen
        name="Homep"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="Preview"
        component={Preview}
        options={{
          title: 'Preview',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'EditProfile',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


      <HomeStack.Screen
        name="ParticipantData"
        component={ParticipantData}
        options={{
          title: 'ParticipantData',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="SendSMS"
        component={SendSMS}
        options={{
          title: 'SendSMS',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="SendEmail"
        component={SendEmail}
        options={{
          title: 'SendEmail',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="AddDonation"
        component={AddDonation}
        options={{
          title: 'AddDonation',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="DonorActivity"
        component={DonorActivity}
        options={{
          title: 'DonorActivity',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="AddNewDonor"
        component={AddNewDonor}
        options={{
          title: 'AddNewDonor',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="ManageDonor"
        component={ManageDonor}
        options={{
          title: 'ManageDonor',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

       <HomeStack.Screen
        name="BulkUpload"
        component={BulkUpload}
        options={{
          title: 'BulkUpload',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<HomeStack.Screen
        name="ShareOnFb"
        component={ShareOnFb}
        options={{
          title: 'ShareOnFb',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


<HomeStack.Screen
        name="ShareOnTwitter"
        component={ShareOnTwitter}
        options={{
          title: 'ShareOnTwitter',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="ManageDonorList"
        component={ManageDonorList}
        options={{
          title: 'ManageDonorList',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="EditDonor"
        component={EditDonor}
        options={{
          title: 'EditDonor',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="DelDonor"
        component={DelDonor}
        options={{
          title: 'DelDonor',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <HomeStack.Screen
        name="SyncContact"
        component={SyncContact}
        options={{
          title: 'SyncContact',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

      <HomeStack.Screen
        name="Logout"
        component={Logout}
        options={{
          title: 'Logout',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: { 
            fontWeight: 'bold',
          },
        }}
      />

<Stack.Screen
        name="people"
        component={people}
        options={{
          title: 'people',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
       <Stack.Screen
        name="CreateProfile"
        component={CreateProfile}
        options={{
          title: 'CreateProfile',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />

<Stack.Screen
        name="UpdateMsg"
        component={UpdateMsg}
        options={{
          title: 'UpdateMsg',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,

          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />


<Stack.Screen

        name="AddDonorStep3"
        component={AddDonorStep3}
        options={{
          title: 'AddDonorStep3',
          headerStyle: {
            backgroundColor: '#e85b3d',
          },
          headerShown: false,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerTitleStyle: {
          fontWeight: 'bold',
          },
        }}

      />

    </HomeStack.Navigator>

  )
}


const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={MainNavigation1} />


    </Drawer.Navigator>
  );
}


const MainNavigation = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator headerMode={false} >
        {/* <Stack.Screen name="AuthCheck" component={AuthCheck} /> */}
        <Stack.Screen name="Auth" component={SignInScreen} />
         <Stack.Screen name="Home" component={MyDrawer} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigation;
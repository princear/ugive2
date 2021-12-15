/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import MainNavigation from './src/Navigations/MainNavigation'

AppRegistry.registerComponent(appName, () => MainNavigation);

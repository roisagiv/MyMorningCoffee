global.XMLHttpRequest = global.originalXMLHttpRequest ? global.originalXMLHttpRequest : global.originalXMLHttpRequest;
import { AppRegistry } from 'react-native';
import App from './src/Components/App';

AppRegistry.registerComponent('MyMorningCoffee', () => App);

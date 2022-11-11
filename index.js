import 'react-native-gesture-handler';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore'

import { registerRootComponent } from 'expo';

// ##### FIRESTOR EMULATOR #####
if(__DEV__) {
    console.log('##### FIRESTOR EMULATOR RUNNING #####')
    firestore()
    .terminate()
    .then(() => {
        firestore()
        .clearPersistence()
        .then(() => {
            firestore()
            .useEmulator('localhost', 8080);
        })
        .catch(() => console.log('Clear persistence error'));
    })
    .catch(() => console.log('Terminate error'));
};

/* ******************************* */
// To start emulator firestore with flag "--project project_id" run this command:
// firebase emulators:start --only firestore --project fir-shop-cce58

firestore();

import App from './App';

registerRootComponent(App);

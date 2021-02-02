import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyBrGV__XMtPo7HMJxmxQDiKpU8CCMvGUok',
    authDomain: 'kosku-3cdd1.firebaseapp.com',
    projectId: 'kosku-3cdd1',
    storageBucket: 'kosku-3cdd1.appspot.com',
    messagingSenderId: '327172567751',
    appId: '1:327172567751:web:79a3a1f4c7fddd1f6784e2',
    measurementId: 'G-7ZZ4MQTY0P'
}

firebase.initializeApp(firebaseConfig)
firebase.analytics()

export const useAuth = firebase.auth()
export const useDb = firebase.firestore()
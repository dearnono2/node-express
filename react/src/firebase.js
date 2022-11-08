import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxqX5aCdVYZECGlVEN_z7hW2Pd5qct_9Y",
  authDomain: "node-project-3d9cf.firebaseapp.com",
  projectId: "node-project-3d9cf",
  storageBucket: "node-project-3d9cf.appspot.com",
  messagingSenderId: "577327977089",
  appId: "1:577327977089:web:e705162675803d21e6b380"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
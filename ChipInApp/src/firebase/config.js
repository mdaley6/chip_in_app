// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-lxasPftnX8OrLAxI0C-dSqCXybjQe94",
    authDomain: "chipinapp-1f983.firebaseapp.com",
    databaseURL: "https://chipinapp-1f983-default-rtdb.firebaseio.com",
    projectId: "chipinapp-1f983",
    storageBucket: "chipinapp-1f983.appspot.com",
    messagingSenderId: "194517163185",
    appId: "1:194517163185:web:9ca761e8e1e2f01f209690",
    measurementId: "G-LBBMSH44Z1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { firebase };
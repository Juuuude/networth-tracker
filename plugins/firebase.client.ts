// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

export default defineNuxtPlugin(nuxtApp => {
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyAcx-n23jaUOeE7QkKqQ0YGfoJK7nLqpWM",
        authDomain: "networth-tracker-2bfc0.firebaseapp.com",
        databaseURL: "https://networth-tracker-2bfc0-default-rtdb.firebaseio.com",
        projectId: "networth-tracker-2bfc0",
        storageBucket: "networth-tracker-2bfc0.appspot.com",
        messagingSenderId: "366285204132",
        appId: "1:366285204132:web:c42b90675a669c66fa5431",
        measurementId: "G-15T2KTQR3T"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)
    const analytics = getAnalytics(app);

    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

})
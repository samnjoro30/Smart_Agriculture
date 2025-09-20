import { initializeApp, getApps, getApp } from "firebase/app";
import { getPerformance } from 'firebase/performance';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,

}

const app =!getApps().length ? initializeApp(firebaseConfig) : getApp();

const per = getPerformance(app);

export default app;
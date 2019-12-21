import React, { createContext, useEffect, useState } from 'react';
import app from 'firebase';

export declare interface IFirebaseContext {
  auth?: app.auth.Auth;
}
const FirebaseContext = createContext<IFirebaseContext>({});
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const Provider: React.FC = (props) => {
  const [auth, updateAuth] = useState<app.auth.Auth>();
  useEffect(() => {
    app.initializeApp(config);
    updateAuth(app.auth())
  },[])
  return <FirebaseContext.Provider value={{ auth }}>{props.children}</FirebaseContext.Provider>
}
export default {
  Provider,
  Consumer: FirebaseContext.Consumer,
  useContext: FirebaseContext,
}

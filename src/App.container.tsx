import React from 'react';
import Firebase from './context/FirebaseContext';
import App from './App.component';

const AppContainer: React.FC = () => {
  return (
    <Firebase.Provider>
      <App />
    </Firebase.Provider>
  );
}

export default AppContainer;

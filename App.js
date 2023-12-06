import React, { Component } from 'react';
// import Hello from './component/Hello';
import Main from './component/Main'
import { ConfigureStore } from './redux/ConfigureStore';
import { Provider } from 'react-redux';
// redux-persist
import { PersistGate } from 'redux-persist/es/integration/react';
const { persistor, store } = ConfigureStore();
//fire base
import { initializeApp } from 'firebase/app';
const firebaseConfig = { databaseURL: 'https://reactnative-5c263-default-rtdb.asia-southeast1.firebasedatabase.app/' };
initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
         <PersistGate persistor={persistor}>
        <Main/>
        </PersistGate>
      </Provider>
      
    );
  }
}
export default App;
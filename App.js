import React, { Component } from 'react';
// import Hello from './component/Hello';
import Main from './component/Main'
import { ConfigureStore } from './redux/ConfigureStore';
import { Provider } from 'react-redux';
// redux-persist
import { PersistGate } from 'redux-persist/es/integration/react';
const { persistor, store } = ConfigureStore();


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
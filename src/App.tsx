import React from 'react';

import './App.css';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserToken, removeUserToken } from './providers/redux/reducers';

function App(props: any) {
  const dispatch = useDispatch();
  const authToken = useSelector((store: any) => store.userAuth.authToken);
  console.log('Token', authToken);

  const makeRequest = async () => {
    await axios.get('http://localhost:8000/login/donantes/').then((res) => {
      console.log('Success', res)
    }).catch((err) => {
      console.log('Error', err)
    })
  }

  return (
    <div className="App">
      {authToken && (
        <h1>
          Token Set: {authToken}
        </h1>
      )}
      <button onClick={() => dispatch(setUserToken('1235raxcfqerf319vb'))}>Loggear usuario</button>
      <button onClick={() => dispatch(removeUserToken())}>Desloggear usuario</button>
    </div>
  );
}

export default App;

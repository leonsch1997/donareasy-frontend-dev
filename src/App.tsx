import { Routes, Route } from 'react-router-dom';

import { LoginForm } from './components/LoginFormCopy';
import { Lander } from './components/Lander';
import { RecoverSteps } from './components/ForgotPassword';
import { Logup } from './components/Logup';

// Todo: encapsular rutas y mover a ./routes
const App = () => {
  return(
    <Routes>
      <Route path='/home' element={<Lander />}/> 
      <Route path='/login' element={<LoginForm />}/>
      <Route path='/forgot-password' element={<RecoverSteps />}/>
      <Route path="/logup" element={<Logup />}/>
    </Routes>
  )
}

export default App;

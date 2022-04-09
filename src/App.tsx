import { Routes, Route } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import { Lander } from './components/Lander';
import { RecoverSteps } from './components/ForgotPassword';

// Todo: encapsular rutas y mover a ./routes
const App = () => {
  return(
    <Routes>
      <Route path='/home' element={<Lander />} /> 
      <Route path='/login' element={<LoginForm />} />
      <Route path='/forgot-password' element={<RecoverSteps />}/>        
    </Routes>
  )
}

export default App;

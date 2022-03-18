import { Routes, Route } from 'react-router-dom';

import { LoginForm } from './components/LoginForm';
import { Lander } from './components/Lander';

// Todo: encapsular rutas y mover a ./routes
const App = () => {
  return(
    <Routes>
      <Route path='/home' element={<Lander />} /> 
      <Route path='/login' element={<LoginForm />} />          
    </Routes>
  )
}

export default App;

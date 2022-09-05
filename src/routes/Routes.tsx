import { useSelector } from "react-redux";
import { Navigate, Outlet, Route, Routes as RouterDomRoutes } from "react-router-dom";

import { Logup } from "../components/Logup";
import { Lander } from "../components/Lander";
import { LoginForm } from "../components/LoginFormCopy";
import { RecoverSteps } from "../components/ForgotPassword";
import { authSelector } from "../redux/reducers";

export const routes = {
  home: '/home',
  login: '/login',
  logup: '/logup',
  forgotPassword: '/forgot-password'
}

export const PrivateRoutes = () => {
  const authToken = useSelector(authSelector);
  return (
    authToken ? <Outlet /> : <Navigate to={routes.login}/>
  )
};

export const Routes = () => {
  return (
    <RouterDomRoutes>
      <Route element={<PrivateRoutes />}>
        <Route path='/' element={<Lander />} /> 
      </Route>

      <Route path={routes.login} element={<LoginForm />}/>
      <Route path={routes.forgotPassword} element={<RecoverSteps />}/>
      <Route path={routes.logup} element={<Logup />}/>
    </RouterDomRoutes>
  )
}
import { Route, Routes as RouterDomRoutes } from "react-router-dom";
import {
  RecoverSteps,
  Logup,
  Lander,
  LoginForm,
  Donations,
  Apadrinamiento,
  CrearDonacion,
  VisualizarDonacion
} from '../components';
import { PrivateRoute } from './PrivateRoute';
import { routes } from "./constants";
import { HomeView as Home } from '../views';

const makePrivate = (Component: React.FC) => <PrivateRoute><Component /></PrivateRoute>

export const Routes = () => {
  return (
    <RouterDomRoutes>
      <Route path={routes.home} element={makePrivate(Home)} />
      <Route path={routes.donaciones} element={makePrivate(Donations)}/> 
      <Route path={routes.donar} element={makePrivate(CrearDonacion)}/>
      <Route path={routes.apadrinar} element={makePrivate(Apadrinamiento)}/>
      <Route path={routes.verDonacion} element={makePrivate(VisualizarDonacion)}/>
      <Route path={routes.lander} element={<Lander />} />
      <Route path={routes.login} element={<LoginForm />} />
      <Route path={routes.forgotPassword} element={<RecoverSteps />} />
      <Route path={routes.logup} element={<Logup />} />
    </RouterDomRoutes>
  );
};

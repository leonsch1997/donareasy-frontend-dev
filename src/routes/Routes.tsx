import { Route, Routes as RouterDomRoutes } from "react-router-dom";
import {
  RecoverSteps,
  Logup,
  Lander,
  LoginForm,
  Donations,
  Apadrinamiento,
  HomeView as Home,
  CrearDonacion,
  VisualizarDonacion
} from '../components';
import { PrivateRoute } from './PrivateRoute';
import { routes } from "./constants";

export const Routes = () => {
  return (
    <RouterDomRoutes>
      <Route path={routes.home} element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.donaciones}
        element={
          <PrivateRoute>
            <Donations />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.donar}
        element={
          <PrivateRoute>
            <CrearDonacion />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.apadrinar}
        element={
          <PrivateRoute>
            <Apadrinamiento />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.verDonacion}
        element={
          <PrivateRoute>
            <VisualizarDonacion />
          </PrivateRoute>
        }
      />
      <Route path={routes.lander} element={<Lander />} />
      <Route path={routes.login} element={<LoginForm />} />
      <Route path={routes.forgotPassword} element={<RecoverSteps />} />
      <Route path={routes.logup} element={<Logup />} />
    </RouterDomRoutes>
  );
};

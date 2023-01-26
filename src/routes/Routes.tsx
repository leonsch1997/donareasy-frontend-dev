import { FC } from 'react';
import {
  Navigate,
  Route,
  Routes as RouterDomRoutes,
} from "react-router-dom";

import { Logup } from "../components/Logup";
import { Lander } from "../components/Lander";
import { LoginForm } from "../components/Login";
import { Donations } from "../components/Donations";
import { RecoverSteps } from "../components/ForgotPassword";
import { CrearDonacion } from "../components/Donations/CrearDonacion";
import { CrearApadrinamiento } from "../components/Apadrination/CrearApadrinamiento";
import { VisualizarDonacion } from "../components/Donations/VisualizarDonacion";
import { useCookies } from 'react-cookie';
import { HomeView } from "../components/Home";

export const routes = {
  lander: "/lander",
  home: "/home",
  login: "/login",
  logup: "/logup",
  donaciones: "/donaciones",
  donar: "/donate",
  apadrinar: "/apadrinamiento",
  forgotPassword: "/forgot-password",
  verDonacion: "/verDonacion",
};

export const PrivateRoute: FC<any> = ({ children }) => {
  const [{ userToken }] = useCookies(); // Para hacer: Implementar cookies + redux. Por ahora solo esto

  return userToken ? children : <Navigate to={routes.login} replace={true} />;
};

export const Routes = () => {
  return (
    <RouterDomRoutes>
      <Route path={routes.home} element={
          <PrivateRoute>
            <Donations />
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
            <CrearApadrinamiento />
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

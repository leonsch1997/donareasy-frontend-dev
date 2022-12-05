import { useSelector } from "react-redux";
import {
  Navigate,
  Outlet,
  Route,
  Routes as RouterDomRoutes,
} from "react-router-dom";

import { Logup } from "../components/Logup";
import { Lander } from "../components/Lander";
import { HomeView } from "../components/Home";
import { LoginForm } from "../components/LoginFormCopy";
import { Donations } from "../components/Donations";
import { RecoverSteps } from "../components/ForgotPassword";
import { authSelector } from "../redux/reducers";
import { CrearDonacion } from "../components/Donations/CrearDonacion";

export const routes = {
  lander: "/lander",
  home: "/home",
  login: "/login",
  logup: "/logup",
  donaciones: "/donaciones",
  donar: "/donate",
  forgotPassword: "/forgot-password",
};

export const PrivateRoutes = ({ children }) => {
  const { authToken } = useSelector(authSelector);

  return authToken != null ? children : <Navigate to={routes.login} />;
};

export const Routes = () => {
  return (
    <RouterDomRoutes>
      <Route path={routes.home} element={<HomeView />} />

      <Route
        path={routes.donaciones}
        element={
          <PrivateRoutes>
            <Donations />
          </PrivateRoutes>
        }
      />
      <Route
        path={routes.donar}
        element={
          <PrivateRoutes>
            <CrearDonacion />
          </PrivateRoutes>
        }
      />

      <Route path={routes.lander} element={<Lander />} />
      <Route path={routes.login} element={<LoginForm />} />
      <Route path={routes.forgotPassword} element={<RecoverSteps />} />
      <Route path={routes.logup} element={<Logup />} />
    </RouterDomRoutes>
  );
};

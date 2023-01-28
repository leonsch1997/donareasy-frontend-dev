import { Route, Routes as RouterDomRoutes } from "react-router-dom";
import { Logup } from "../components/Logup";
import { Lander } from "../components/Lander";
import { LoginForm } from "../components/Login";
import { Donations } from "../components/Donations";
import { RecoverSteps } from "../components/ForgotPassword";
import { CrearDonacion } from "../components/Donations/CrearDonacion";
import { CrearApadrinamiento } from "../components/Apadrination/CrearApadrinamiento";
import { VisualizarDonacion } from "../components/Donations/VisualizarDonacion";
import { HomeView as Home } from '../components/Home';
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

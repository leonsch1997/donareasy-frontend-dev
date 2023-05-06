import { Route, Routes as RouterDomRoutes } from "react-router-dom";
import { routes } from "./constants";
import { makePrivate } from "./PrivateRoute";
import {
  Home,
  Lander,
  Login,
  Logup,
  SponsorChild,
  CreateDonation,
  RejectDonation,
  Recover as RecoverPassword,
} from "../views";

export const Routes = () => {
  return (
    <RouterDomRoutes>
      <Route path={routes.home} element={makePrivate(Home)} />
      <Route path={routes.donar} element={makePrivate(CreateDonation)} />
      <Route path={routes.apadrinar} element={makePrivate(SponsorChild)} />
      <Route path={routes.rejectDonation} element={makePrivate(RejectDonation)} />
      <Route path={routes.lander} element={<Lander />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.forgotPassword} element={<RecoverPassword />} />
      <Route path={routes.logup} element={<Logup />} />
    </RouterDomRoutes>
  );
};

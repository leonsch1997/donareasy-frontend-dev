import { Route, Routes as RouterDomRoutes } from "react-router-dom";
import { routes } from "./constants";
import { makePrivate } from './PrivateRoute';
import {
  Home,
  Lander,
  Login,
  Logup,
  Donations,
  SponsorChild,
  CreateDonation,
  View as ViewDonation,
  Recover as RecoverPassword
} from '../views';

export const Routes = () => {
  return (
    <RouterDomRoutes>
      <Route path={routes.home} element={makePrivate(Home)} />
      <Route path={routes.donaciones} element={makePrivate(Donations)}/> 
      <Route path={routes.donar} element={makePrivate(CreateDonation)}/>
      <Route path={routes.apadrinar} element={makePrivate(SponsorChild)}/>
      <Route path={routes.donationDetail} element={makePrivate(ViewDonation)}/>
      {/* <Route path={routes.donationDetail} element={makePrivate(RejectDonation)}/> */}
      <Route path={routes.lander} element={<Lander />} />
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.forgotPassword} element={<RecoverPassword />} />
      <Route path={routes.logup} element={<Logup />} />
    </RouterDomRoutes>
  );
};

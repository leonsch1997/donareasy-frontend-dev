import { FC } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { routes } from "./constants";

export const makePrivate = (Component: React.FC) => <PrivateRoute><Component /></PrivateRoute>

const PrivateRoute: FC<any> = ({ children }) => {
  const [{ userToken }] = useCookies(); // Para hacer: Implementar cookies + redux. Por ahora solo esto
  return userToken ? children : <Navigate to={routes.login} replace={true} />;
};

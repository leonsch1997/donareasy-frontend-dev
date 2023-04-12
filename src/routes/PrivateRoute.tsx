import { FC } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

import { routes } from "./constants";
import { clientSession } from "../components/constants";

export const makePrivate = (Component: FC) => (
  <PrivateRoute>
    <Component />
  </PrivateRoute>
);

const PrivateRoute: FC<any> = ({ children }) => {
  const [cookies] = useCookies();

  return cookies[clientSession] ? (
    children
  ) : (
    <Navigate to={routes.login} replace={true} />
  );
};

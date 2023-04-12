import axios from "axios";
import { useCallback, useState } from "react";
import { endpoints } from "../api";
import { LoginFormValues } from "../components/Login/types";
import { clientSession, wrongCredentialsError } from "../components/constants";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";

export const useLogin = () => {
  const navigate = useNavigate();
  const [, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  const logUser = useCallback(async (formValues: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post(endpoints["login"], formValues, { withCredentials: true });
      setCookie(clientSession, res.data);
      navigate(routes.home);
    } catch {
      setError(new Error(wrongCredentialsError));
      removeCookie(clientSession);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { logUser, loading, error };
};

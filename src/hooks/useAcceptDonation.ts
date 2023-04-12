import axios from "axios";
import { useCallback, useState } from "react";
import { endpoints } from "../api";

export const useAcceptDonation = () => {
  const [pending, setLoading] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  const acceptDonation = useCallback(async (donationId: string) => {
    setLoading(true);
    try {
      await axios(endpoints.aceptarDonacion(donationId), {
        method: 'PUT',
        withCredentials: true,
      });
      setAccepted(true)
    } catch {
      setError(new Error('Ha ocurrido un error al aceptar la donación.'));
      setAccepted(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { acceptDonation, pending, accepted, error };
};

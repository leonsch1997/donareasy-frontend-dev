import axios from "axios";
import { useCallback, useState } from "react";
import { endpoints } from "../api";

export const useCancelDonation = () => {
  const [pending, setLoading] = useState<boolean>(false);
  const [cancelled, setCancel] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  const cancelDonation = useCallback(async (donationId: string) => {
    setLoading(true);
    try {
      await axios(endpoints.cancelarDonacion(donationId), {
        method: 'PUT',
        withCredentials: true,
      });
      setCancel(true)
    } catch {
      setError(new Error('Ha ocurrido un error al aceptar la donación.'));
      setCancel(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { cancelDonation, pending, cancelled, error };
};

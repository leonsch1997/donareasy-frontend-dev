import axios from "axios";
import { useCallback, useState } from "react";
import { endpoints } from "../api";

export const useRejectDonation = () => {
  const [pending, setLoading] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  const rejectDonation = useCallback(async (donationId: string) => {
    setLoading(true);
    try {
      await axios(endpoints.aceptarDonacion(donationId), {
        method: 'PUT',
        withCredentials: true,
      });
      setRejected(true)
    } catch {
      setError(new Error('Ha ocurrido un error al aceptar la donación.'));
      setRejected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { rejectDonation, pending, rejected, error };
};

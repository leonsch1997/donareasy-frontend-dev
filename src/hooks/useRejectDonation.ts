import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../api";
import { Donation } from "../components/Institution/types";
import { routes } from "../routes";

export const useRejectDonation = () => {
  const navigate = useNavigate();
  const [pending, setLoading] = useState<boolean>(false);
  const [rejected, setRejected] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  const goToReject = (donation: Donation) => navigate(routes.rejectDonation, { state: donation });

  const rejectDonation = useCallback(async (donationId: string, reason?: string) => {
    setLoading(true);
    try {
      await axios(endpoints.rechazarDonacion(donationId), {
        method: 'PUT',
        withCredentials: true,
        data: { motivo_cancelacion: reason }
      });
      setRejected(true)
    } catch {
      setError(new Error('Ha ocurrido un error al aceptar la donación.'));
      setRejected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { rejectDonation, goToReject, pending, rejected, error };
};

import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { endpoints } from "../api";
import { Donation } from "../components/Common/types";
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
      await axios.patch(endpoints.rechazarDonacion(donationId), { motivo_cancelacion: reason || 'No se ha detallado el motivo.' }, {
        withCredentials: true,
      });
      setRejected(true);
      window.history.replaceState(null, donationId);
    } catch {
      setError(new Error('Ha ocurrido un error al aceptar la donación.'));
      setRejected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  return { rejectDonation, goToReject, pending, rejected, error };
};

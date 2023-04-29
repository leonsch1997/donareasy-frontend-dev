import axios from "axios";
import { useCallback, useState } from "react";
import { Donation } from "../components/Institution/types";
import { endpoints } from "../api";

export const useAcceptDonation = () => {
  const [pending, setLoading] = useState<boolean>(false);
  const [accepted, setAccepted] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  const acceptDonation = useCallback(async (donation: Donation) => {
    setLoading(true);
    try {
      {donation.monto ? (
      await axios(endpoints.aceptarTransferencia(donation.id), {
        method: 'PUT',
        withCredentials: true,
      })
    )
    : (await axios(endpoints.aceptarDonacion(donation.id), {
      method: 'PUT',
      withCredentials: true,
    }))
    } ;
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

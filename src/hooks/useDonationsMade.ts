import axios from "axios";
import { useCallback, useState } from "react";
import { Donation } from "../components/Donor/types";
import { endpoints } from "../api";

export const useDonationsMade = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  const fetchDonationsMade = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${endpoints.listadoDonaciones}`, {
        withCredentials: true,
      });
      setDonations(response.data.results);
    } catch {
      setError(new Error());
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchDonationsMade, donations, loading, error };
};

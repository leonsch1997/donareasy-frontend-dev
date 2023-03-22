import axios from 'axios';
import { useState } from 'react';
import { Donation } from '../components/Institution/types';
import { endpoints } from '../api';

export const usePendingDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean | Error>(false);

  const fetchPendingDonations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${endpoints.donacionesPendientes}`, {
        withCredentials: true,
      });
      setDonations(response.data.results);
    } catch {
      setError(new Error());
    } finally {
      setLoading(false);
    }
  };

  return { fetchPendingDonations, donations, loading, error };
};

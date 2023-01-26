import { Text } from '@chakra-ui/react';
import axios from "axios";
import { useEffect, useState } from "react";
import { endpoints } from "../../../../api";
import { Donacion } from "../../../Donations/types";

export const DonationSelector = ({idDonacion}: {idDonacion: number}) => {
  const [donacion, setDonacion] = useState({});

  const fetchDonacion = async () => {
    console.log(idDonacion.toString());
    const response = await axios.get(endpoints.donacionesPendientes+idDonacion.toString()+'/', {
      withCredentials: true,
    });
    setDonacion(response.data);
  };

  useEffect(() => {
    fetchDonacion();
  }, []);
  
  return (
    <div>
      <Text>{idDonacion}</Text>
      <Text>Acá van los datos de la donación</Text>
      <Text>Acá va la lista de Bienes con toda la información</Text>
    </div>
  );
}
import axios from "axios";
import { useEffect, useState } from "react";
import { endpoints } from "../../../../api";
import { Donacion } from "../../../../components/Donations/types";

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
      <p>{idDonacion}</p>
      {/*<p>{donacion.cod_estado}</p>
      {console.log(donacion.bienes)} */}
    </div>
  );
}
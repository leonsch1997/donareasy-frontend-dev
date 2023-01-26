import axios from "axios";
import { useEffect, useState } from "react";
import { endpoints } from "../../../../api";
import { Text } from "@chakra-ui/react";

export const TransactionSelector = ({idTransaction}: {idTransaction: number}) => {
  const [transaction, setTransaction] = useState({});

  const fetchTransaction = async () => {
    console.log(idTransaction.toString());
    const response = await axios.get(endpoints.transferenciasPendientes+idTransaction.toString()+'/', {
      withCredentials: true,
    });
    setTransaction(response.data);
  };

  useEffect(() => {
    fetchTransaction();
  }, []);
  
  return (
    <div>
      <Text>{idTransaction}</Text>
      <Text>Acá van los datos de la transferencia Bancaria</Text>
    </div>
  );
}
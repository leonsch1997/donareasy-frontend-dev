import {
  Text,
  Button,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../api";

export const VisualizarDonacion = () => {
  const [donacionPendiente, setDonacionPendiente] = useState();
  const idDonacion = 13;

  const fetchDonacionPendiente = async () => {
    const response = await axios.get(endpoints.donacionesPendientes+idDonacion+'/', {
      withCredentials: true,
    });
    setDonacionPendiente(response.data);
  };

  useEffect(() => {
    fetchDonacionPendiente();
  }, []);
  
  console.log(donacionPendiente);

  return (
    <Container
      ml={0}
      pt={4}
      pb={4}
      maxW={{ md: "100%" }}
      h={{ md: "100%" }}
      bg="white"
    >
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={1} height={{ md: "55vh" }}>
          <Text fontSize={"4xl"} fontWeight={"bold"} align={"left"}>
            Donación Pendiente
          </Text>
          {/* {console.log(donacionPendiente['id'])} */}
          {/* <Text>Código: {donacionPendiente['id']}</Text>
          <Text>Donante: {donacionPendiente['donante']}</Text>
          <Text>Bienes: {donacionPendiente['bienes']}</Text> */}
          <Button colorScheme='green' size='sm'>Aceptar</Button>
          <Button colorScheme='red' size='sm'>Rechazar</Button>
          
        </GridItem>
      </Grid>
    </Container>
  );
};

export default VisualizarDonacion;
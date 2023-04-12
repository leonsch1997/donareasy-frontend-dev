import axios from "axios";
import { FC, useEffect, useState } from "react";

import { endpoints } from "../../../api";
import { Box, Container, Grid, GridItem, Stack, StackDivider, Text } from "@chakra-ui/react";

export const Apadrinamiento: FC = () => {
  const [solicitudesPendientes, setSolicitudesPendientes] = useState([]);

  const fetchSolicitudesPendientes = async () => {
    const response = await axios.get(endpoints.solicitudApadrinamientoPendientes, {
      withCredentials: true,
    });
    setSolicitudesPendientes(response.data.results);
  };

  useEffect(() => {
    // fetchSolicitudesPendientes();
  }, []);
  
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
            Solicitudes de Apadrinamiento Pendientes
          </Text>
          {solicitudesPendientes.length > 0 && (
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              h={{ md: "90%" }}
              overflowY={"auto"}
            >
              {solicitudesPendientes.map((solicitud) => (
                <Box
                  key={solicitud['id']}
                  maxW="lg"
                  w="auto"
                  bg="white"
                  borderWidth="2px"
                  borderRadius="lg"
                  shadow={"lg"}
                  pt={2}
                  pb={2}
                  pl={2}
                >
                  <Text>
                    Motivo: {solicitud['motivo_FS']}
                  </Text>
                  <Text>
                    Acá tendría que ir el usuario que pidió la solicitud de apadrinamiento
                  </Text>
                  <Text>{solicitud['visita'] ? 'Pidió una visita para el día '+solicitud['fecha_visita'] : 'No solicitó visita'}</Text>
                  <Text>Chico: {solicitud['chico_apadrinado']['apellido']+', '+solicitud['chico_apadrinado']['nombre']}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </GridItem>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <GridItem colSpan={1} height={{ md: "55vh" }}>
          <Text fontSize={"4xl"} fontWeight={"bold"} align={"left"}>
            Solicitudes de Apadrinamiento Pendientes
          </Text>
          {solicitudesPendientes.length > 0 && (
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              h={{ md: "90%" }}
              overflowY={"auto"}
            >
              {solicitudesPendientes.map((solicitud) => (
                <Box
                  key={solicitud['id']}
                  maxW="lg"
                  w="auto"
                  bg="white"
                  borderWidth="2px"
                  borderRadius="lg"
                  shadow={"lg"}
                  pt={2}
                  pb={2}
                  pl={2}
                >
                  <Text>
                    Motivo: {solicitud['motivo_FS']}
                  </Text>
                  <Text>
                    Acá tendría que ir el usuario que pidió la solicitud de apadrinamiento
                  </Text>
                  <Text>{solicitud['visita'] ? 'Pidió una visita para el día '+solicitud['fecha_visita'] : 'No solicitó visita'}</Text>
                  <Text>Chico: {solicitud['chico_apadrinado']['apellido']+', '+solicitud['chico_apadrinado']['nombre']}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
}

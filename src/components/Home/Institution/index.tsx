import {
  Container,
  Flex,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
  Box,
  Text,
  StackDivider,
  Grid,
  GridItem,
  Stack,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api";
import { DonationModal, DonationSelector, RejectDonation } from './components';
import { bodyTypes } from './constants';

// const ComponenteNormal: FC = ({ children }) => <div>Mis children son: {children}</div>

const DonacionesBienesPendientes = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [donacionesPendientes, setDonacionesPendientes] = useState([]);
  const [modalBody, setModalBody] = useState(bodyTypes.select);
  const [idDonacion, setIdDonacion] = useState(0);

  const fetchDonacionesPendientes = async () => {
    const response = await axios.get(endpoints.donacionesPendientes, {
      withCredentials: true,
    });
    setDonacionesPendientes(response.data.results);
  };

  useEffect(() => {
    fetchDonacionesPendientes();
  }, []);

  const openDonationDetails = (idDonacion: number) => {
    setIdDonacion(idDonacion);
    setModalBody(bodyTypes.select);
    onOpen();
  }

  const openDonationReject = (idDonacion: number) => {
    setIdDonacion(idDonacion);
    setModalBody(bodyTypes.reject);
    onOpen();
  }

  const renderModalBody = () => {
    if (modalBody === bodyTypes.select) return <DonationSelector idDonacion={idDonacion}/>
    if (modalBody === bodyTypes.reject) return <RejectDonation idDonacion={idDonacion}/>
  }

  return (
    <Flex flexDir={"column"} justifyContent={"center"} w="100%">
      <DonationModal onClose={onClose} isOpen={isOpen}>
        {renderModalBody()}
      </DonationModal>

      <Container
        ml={0}
        pt={4}
        pb={4}
        maxW={{ md: "100%" }}
        h={{ md: "100%" }}
        bg="white"
      >
        <Grid templateColumns="repeat(1, 1fr)" gap={4}>
          <GridItem colSpan={1} height={{ md: "55vh" }}>
            <Text fontSize={"4xl"} fontWeight={"bold"} align={"left"}>
              Donaciones Pendientes
            </Text>
            {donacionesPendientes.length > 0 && (
              <Stack
                divider={<StackDivider borderColor="gray.200" />}
                spacing={4}
                align="stretch"
                h={{ md: "90%" }}
                overflowY={"auto"}
              >
                {donacionesPendientes.map((donacion) => (
                  <Box
                    key={donacion['id']}
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
                    <Stack direction='row' align='end'>
                      <Box w='900px'>
                        <Text>{donacion['id']}</Text>
                        <Text>
                          {donacion['donante']['apellido'] + ', ' + donacion['donante']['nombre'] }
                        </Text>
                        <Text>Tipo de donación: {donacion['cod_estado']}</Text>
                        <Text>Cantidad de bienes: </Text>
                      </Box>
                      <Box>
                        <Button colorScheme='blue' size='sm' onClick={() => openDonationDetails(donacion['id'])}>Ver Más</Button>
                      </Box>
                      <Box>
                        <Button colorScheme='green' size='sm'>Aceptar</Button>
                      </Box>
                      <Box>
                        <Button colorScheme='red' size='sm' onClick={() => openDonationReject(donacion['id'])}>Rechazar</Button>
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </GridItem>
        </Grid>
      </Container>
    </Flex>
  );
};

const DonacionesMonetarias = () => {
  const [transferenciasPendientes, setTransferenciasPendientes] = useState([]);

  const fetchTransferenciasPendientes = async () => {
    const response = await axios.get(endpoints.transferenciasPendientes, {
      withCredentials: true,
    });
    setTransferenciasPendientes(response.data.results);
  };

  useEffect(() => {
    fetchTransferenciasPendientes();
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
            Transferencias Pendientes
          </Text>
          {transferenciasPendientes.length > 0 && (
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              h={{ md: "90%" }}
              overflowY={"auto"}
            >
              {transferenciasPendientes.map((transferencia) => (
                <Box
                  key={transferencia['id']}
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
                    {transferencia['donante']['apellido'] + ', ' + transferencia['donante']['nombre'] }
                  </Text>
                  <Text>Estado de donación: {transferencia['cod_estado']}</Text>
                  {/* <Text>{donacion['bienes'] !== undefined ? 'Verdadero' : 'Falso'}</Text>
                  <Text>{donacion['bienes'] !== null ? 'Verdadero' : 'Falso'}</Text>
                  <Text>{typeof(donacion['bienes'])}</Text> */}
                  {/* <Text>Monto: {transferencia['monto']}</Text> */}
                  <Text>Acá podría ir el nombre del banco</Text>
                </Box>
              ))}
            </Stack>
          )}

        </GridItem>
      </Grid>
    </Container>
  );
}

const Recolecciones = () => {
  return (
    <Text>ALGO</Text>
  );
}

const Apadrinamiento = () => {
  const [solicitudesPendientes, setSolicitudesPendientes] = useState([]);

  const fetchSolicitudesPendientes = async () => {
    const response = await axios.get(endpoints.solicitudApadrinamientoPendientes, {
      withCredentials: true,
    });
    setSolicitudesPendientes(response.data.results);
  };

  useEffect(() => {
    fetchSolicitudesPendientes();
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
                    {/* {solicitud['donante']['apellido'] + ', ' + solicitud['donante']['nombre'] } */}
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
                    {/* {solicitud['donante']['apellido'] + ', ' + solicitud['donante']['nombre'] } */}
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


const News = () => {
  const [noticias, setNoticias] = useState([]);

  const fetchNoticias = async () => {
    const response = await axios.get(endpoints.noticias, {
      withCredentials: true,
    });
    setNoticias(response.data.results);
  };

  useEffect(() => {
    fetchNoticias();
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
            Últimas Noticias
          </Text>
          {noticias.length > 0 && (
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              h={{ md: "90%" }}
              overflowY={"auto"}
            >
              {noticias.map((noticia) => (
                <Box
                  key={noticia['id']}
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
                  <Text>{noticia['titulo']}</Text>
                  <Text>{noticia['descripcion']}</Text>
                  <Text>{noticia['fecha_publicacion']}</Text>
                  <Text>{noticia['autores']}</Text>
                  <Text>{noticia['institucion']}</Text>
                </Box>
              ))}
            </Stack>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
};

export const InstitutionHomeView = () => {
  return (
    <Flex
      borderRadius="lg"
      boxShadow="xl"
      m="20px auto 0"
      w="80%"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Tabs minHeight="600px" height={"100%"} width="100%">
        <TabList>
          <Tab>Donaciones Bienes</Tab>
          <Tab>Donaciones Monetarias</Tab>
          <Tab>Recolecciones Pendientes</Tab>
          <Tab>Apadrinamiento</Tab>
          <Tab>Ultimas noticias</Tab>
        </TabList>

        <TabPanels height="100%" bg={"red"}>
          <TabPanel>
            <DonacionesBienesPendientes />
          </TabPanel>

          <TabPanel>
            <DonacionesMonetarias />
          </TabPanel>
          
          <TabPanel>
            <Recolecciones />
          </TabPanel>

          <TabPanel>
            <Apadrinamiento />
          </TabPanel>

          <TabPanel>
            <News />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
import {
    Container,
    Flex,
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
  import { getCookie } from "./utils";
  
export const DonacionesBienesPendientes = () => {
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
  
    const handleAceptDonation = async (idDonacion: number) => {
      try {
        const res = await axios.put(
          endpoints.donacionesPendientes+idDonacion.toString()+'/aceptar/',
          {},
          {
            withCredentials: true, headers:{
            'Content-type': 'application/json',
            'X-CSRFToken': getCookie("csrftoken"), // added the csrf cookie header
        }}).then((res) => res.data);
        console.log(res);
      } catch (e) {
        console.log(e)
      }
      alert('Donación Aceptada:'+idDonacion.toString());
    };
  
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
                          <Text>Acá van los datos de la donación</Text>
                          <Text>Cantidad de bienes: (Acá va la cantidad de bienes)</Text>
                        </Box>
                        <Box>
                          <Button colorScheme='teal' size='sm' onClick={() => openDonationDetails(donacion['id'])}>Ver Más</Button>
                        </Box>
                        <Box>
                          <Button colorScheme='green' size='sm' onClick={() => handleAceptDonation(donacion['id'])}>Aceptar</Button>
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
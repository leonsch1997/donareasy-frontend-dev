import {
    Container,
    Box,
    Text,
    StackDivider,
    Grid,
    GridItem,
    Stack,
    useDisclosure,
    Button,
    Flex,
  } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api";
import { bodyTypes } from "./constants";
import { getCookie } from "./utils";
import { DonationModal, TransactionSelector, RejectTransaction } from "./components";
  
export const DonacionesMonetarias = () => {
    const [transferenciasPendientes, setTransferenciasPendientes] = useState([]);
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [modalBody, setModalBody] = useState(bodyTypes.select);
    const [idTransaction, setIdTransaction] = useState(0);

    const fetchTransferenciasPendientes = async () => {
      const response = await axios.get(endpoints.transferenciasPendientes, {
        withCredentials: true,
      });
      setTransferenciasPendientes(response.data.results);
    };
  
    useEffect(() => {
      fetchTransferenciasPendientes();
    }, []);
  
    const openDonationDetails = (idTransaction: number) => {
      setIdTransaction(idTransaction);
      setModalBody(bodyTypes.select);
      onOpen();
    }
  
    const openDonationReject = (idTransaction: number) => {
      setIdTransaction(idTransaction);
      setModalBody(bodyTypes.reject);
      onOpen();
    }
  
    const renderModalBody = () => {
      if (modalBody === bodyTypes.select) return <TransactionSelector idTransaction={idTransaction}/>
      if (modalBody === bodyTypes.reject) return <RejectTransaction idTransaction={idTransaction}/>
    }
  
    const handleAceptDonation = async (idTransaction: number) => {
      try {
        const res = await axios.put(
          endpoints.transferenciasPendientes+idTransaction.toString()+'/aceptar/',
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
      alert('Donación Aceptada:'+idTransaction.toString());
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
                      <Stack direction='row' align='end'>
                        <Box w='900px'>
                          <Text>
                          {transferencia['donante']['apellido'] + ', ' + transferencia['donante']['nombre'] }
                          </Text>
                          <Text>Acá van los datos de la transferencia</Text>
                        </Box>
                        <Box>
                        <Button colorScheme='blue' size='sm' onClick={() => openDonationDetails(transferencia['id'])}>Ver Más</Button>
                        </Box>
                        <Box>
                        <Button colorScheme='green' size='sm' onClick={() => handleAceptDonation(transferencia['id'])}>Aceptar</Button>
                        </Box>
                        <Box>
                        <Button colorScheme='red' size='sm' onClick={() => openDonationReject(transferencia['id'])}>Rechazar</Button>
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
  }
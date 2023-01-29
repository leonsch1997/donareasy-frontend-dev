export const a = null;
// const ComponenteNormal: FC = ({ children }) => <div>Mis children son: {children}</div>

//[LUCAS] Todo lo comentado que sigue a continuación en realidad son componentes que fueron
// llevados a archivos separados: pendingGoodsDonations y pendingTransactionDonations. Los
// demás componentes que quedaron acá (Recoleccion, Apadrinamiento y Noticias) no llegué a
// migrarlos 
/*
//const DonacionesBienesPendientes = () => {
const DonacionesBienesPendientesOLD = () => {
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
                        <Text>Tipo de donación: {donacion['cod_estado']}</Text>
                        <Text>Cantidad de bienes: </Text>
                      </Box>
                      <Box>
                        <Button colorScheme='blue' size='sm' onClick={() => openDonationDetails(donacion['id'])}>Ver Más</Button>
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

const DonacionesMonetariasOLD = () => {
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
                   <Text>{donacion['bienes'] !== undefined ? 'Verdadero' : 'Falso'}</Text>
                  <Text>{donacion['bienes'] !== null ? 'Verdadero' : 'Falso'}</Text>
                  <Text>{typeof(donacion['bienes'])}</Text> 
                 <Text>Monto: {transferencia['monto']}</Text> 
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
*/


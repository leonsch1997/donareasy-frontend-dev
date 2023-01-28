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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoints } from "../../../api";

import { routes } from '../../../routes';

const LatestDonations = () => {
  const mockDonations: string[] = [
    "Calzado",
    "Ropa",
    "Dinero",
    "Calzado",
    "Ropa",
    "Dinero",
    "Calzado",
    "Ropa",
    "Dinero",
    "Calzado",
    "Ropa",
    "Dinero",
    "Calzado",
    "Ropa",
    "Dinero",
    "Calzado",
    "Ropa",
    "Dinero",
    "Calzado",
    "Ropa",
    "Dinero",
    "Calzado",
    "Ropa",
    "Dinero",
    "Calzado",
    "Ropa",
    "Dinero",
  ];

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
            Últimas Donaciones
          </Text>
          {mockDonations.length > 0 && (
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch"
              h={{ md: "90%" }}
              overflowY={"auto"}
            >
              {mockDonations.map((donation) => (
                <Box
                  key={Math.random()}
                  maxW="lg"
                  w="auto"
                  h="45px"
                  bg="white"
                  borderWidth="2px"
                  borderRadius="lg"
                  shadow={"lg"}
                  pt={2}
                  pb={2}
                  pl={2}
                >
                  <Text fontSize={"xl"}>
                    <b>Has donado: </b>
                    {donation}
                  </Text>
                </Box>
              ))}
            </Stack>
          )}

          {mockDonations.length == 0 && (
            <>
              <Text fontWeight={"bold"}>
                Sin donaciones en el último período
              </Text>
              <Text>
                Parece que no has realizado donaciones últimamente. Puedes
                realizar una nueva cuando dispongas de bienes que desees donar.
              </Text>
            </>
          )}
        </GridItem>
        <GridItem colSpan={1} height={{ md: "55vh" }}>
          <Text fontSize={"4xl"} fontWeight={"bold"} align={"center"}>
            Nueva Donación
          </Text>
          <Text fontSize={"md"} align={"center"}>
            Completa el formulario para una nueva donación
          </Text>
          <Flex justifyContent={"center"} pt={4}>
            <Button>
              <Link to={routes.donar}>Completar Formulario</Link>
            </Button>
          </Flex>
          <Flex justifyContent={"center"} pt={4}>
            <Button>
              <Link to={routes.apadrinar}>Apadrinar!</Link>
              <Flex paddingLeft={2}>
                <FaHeart />
              </Flex>
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};

const News = () => {
  const mockNoticias: string[] = [
    "Jorge López es ahora el nuevo director de la institución @nombreInstitucion. Conoce el equipo completo.",
    "Jorge López es ahora el nuevo director de la institución @nombreInstitucion. Conoce el equipo completo.",
    "Jorge López es ahora el nuevo director de la institución @nombreInstitucion. Conoce el equipo completo.",
    "Jorge López es ahora el nuevo director de la institución @nombreInstitucion. Conoce el equipo completo.",
    "Jorge López es ahora el nuevo director de la institución @nombreInstitucion. Conoce el equipo completo.",
  ];

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
        <GridItem colSpan={1} height={{ md: "55vh" }}>
          <Text fontSize={"4xl"} fontWeight={"bold"} align={"center"}>
            Nueva Donación
          </Text>
          <Text fontSize={"md"} align={"center"}>
            Completa el formulario para una nueva donación
          </Text>
          <Flex justifyContent={"center"} pt={4}>
            <Button>
              <Link to={routes.donar}>Completar Formulario</Link>
            </Button>
          </Flex>
          <Flex justifyContent={"center"} pt={4}>
            <Button>
              <Link to={routes.apadrinar}>Apadrinar!</Link>
            </Button>
          </Flex>
        </GridItem>
      </Grid>
    </Container>
  );
};

export const DonorHomeView = () => {
  return (
    <Flex
      borderRadius="lg"
      boxShadow="xl"
      m="20px auto 0"
      w="80%"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Tabs minHeight="500px" height={"100%"} width="100%">
        <TabList>
          <Tab>Ultimas donaciones</Tab>
          <Tab>Ultimas noticias</Tab>
        </TabList>

        <TabPanels height="100%" bg={"red"}>
          <TabPanel>
            <LatestDonations />
          </TabPanel>

          <TabPanel>
            <News />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

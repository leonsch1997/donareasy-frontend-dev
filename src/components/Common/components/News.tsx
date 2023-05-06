import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Container, Grid, GridItem, Stack, StackDivider, Text } from "@chakra-ui/react";

import { endpoints } from "../../../api";

export const News = () => {
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

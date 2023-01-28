import {
    Heading,
    Divider,
    Flex,
    Select,
    RadioGroup,
    Stack,
    Radio,
    Text,
    Button,
    Box,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { endpoints } from "../../api";
  
  export const Apadrinamiento = () => {
    const [value, setValue] = useState("bienes");
    const [chicos, setChicos] = useState([]); 

    const fetchChicos = async () => {
        const response = await axios.get(endpoints.chicos, {
          withCredentials: true,
        });
        setChicos(response.data.results);
      };
    
      useEffect(() => {
        fetchChicos();
      }, []);

    return (
        <Flex flexDir={"column"}>
          <Heading m={10}>Crear Apadrinamiento</Heading>
          <Flex
            flexDir="row"
            justifyContent={"center"}
            alignItems="center"
            w={"100%"}
          >
             <Box paddingRight={"10"}>
          <Text fontSize={"3xl"}>Paso 1</Text>
          <Text p={"20px"}>Dinos qué tipo de donación se va a realizar.</Text>
          <RadioGroup p={"20px"} onChange={setValue} value={value}>
            <Stack direction="row">
              <Radio value="bienes">Bien</Radio>
              <Radio value="monetaria">Monetaria</Radio>
            </Stack>
          </RadioGroup>
        </Box>

        <Divider
          variant={"dashed"}
          orientation={"vertical"}
          paddingRight={"14"}
          style={{ borderColor: "black" }}
        />

        <Box paddingRight={"10"}>
          <Text fontSize={"3xl"}>Paso 2</Text>
          <Text p={"20px"}>Elija el chico/a para apadrinar</Text>
          <Select p={"10px"} placeholder="Elige Chico/a">
            {chicos.length &&
              chicos.map(({ nombre }) => (
                <option key={nombre} value={nombre}>{nombre}</option>
              ))}
          </Select>
        </Box>

        <Divider
          variant={"dashed"}
          orientation={"vertical"}
          paddingRight={"14"}
          style={{ borderColor: "black" }}
        />

        <Box>
          <Text fontSize={"3xl"}>Paso 3</Text>
          <Text p={"20px"}>Danos el detalle de lo que vas a donar</Text>
          <Button colorScheme={"linkedin"} variant={"ghost"}>
            Agregar
          </Button>
        </Box>
        </Flex>
        <Flex paddingTop={"12"}>
        <Button colorScheme={"linkedin"}>Apadrinar</Button>
        </Flex>
        </Flex>
        )
}


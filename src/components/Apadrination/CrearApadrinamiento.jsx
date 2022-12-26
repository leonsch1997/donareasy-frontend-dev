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
  import { useSelector } from "react-redux";
  import { authSelector } from "../../redux/reducers";
  import axios from "axios";
  import { endpoints } from "../../api";
  import { getAllJSDocTags } from "typescript";
  
  export const CrearApadrinamiento = () => {
    const { username, authToken } = useSelector(authSelector);
    const [value, setValue] = useState("bienes");
    const [chicos, setChicos] = useState([]); 
    const [instituciones, setInstituciones] = useState([]);

    const fetchInstituciones = async () => {
      const response = await axios.get(endpoints.instituciones, {
        withCredentials: true,
      });
      setInstituciones(response.data.results);
      };

      useEffect(() => {
        fetchInstituciones();
      }, []);  

    const fetchChicos = async () => {
        const response = await axios.get(endpoints.chicos, {
          withCredentials: true,
        });
        setChicos(response.data.results);
      };
    
      useEffect(() => {
        fetchChicos();
      }, []);

      const elegirInstitucion = (event) => {
        setInstituciones(event.target.value);
      };

    return (
        <Flex flexDir={"column"}>
          <Heading m={10}>Solicitud de apadrinamiento</Heading>
          <Flex
            flexDir="row"
            justifyContent={"center"}
            alignItems="center"
            w={"100%"}
          >

          <Box paddingRight={"20"}>
          <Text p={"20px"} fontSize={"3xl"}>Elije la institución</Text>
          <Text p={"20px"}>Podrás especificar de que hogarcito es el niño/a a apadrinar, 
            ó en su defecto elegir todas las instituciones</Text>
          <Flex p={"20px"}>
            <Select
              placeholder="Elige institución"
            >
              {instituciones.length > 0 &&
                instituciones.map((i) => (
                  <option key={i.nombre} value={i.nombre}>
                    {i.nombre}
                  </option>
                ))}
            </Select>
          </Flex>
        </Box>
        </Flex>
         <Divider
          variant={"dashed"}
          orientation={"horizontal"}
          paddingRight={"14"}
          style={{ borderColor: "black" }}
                /> 
        <Flex paddingTop={"20"} p={"20px"}>
          <Box>
            <Text fontSize={"3xl"}>Completar formulario</Text>
            <Text p={"20px"}>Cargar documentos para enviar a la institución</Text>
            <Button 
            colorScheme={"linkedin"} 
            variant={"ghost"}>
            {/* onClick={onOpen}
            disabled={!institucion}> */}
              Completar
            </Button>
          </Box>
        </Flex>

        <Divider
          variant={"dashed"}
          orientation={"horizontal"}
          paddingRight={"14"}
          style={{ borderColor: "black" }}
                />
        

        <Flex paddingTop={"20"} p={"20px"}>
          <Box paddingRight={"10"}>
            <Text fontSize={"3xl"}>Niño/a</Text>
            <Text p={"20px"}>A continuación se mostrará el listado de todos los niños/as</Text>
            <Select p={"10px"} placeholder="...">
              {chicos.length > 0 &&
                chicos.map((i) => (
                  <option key={i.nombre} value={i.nombre}>{i.nombre}</option>
                ))}
            </Select>
          </Box>
        </Flex>

        <Flex paddingTop={"12"} p={"20px"}>
        <Button colorScheme={"linkedin"}>Enviar solicitud</Button>
        </Flex>
        </Flex>
        )
}


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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  useDisclosure,
  } from "@chakra-ui/react";
  import { useEffect, useState } from "react";
  import { Formik, Field, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Center,
} from "@chakra-ui/react";
  import { useSelector } from "react-redux";
  import { authSelector } from "../../redux/reducers";
  import axios from "axios";
  import { endpoints } from "../../api";
  import { getAllJSDocTags } from "typescript";
  
  export const CrearApadrinamiento = () => {
    const { username, authToken } = useSelector(authSelector);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [visita, setVisita] = useState(1);
    const [validForm, setValidForm] = useState(false);
    const [institucion, setInstitucion] = useState("");
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
        setInstitucion(event.target.value);
      };

    return (
        <Flex flexDir={"column"}>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                Carga de documentos
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                
                  <Formik
                    initialValues={{
                      motivo: "",
                      dni_frente: "",
                      dni_dorso: "",
                      recibo_sueldo: "",
                      acta_matrimonio: "",
                      visita: "",
                      fecha_visita: "",
                    }}
                    /*onSubmit={agregarDonacion}*/
                  >
                    <Form>
                      <Field name="motivo">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="motivo">Motivo del apadrinamiento</FormLabel>
                            <Input {...field} id="motivo" placeholder="Contanos porque querés apadrinar" />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="dni_frente">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="dni_frente">DNI Frente</FormLabel>
                            <Input {...field} type='file' id="motdni_frenteivo" placeholder="Frente" />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="dni_dorso">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="dni_dorso">DNI Dorso</FormLabel>
                            <Input {...field} type='file' id="dni_dorso" placeholder="Dorso" />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="recibo_sueldo">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="recibo_sueldo">Recibo de Sueldo</FormLabel>
                            <Input {...field} type='file' id="recibo_sueldo" placeholder="Cargar Recibo" />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="acta_matrimonio">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="acta_matrimonio">Acta de matrimonio</FormLabel>
                            <Input {...field} type='file' id="acta_matrimonio" placeholder="Cargar Acta" />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="visita">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="visita">Pactar visita</FormLabel>
                            <Select {...field} id="visita" placeholder="¿Desea pactar una visita?">
                              <option value={1}>Si</option>
                              <option value={2}>No</option>
                        </Select>
                          </FormControl>
                        )}
                      </Field>

                      <Field name="fecha_visita">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel htmlFor="fecha_visita">Fecha de la visita</FormLabel>
                            <Input type='date' {...field} id="fecha_visita" placeholder="Fecha" />
                          </FormControl>
                        )}
                      </Field>

                      {!validForm && (
                        <Text color={"red"} fontSize={"sm"}>
                          complete todos los campos
                        </Text>
                      )}
                      <Center>
                        <Button
                          mt={4}
                          colorScheme="pink"
                          type="submit"
                        >
                          Confirmar
                        </Button>
                      </Center>
                    </Form>
                  </Formik>
                
              </ModalBody>
            </ModalContent>
          </Modal>
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
              onChange={elegirInstitucion}
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
            variant={"ghost"}
            onClick={onOpen}
            disabled={!institucion}
            > 
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


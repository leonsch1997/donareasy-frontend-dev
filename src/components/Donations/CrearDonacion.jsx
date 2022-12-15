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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Container,
  Center,
  Link,
} from "@chakra-ui/react";
import axios from "axios";
import { endpoints } from "../../api";

export const CrearDonacion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tipoDonacion, setTipoDonacion] = useState("bienes");
  const [institucionesCBU, setInstitucionesCBU] = useState([]);
  const [instituciones, setInstituciones] = useState([]);

  const fetchInstituciones = async () => {
    const responseCBU = await axios.get(endpoints.institucionesCBU, {
      withCredentials: true,
    });
    const response = await axios.get(endpoints.instituciones, {
      withCredentials: true,
    });
    setInstitucionesCBU(responseCBU.data.results);
    setInstituciones(response.data.results);
  };

  useEffect(() => {
    fetchInstituciones();
  }, []);

  const handleSubmit = (formValues, actions) => {
    console.log();
  };

  return (
    <Flex flexDir={"column"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {tipoDonacion == "bienes" ? "Donar bien" : "Donación monetaria"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {tipoDonacion == "bienes" && (
              <Formik onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                  <Form>
                    <Field name="nombre">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="nombre">Nombre</FormLabel>
                          <Input {...field} id="nombre" placeholder="nombre" />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="descripcion">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="descripcion">
                            Descripcion
                          </FormLabel>
                          <Input
                            {...field}
                            id="descripcion"
                            placeholder="descripcion"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="cantidad">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="cantidad">Cantidad</FormLabel>
                          <Input
                            {...field}
                            id="cantidad"
                            placeholder="cantidad"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="tipo">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel htmlFor="tipo">Tipo</FormLabel>
                          <Select {...field} id="tipo" placeholder="tipo">
                            <option value={1} >Alimento</option>
                            <option value={2} >Útil escolar</option>
                            <option value={3} >Prendas</option>
                            <option value={4} >Otros</option>
                          </Select>
                        </FormControl>
                      )}
                    </Field>

                    <Center>
                      <Button
                        mt={4}
                        colorScheme="pink"
                        isLoading={isSubmitting}
                        type="submit"
                      >
                        Confirmar
                      </Button>
                    </Center>
                  </Form>
                )}
              </Formik>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Heading m={10}>Crear Donación</Heading>
      <Flex
        flexDir="row"
        justifyContent={"center"}
        alignItems="center"
        w={"100%"}
      >
        <Box paddingRight={"10"}>
          <Text fontSize={"3xl"}>Paso 1</Text>
          <Text p={"20px"}>Dinos qué tipo de donación se va a realizar.</Text>
          <RadioGroup
            p={"20px"}
            onChange={setTipoDonacion}
            value={tipoDonacion}
          >
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
          <Text p={"20px"}>Elige la institución que recibirá la donación</Text>
          <Select p={"10px"} placeholder="Elige institución">
            {instituciones.length > 0 &&
              tipoDonacion == "bienes" &&
              instituciones.map((i) => (
                <option key={i.nombre} value={i.nombre}>
                  {i.nombre}
                </option>
              ))}
            {institucionesCBU.length > 0 &&
              tipoDonacion == "monetaria" &&
              institucionesCBU.map((i) => (
                <option key={i.nombre} value={i.nombre}>
                  {i.nombre}
                </option>
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
          <Button onClick={onOpen} colorScheme={"linkedin"} variant={"ghost"}>
            Agregar
          </Button>
        </Box>
      </Flex>
      <Flex paddingTop={"10"}>
        <Box
          color={"red"}
          backgroundColor={"yellow"}
          width={"800px"}
          height={"300px"}
        >
          Resumen
        </Box>
      </Flex>
      <Flex paddingTop={"12"}>
        <Button colorScheme={"linkedin"}>Enviar Donación</Button>
      </Flex>
    </Flex>
  );
};

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
import axios from "axios";
import { endpoints } from "../../api";
import Donation from "./Donation";

export const CrearDonacion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tipoDonacion, setTipoDonacion] = useState("bienes");
  const [institucion, setInstitucion] = useState("");
  const [validForm, setValidForm] = useState(false);
  const [donaciones, setDonaciones] = useState([]);
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

  const agregarDonacion = (values) => {
    const data = {
      institucionId: institucion,
      tipo: tipoDonacion,
      data: values,
    };

    // un poco de validación a lo bestia
    const isValid = Object.keys(values).every((k) => values[k]);
    setValidForm(isValid);
    if (!isValid) return false;

    setDonaciones([...donaciones, data]);
    onClose();
    // limpio la seleccion anterior
    setInstitucion("");
    setValidForm(false);
  };

  const elegirInstitucion = (event) => {
    setInstitucion(event.target.value);
  };

  const submitDonations = async () => {
    donaciones.map((d) => {
      if (d.tipo == "bienes") {
        axios.post(
          endpoints.donacionBien,
          { institucion: d.institucionId, bienes: [d.data] },
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": document.cookie.split("csrftoken=")[1], // esto es una negrada, quizas podemos usar una libreria como react-cookie
            },
          }
        );
      } else if (d.tipo == "monetaria") {
        axios.post(
          endpoints.donacionMonetaria,
          { institucion: d.institucionId, monto: Number(d.monto) },
          {
            withCredentials: true,
            headers: {
              "X-CSRFToken": document.cookie.split("csrftoken=")[1], // esto es una negrada, quizas podemos usar una libreria como react-cookie
            },
          }
        );
      }
    });
  };

  return (
    <Flex flexDir={"column"} justifyContent={"center"} w="75%">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {tipoDonacion == "bienes" ? "Donar bien" : "Donación monetaria"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {tipoDonacion == "bienes" && (
              <Formik
                initialValues={{
                  nombre: "",
                  descripcion: "",
                  cantidad: 0,
                  tipo: "",
                }}
                onSubmit={agregarDonacion}
              >
                <Form>
                  <Field name="tipo">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="tipo">Tipo</FormLabel>
                        <Select {...field} id="tipo" placeholder="tipo">
                          <option value={1}>Alimento</option>
                          <option value={2}>Útil escolar</option>
                          <option value={3}>Prendas</option>
                          <option value={4}>Otros</option>
                        </Select>
                      </FormControl>
                    )}
                  </Field>
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
                        <FormLabel htmlFor="descripcion">Descripción</FormLabel>
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
                          type={"number"}
                          min={0}
                          id="cantidad"
                          placeholder="cantidad"
                        />
                      </FormControl>
                    )}
                  </Field>

                  {!validForm && (
                    <Text color={"red"} fontSize={"sm"}>
                      complete todos los campos
                    </Text>
                  )}

                  <Center>
                    <Button mt={4} colorScheme="pink" type="submit">
                      Confirmar
                    </Button>
                  </Center>
                </Form>
              </Formik>
            )}
            {tipoDonacion == "monetaria" && (
              <Formik
                initialValues={{
                  monto: "",
                }}
                onSubmit={agregarDonacion}
              >
                <Form>
                  <Field name="monto">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="monto">Monto</FormLabel>
                        <Input {...field} id="monto" placeholder="monto" />
                      </FormControl>
                    )}
                  </Field>

                  {!validForm && (
                    <Text color={"red"} fontSize={"sm"}>
                      complete todos los campos
                    </Text>
                  )}
                  <Center>
                    <Button mt={4} colorScheme="pink" type="submit">
                      Confirmar
                    </Button>
                  </Center>
                </Form>
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
          <Select
            p={"10px"}
            placeholder="Elige institución"
            onChange={elegirInstitucion}
          >
            {instituciones.length > 0 &&
              tipoDonacion == "bienes" &&
              instituciones.map((i) => (
                <option key={i.nombre} value={i.id}>
                  {i.nombre}
                </option>
              ))}
            {institucionesCBU.length > 0 &&
              tipoDonacion == "monetaria" &&
              institucionesCBU.map((i) => (
                <option key={i.nombre} value={i.id}>
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
          <Button
            onClick={onOpen}
            colorScheme={"linkedin"}
            variant={"ghost"}
            disabled={!institucion}
          >
            Agregar
          </Button>
        </Box>
      </Flex>

      <Flex direction={"column"} margin={10}>
        <Text fontWeight={"bold"} as={"h2"} mb="4px">
          Donaciones cargadas
        </Text>
        <Box
          w="100%"
          height={"300px"}
          style={{ overflowY: "auto" }}
          borderWidth={"3px"}
          borderColor={"teal.300"}
          rounded={"10px"}
        >
          {donaciones.length == 0 && (
            <Text padding={10}>Ninguna donación cargada al momento</Text>
          )}
          {donaciones.length > 0 && (
            <Flex
              direction={"row"}
              flexWrap={"wrap"}
              justifyContent="space-around"
            >
              {donaciones.map((d, index) => (
                <Donation
                  key={`donacion${index}`}
                  tipoDonacion={tipoDonacion}
                  remover={setDonaciones}
                  index={index}
                  {...d}
                />
              ))}
            </Flex>
          )}
        </Box>
      </Flex>
      <Flex margin={10}>
        <Button colorScheme={"linkedin"} onClick={submitDonations}>
          Enviar Donación
        </Button>
      </Flex>
    </Flex>
  );
};

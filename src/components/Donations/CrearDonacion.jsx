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

export const CrearDonacion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tipoDonacion, setTipoDonacion] = useState("bienes");
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
      tipo: tipoDonacion,
      data: values,
    };
    setDonaciones([...donaciones, data]);
    onClose();
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
              <Formik
                initialValues={{
                  nombre: "",
                  descripcion: "",
                  cantidad: "",
                  tipo: "",
                }}
                onSubmit={agregarDonacion}
              >
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
                        <FormLabel htmlFor="descripcion">Descripcion</FormLabel>
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
                          <option value={1}>Alimento</option>
                          <option value={2}>Útil escolar</option>
                          <option value={3}>Prendas</option>
                          <option value={4}>Otros</option>
                        </Select>
                      </FormControl>
                    )}
                  </Field>

                  <Center>
                    <Button
                      mt={4}
                      colorScheme="pink"
                      // isLoading={isSubmitting}
                      type="submit"
                    >
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

                  <Center>
                    <Button
                      mt={4}
                      colorScheme="pink"
                      // isLoading={isSubmitting}
                      type="submit"
                    >
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
      <Flex direction={"column"} paddingTop={"10"}>
        <Box>Resumen</Box>
        <Box color={"red"} backgroundColor={"yellow"} w="100%" height={"300px"}>
          {donaciones.length == 0 && <>dona no seas trolo</>}
          {donaciones.length > 0 && (
            <div>
              {donaciones.map((d) => {
                return (
                  <div>
                    {d.tipo == "monetaria" && d.data.monto}
                    {d.tipo == "bienes" && (
                      <>
                        <div>Nombre: {d.data.nombre}</div>
                        <div>Descripcion: {d.data.descripcion}</div>
                        <div>Cantidad: {d.data.cantidad}</div>
                        <div>Tipo: {d.data.tipo}</div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Box>
      </Flex>
      <Flex paddingTop={"12"}>
        <Button colorScheme={"linkedin"}>Enviar Donación</Button>
      </Flex>
    </Flex>
  );
};

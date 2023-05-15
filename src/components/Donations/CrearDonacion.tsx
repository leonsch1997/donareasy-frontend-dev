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
  FormLabel,
  Input,
  Center,
  Alert,
  Textarea,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ItemsList } from ".";
import { endpoints } from "../../api";
import { BienItem, MontoItem, TiposBien } from "./types";
import { generateID } from "../../utils";

export const CrearDonacion = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [tipoDonacion, setTipoDonacion] = useState("bienes");
  const [idInstitucion, setIdInstitucion] = useState("");

  const [donaciones, setDonaciones] = useState<BienItem[]>([]);
  const [donacionesMonetarias, setDonacionesMonetarias] = useState<MontoItem[]>(
    []
  );
  const [allDonations, setAllDonations] = useState<(BienItem | MontoItem)[]>(
    []
  );

  const [institucionesCBU, setInstitucionesCBU] = useState([]);
  const [instituciones, setInstituciones] = useState([]);

  // Arreglar esto, esta haciendo UN FETCH por cada render
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

  const elegirInstitucion = (event: any) => {
    setIdInstitucion(event.target.value);
  };

  // Mover a USE submit donations
  const submitDonations = async () => {
    donaciones.map((d: any) => {
      if (d.tipo === "bienes") {
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
      } else if (d.tipo === "monetaria") {
        axios.post(
          endpoints.donacionMonetaria,
          { institucion: d.institucionId, monto: Number(d.data.monto) },
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

  useEffect(
    () => setAllDonations([...donaciones, ...donacionesMonetarias]),
    [donaciones, donacionesMonetarias]
  );

  const removeDonation = (sortId: string) => {
    setDonaciones([...donaciones].filter((don) => don.sortId !== sortId));
    setDonacionesMonetarias(
      [...donacionesMonetarias].filter((don) => don.sortId !== sortId)
    );
  };

  const MonetariaFormBody = () => {
    const [amount, setAmount] = useState("");
    // Agregar validacions
    const validAmount = useMemo(() => !!amount, [amount]);

    const bien: MontoItem = {
      amount,
      idInstitucion,
      tipoDonacion,
      sortId: generateID(),
    };

    const addAmount = () => {
      if (validAmount) {
        setDonacionesMonetarias([...donacionesMonetarias, bien]);
        onClose();
      }
    };

    return (
      <Flex p={4} direction="column">
        <FormLabel htmlFor="monto">Monto</FormLabel>
        <InputGroup>
          <InputLeftAddon children="ARS($)" />
          <Input
            onChange={({ target }) => setAmount(target.value)}
            id="monto"
            placeholder="monto"
          />
        </InputGroup>
        {!validAmount && (
          <Alert my={4} width="100%" textAlign="center" status="warning">
            Las transferencias deben ser mayores a $10 y menores a $100.000
          </Alert>
        )}
        <Center>
          <Button
            mt={!validAmount ? undefined : 4}
            size="md"
            width="40%"
            onClick={addAmount}
            colorScheme="pink"
          >
            Confirmar
          </Button>
        </Center>
      </Flex>
    );
  };

  const BienFormBody = () => {
    const [tipoBien, setTipoBien] = useState(1);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [cantidad, setCantidad] = useState(0);

    const validDonation = useMemo(
      () =>
        tipoBien &&
        nombre &&
        descripcion &&
        cantidad &&
        idInstitucion &&
        tipoDonacion,
      [cantidad, descripcion, nombre, tipoBien]
    );

    const agregarBien = () => {
      const bien: BienItem = {
        tipoBien,
        nombre,
        descripcion,
        cantidad,
        idInstitucion,
        tipoDonacion,
        sortId: generateID(),
      };

      if (validDonation) {
        setDonaciones([...donaciones, bien]);
        onClose();
      } else return;
    };

    return (
      <Flex p={4} direction="column">
        <Flex alignItems="center" direction="column" gap={2}>
          <FormLabel mb={0}>Tipo de bien</FormLabel>
          <Select
            id="tipo"
            onChange={(e) => {
              setTipoBien(
                TiposBien[e.target.value as keyof typeof TiposBien] ?? 0
              );
            }}
          >
            <option>alimento</option>
            <option>util</option>
            <option>prenda</option>
            <option>otro</option>
          </Select>
          <FormLabel mb={0}>Nombre</FormLabel>
          <Input
            onChange={(e) => setNombre(e.target.value)}
            id="nombre"
            placeholder="nombre"
          />
          <FormLabel mb={0}>Descripcion</FormLabel>
          <Textarea
            onChange={(e) => setDescripcion(e.target.value)}
            id="descripcion"
            placeholder="descripcion"
          />
          <FormLabel mb={0}>Cantidad </FormLabel>
          <InputGroup>
            <InputLeftAddon children="unidades" />
            <Input
              onChange={(e) => setCantidad(Number(e.target.value))}
              type={"number"}
              min={0}
              id="cantidad"
              placeholder="cantidad"
            />
          </InputGroup>
          {!validDonation && (
            <Alert my={4} width="100%" textAlign="center" status="warning">
              Todos los campos son requeridos
            </Alert>
          )}
          <Button
            mt={!validDonation ? undefined : 4}
            size="md"
            width="40%"
            onClick={agregarBien}
            colorScheme="pink"
          >
            Confirmar
          </Button>
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex flexDir="column" justifyContent="center" w="75%">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            {tipoDonacion === "bienes"
              ? "Agregar bien"
              : "Agregar donación monetaria"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {tipoDonacion === "bienes" && <BienFormBody />}
            {tipoDonacion === "monetaria" && <MonetariaFormBody />}
          </ModalBody>
        </ModalContent>
      </Modal>

      <Heading textAlign="center" m={10}>
        Crear Donación
      </Heading>

      <Flex justifyContent="space-beteen" alignItems="center">
        <Flex
          justifyContent="space-between"
          flexDirection="column"
          gap={4}
          pr={10}
        >
          <Text fontSize={"3xl"}>Paso 1</Text>
          <Text>Dinos qué tipo de donación se va a realizar.</Text>
          <RadioGroup onChange={setTipoDonacion} value={tipoDonacion}>
            <Stack direction="row">
              <Radio value="bienes">Bien</Radio>
              <Radio value="monetaria">Monetaria</Radio>
            </Stack>
          </RadioGroup>
        </Flex>

        <Divider
          variant={"dashed"}
          orientation={"vertical"}
          paddingRight={"14"}
          style={{ borderColor: "black" }}
        />

        <Flex
          justifyContent="space-between"
          flexDirection="column"
          gap={4}
          pr={10}
        >
          <Text fontSize={"3xl"}>Paso 2</Text>
          <Text>Elige la institución que recibirá la donación</Text>
          <Select
            onChange={elegirInstitucion}
            placeholder="Seleccionar institucion"
          >
            {instituciones.length > 0 &&
              tipoDonacion === "bienes" &&
              instituciones.map((i: any) => (
                <option key={i.nombre} value={i.id}>
                  {i.nombre}
                </option>
              ))}
            {institucionesCBU.length > 0 &&
              tipoDonacion === "monetaria" &&
              institucionesCBU.map((i: any) => (
                <option key={i.nombre} value={i.id}>
                  {i.nombre}
                </option>
              ))}
          </Select>
        </Flex>

        <Divider
          variant={"dashed"}
          orientation={"vertical"}
          paddingRight={"14"}
          style={{ borderColor: "black" }}
        />

        <Flex
          justifyContent="space-between"
          flexDirection="column"
          gap={4}
          pr={10}
        >
          <Text fontSize="3xl">Paso 3</Text>
          <Text>Danos el detalle de lo que vas a donar</Text>
          <Button
            width={120}
            size="md"
            disabled={!idInstitucion}
            onClick={onOpen}
            colorScheme="linkedin"
          >
            Agregar ítem
          </Button>
        </Flex>
      </Flex>

      <Flex direction="column" mt={10}>
        <Text fontSize="3xl" mb={6}>
          Donaciones cargadas
        </Text>
        <Flex
          flex={1}
          minHeight="100px"
          overflowY="auto"
          borderRadius={12}
          padding={4}
          bg="gray.50"
          boxShadow="md"
          sx={{
            "&::-webkit-scrollbar": {
              width: "6px",
              borderRadius: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
          }}
        >
          {allDonations.length === 0 && (
            <Text pt={4} pl={4}>
              Ninguna donación cargada hasta el momento
            </Text>
          )}
          {allDonations.length > 0 && (
            <ItemsList donations={allDonations} onRemove={removeDonation} />
          )}
        </Flex>
      </Flex>

      <Flex justifyContent="center" margin={10}>
        <Button size="lg" colorScheme="linkedin" onClick={submitDonations}>
          Enviar Donación
        </Button>
      </Flex>
    </Flex>
  );
};

import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";

const Donation = ({ ...props }) => {
  const handleDeletion = () => props.remover((i) => i.splice(props.index, 1));

  return (
    <Box
      w="300px"
      backgroundColor={"pink.500"}
      rounded="20px"
      margin={6}
      shadow={"dark-lg"}
    >
      <Box p={5}>
        <Stack align="left">
          <Flex justifyContent={"space-between"} alignItems={"center"} grow="1">
            <Text as="h2" fontWeight="normal" color={"white"} my={2}>
              Tipo: <b>{props.tipo}</b>
            </Text>
            <BsTrash
              color="white"
              onClick={handleDeletion}
              style={{ cursor: "pointer" }}
            />
          </Flex>
          {props.tipo == "bienes" && (
            <Box color={"white"}>
              <Text fontWeight="light" fontSize={"sm"}>
                Nombre: {props.data.nombre}
              </Text>
              <Text fontWeight="light" fontSize={"sm"}>
                Descripción: {props.data.descripcion}
              </Text>
              <Text fontWeight="light" fontSize={"sm"}>
                Cantidad: {props.data.cantidad}
              </Text>
            </Box>
          )}
          {props.tipo == "monetaria" && (
            <Text fontWeight="light" color={"white"} fontSize={"sm"}>
              Monto: ${props.data.monto}
            </Text>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Donation;

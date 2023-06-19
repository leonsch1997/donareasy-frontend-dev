import {
  Box,
  Button,
  Flex,
  FlexProps,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { BsTrash } from "react-icons/bs";
import { BienItem, MontoItem } from "./types";
import { FC } from "react";

interface ItemListProps {
  donations: (MontoItem | BienItem)[];
  onRemove: (sortId: string) => void;
}

export const ItemsList: FC<ItemListProps> = ({ donations, onRemove }) => {
  return (
    <List width="100%" spacing={4}>
      {donations.length &&
        donations.map(({ tipoDonacion, sortId, ...data }) =>
          tipoDonacion === "monetaria" ? (
            <Monto
              {...(data as MontoItem)}
              key={sortId}
              onRemove={() => onRemove(sortId)}
            />
          ) : (
            <Bien
              {...(data as BienItem)}
              key={sortId}
              onRemove={() => onRemove(sortId)}
            />
          )
        )}
    </List>
  );
};

const itemStyles = {
  alignItems: "center",
  justifyContent: "space-between",
  bg: "white",
  padding: 4,
  borderRadius: "0.5rem",
  boxShadow: "md",
} as FlexProps;

export const Monto = ({
  amount,
  onRemove,
}: MontoItem & { onRemove: () => void }) => {
  return (
    <Flex {...itemStyles}>
      <ListItem pl={4}>
        <b>Tipo:</b> Monetaria
        <Text fontSize={"sm"}>Monto: $&nbsp;{amount}</Text>
      </ListItem>
      <Button onClick={onRemove}>
        <BsTrash fontSize={25} />
      </Button>
    </Flex>
  );
};

export const Bien = ({
  onRemove,
  ...data
}: BienItem & { onRemove: () => void }) => {
  return (
    <Flex {...itemStyles}>
      <ListItem pl={4}>
        <b>Tipo:</b> Bienes
        <br />
        <Box>
          <Text fontSize="sm">Nombre: {data.nombre}</Text>
          <Text fontSize="sm">Descripción: {data.descripcion}</Text>
          <Text fontSize="sm">Cantidad: {data.cantidad}</Text>
        </Box>
      </ListItem>
      <Button onClick={onRemove}>
        <BsTrash fontSize={25} />
      </Button>
    </Flex>
  );
};

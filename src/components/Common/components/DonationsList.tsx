import { FC } from "react";
import {
  Flex,
  ListItem,
  List,
  Text,
  FlexProps,
} from "@chakra-ui/react";
import { StateBasedIcon } from ".";
import { Donation, DonationStates, MoneyDonationStates } from "../types";

export const DonationsList: FC<{ donations: Donation[] }> = ({ donations }) => {
  return (
    <List width="100%" spacing={4}>
      {donations.length > 0 ? (
        donations.map((item, idx) => <DonationItem {...item} key={idx} />)
      ) : (
        <>
          <Text fontWeight="bold">Sin donaciones en el último período</Text>
          <Text>
            Parece que no has realizado donaciones últimamente. Puedes realizar
            una nueva presionando en el botón "Realizar Donación"
          </Text>
        </>
      )}
    </List>
  );
};

export const DonationItem = (item: Donation) => {
  const { cod_estado } = item;
  const isMoneyDonation = item.hasOwnProperty("monto");
  const bien = !isMoneyDonation ? item.bienes[0] : null;

  const itemStyles = {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    bg: "white",
    padding: 4,
    borderRadius: "0.5rem",
    boxShadow: "md",
  } as FlexProps;

  return (
    <ListItem pl={4}>
      <Flex {...itemStyles}>
        {item.institucion && (
          <Flex direction="column" width="100%">
            <Text fontSize="md" color="#00A0DC">
              <b>Institucion</b>
            </Text>
            <Text fontSize="sm">
              <b>Nombre:</b> {item.institucion.nombre}
            </Text>
            <Text fontSize="sm">
              <b>Telefono: </b> {item.institucion.telefono}
            </Text>
            <Text fontSize="sm">
              <b>Dirección: </b> {item.institucion.domicilio}
            </Text>
            <Text fontSize="sm">
              <b>Localidad:</b> {item.institucion.localidad}
            </Text>
            <Text fontSize="sm">
              <b>Provincia: </b> {item.institucion.provincia}
            </Text>
          </Flex>
        )}

        {bien && (
          <Flex justifyContent="flex-start" direction="column" width="100%">
            <Text fontSize="md" color="#00A0DC">
              <b>Bien</b>
            </Text>
            <Text fontSize="sm">
              <b>Descripción:</b> {bien?.descripcion}
            </Text>
            <Text fontSize="sm">
              <b>Nombre:</b> {bien?.nombre}
            </Text>
            <Text fontSize="sm">
              <b>Cantidad:</b> {bien?.cantidad}
            </Text>
          </Flex>
        )}

        <Flex direction="column" width="100%">
          <Text fontSize="md" color="#00A0DC">
            <b>Donación: </b>
          </Text>
          <Text fontSize="sm">
            <b>Estado</b>{" "}
            <StateBasedIcon stateCode={cod_estado} isMoneyDonation={isMoneyDonation}/>
            {isMoneyDonation
              ? MoneyDonationStates[cod_estado]
              : DonationStates[cod_estado]}
          </Text>
          <Text fontSize="sm">
            <b>Fecha creación:</b> {new Date(item.fecha_creacion).toLocaleDateString()}
          </Text>
          {isMoneyDonation && (
            <>
              <Text fontSize="sm">
                <b>Monto:</b> ${item.monto} - ARS
              </Text>
              <Text fontSize="sm">
                <b>Fecha de transferencia:</b> {new Date(item.fecha_transferencia).toLocaleDateString()}
              </Text>
            </>
          )}

          {item.fecha_aceptacion && (
            <Text fontSize="sm">
              <b>Fecha aceptación:</b> {new Date(item.fecha_aceptacion).toLocaleDateString()}
            </Text>
          )}
          {item.fecha_cancelacion && (
            <>
              <Text fontSize="sm">
                <b>Fecha cancelación:</b> {new Date(item.fecha_cancelacion).toLocaleDateString()}
              </Text>
              <Text fontSize="sm">
                <b>Motivo cancelación:</b> {item.motivo_cancelacion}
              </Text>
            </>
          )}
        </Flex>
      </Flex>
    </ListItem>
  );
};

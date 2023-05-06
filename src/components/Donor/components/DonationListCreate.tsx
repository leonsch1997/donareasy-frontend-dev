import { Flex, Box, Heading, Select, Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useDonationsMade } from "../../../hooks";
import { LoadingSpinner } from "../../Common";
import { Donation, DonationStates } from "../types";
import { DonationsList } from "./DonationsList";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../routes";

const allDonations = "Todas";
const filterOptions = [allDonations].concat(
  Object.values(DonationStates).filter(
    (val) => typeof val !== "number"
  ) as string[]
);

export const DonationListCreate = () => {
  const { fetchDonationsMade, donations, loading, error } =
    useDonationsMade();
  const [sortedDonations, setDonations] = useState(donations);

  const sortDonations = useCallback(() => {
    const selectedOption = document.getElementById(
      "donationsFilter"
    ) as HTMLSelectElement;

    selectedOption?.value === "Todas"
      ? setDonations(donations)
      : setDonations(
          donations.filter(
            (don: Donation) =>
              DonationStates[don.cod_estado] === selectedOption?.value
          )
        );
  }, [donations]);

  useEffect(() => sortDonations(), [donations, sortDonations])

  useEffect(() => {
    fetchDonationsMade();
  }, [fetchDonationsMade]);

  const navigate = useNavigate();

  const goToCreateDonation = () => navigate(routes.donar);
  // const goToApadrinamiento = () => navigate(routes.apadrinar);
  // const goToCreateDonation = () => {alert('mensaje')};
  // const goToApadrinamiento = () => {alert('mensaje')};

  return (
    <Flex flexWrap="wrap">
      <Heading>
        Donaciones Realizadas
        <Select onChange={sortDonations} id="donationsFilter">
          {filterOptions.map((option, idx) => (
            <option key={`${option}-${idx}`}>{option}</option>
          ))}
        </Select>
        <Button onClick={goToCreateDonation} colorScheme="blue" mr={2}>
          Realizar Donación
        </Button>
        {/* <Button onClick={goToApadrinamiento} colorScheme="pink" mr={2}>
              Apadrinar
            </Button>  */}
      </Heading>
      <Box width={"100%"} mt="10">
        {loading && <LoadingSpinner />}
        {error && (
          <Flex>
            <p>
              Oops! Algo no ha salido como se esperaba, no se han podido cargar
              las donaciones.
            </p>
          </Flex>
        )}
        {!error && !loading && <DonationsList donations={sortedDonations} />}
      </Box>
    </Flex>
  );
};

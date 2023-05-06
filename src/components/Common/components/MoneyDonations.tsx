import { Flex, Box, Heading, Select } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { usePendingMoneyDonations } from "../../../hooks";
import { LoadingSpinner } from ".";
import { Donation, MoneyDonationStates } from "../types";
import { DonationsList } from "./DonationsList";

const allDonations = "Todas";
const filterOptions = [allDonations].concat(
  Object.values(MoneyDonationStates).filter(
    (val) => typeof val !== "number"
  ) as string[]
);

export const MoneyDonations = () => {
  const {
    fetchPendingMoneyDonations,
    donations,
    loading,
    error,
  } = usePendingMoneyDonations();

  useEffect(() => {
    fetchPendingMoneyDonations();
  }, [fetchPendingMoneyDonations]);

  const [sortedDonations, setDonations] = useState(donations);

  const sortDonations = useCallback(() => {
    const selectedOption = document.getElementById(
      "moneyDonationsFilter"
    ) as HTMLSelectElement;

    selectedOption?.value === "Todas"
      ? setDonations(donations)
      : setDonations(
          donations.filter(
            (don: Donation) =>
              MoneyDonationStates[don.cod_estado] === selectedOption?.value
          )
        );
  }, [donations]);

  useEffect(() => sortDonations(), [donations, sortDonations]);

  return (
    <Flex flexWrap="wrap">
      <Heading>
        Donaciones
        <Select onChange={sortDonations} id="moneyDonationsFilter">
          {filterOptions.map((option, idx) => (
            <option key={`${option}-${idx}`}>{option}</option>
          ))}
        </Select>
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

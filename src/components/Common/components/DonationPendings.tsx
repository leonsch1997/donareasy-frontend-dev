import { Flex, Heading, Select, Text } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { usePendingDonations } from "../../../hooks";
import { LoadingSpinner, MakeDonationButton } from ".";
import { Donation, DonationStates } from "../types";
import { DonationsList } from "./DonationsList";
import { useCookies } from "react-cookie";
import { UserType } from "..";

const allDonations = "Todas";
const filterOptions = [allDonations].concat(
  Object.values(DonationStates).filter(
    (val) => typeof val !== "number"
  ) as string[]
);

export const DonationPendings = () => {
  const { fetchPendingDonations, donations, loading, error } =
    usePendingDonations();
  const [sortedDonations, setDonations] = useState(donations);
  const [
    {
      clientSession: { group },
    },
  ] = useCookies();

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

  useEffect(() => sortDonations(), [donations, sortDonations]);

  useEffect(() => {
    fetchPendingDonations();
  }, [fetchPendingDonations]);

  return (
    <Flex flexWrap="wrap">
      <Flex flexBasis="30%">
        <Heading>Donaciones</Heading>
      </Flex>

      <Flex pl={4} gap={8} flexBasis="70%" justifyContent="end">
        <Select maxW={200} onChange={sortDonations} id="donationsFilter">
          {filterOptions.map((option, idx) => (
            <option key={`${option}-${idx}`}>{option}</option>
          ))}
        </Select>
        {(group === UserType.donantes || group === UserType.cadete) && (
          <MakeDonationButton />
        )}
      </Flex>

      <Flex flexBasis={"100%"} mt={8}>
        {loading && <LoadingSpinner />}
        {error && (
          <Text fontWeight="bold">
            Oops! Algo no ha salido como se esperaba, no se han podido cargar
            las donaciones.
          </Text>
        )}
        {!error && !loading && <DonationsList donations={sortedDonations} />}
      </Flex>
    </Flex>
  );
};

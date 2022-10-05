import { DonationsList } from './DonationsList';
import { generateDonations } from './utils';
import { Heading, Divider, Flex } from '@chakra-ui/react';

export const Donations = () => {
  const donaciones = generateDonations(10);

  return (
    <Flex flexDir='column' alignItems='center' w={'100%'}>
      <Heading m={10}>Donaciones - 'Nombre usuario'</Heading>
      <Divider />
      <DonationsList list={donaciones} />
    </Flex>
  )
};

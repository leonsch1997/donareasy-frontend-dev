import { DonationsList } from './DonationsList';
import { generateDonations } from './utils';
import { Heading, Divider, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers';

export const Donations = () => {
  const donaciones = generateDonations(10);
  const { username, authToken } = useSelector(authSelector);
  console.log({ username, authToken })
  
  return (
    <Flex flexDir='column' alignItems='center' w={'100%'}>
      <Heading m={10}>Donaciones - {username}</Heading>
      <Divider />
      <DonationsList list={donaciones} />
    </Flex>
  )
};

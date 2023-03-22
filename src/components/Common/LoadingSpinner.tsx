import { CircularProgress, Flex } from '@chakra-ui/react';

export const LoadingSpinner = () => (
  <Flex width="100%" height="100%" justifyContent="center" alignItems="center" padding={15}>
    <CircularProgress isIndeterminate={true} color={'teal.300'}/>
  </Flex>
);

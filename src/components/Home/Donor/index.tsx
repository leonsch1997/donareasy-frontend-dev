import { Container, Flex, TabList, Tabs, Tab, TabPanel, TabPanels } from '@chakra-ui/react';

const LatestDonations = () => {
  return (
    <Container ml={0} minHeight='500px' bg='yellow' centerContent>
      LatestDonations
    </Container>
  );
}

const News = () => {
  return (
    <Container ml={0} minHeight='500px' bg='yellow' centerContent>
      News
    </Container>
  );
}

export const DonorHomeView = () => {
  return(
    <Flex borderRadius='lg' boxShadow='xl' m='20px auto 0' w="80%" justifyContent="center" alignItems="flex-start">
      <Tabs minHeight='500px' width="100%">
        <TabList>
          <Tab>Ultimas donaciones</Tab>
          <Tab>Ultimas noticias</Tab>
        </TabList>

        <TabPanels height="100%" bg={'red'}>
          <TabPanel>
            <LatestDonations />
          </TabPanel>

          <TabPanel>
            <News />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
};
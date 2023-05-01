import { FC } from "react";
import { Flex, TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
//import { Apadrinamiento, News, Recolecciones, DonationPendings, MoneyDonations } from "./components";
import { DonationListCreate, MoneyDonationsList } from "./components";

export const DonorMain: FC = () => {
  return (
    <Flex
      borderRadius="lg"
      boxShadow="lg"
      m="20px auto 0"
      w="80%"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Tabs minHeight="600px" height={"100%"} width="100%" pb={10}>
        <TabList>
          <Tab>Donaciones Bienes</Tab>
          <Tab>Donaciones Monetarias</Tab>
          <Tab>Recolecciones Pendientes</Tab>
          <Tab>Apadrinamiento</Tab>
          <Tab>Ultimas noticias</Tab>
        </TabList>

        <TabPanels height="100%" maxHeight={'70vh'} overflow={'auto'}>
          <TabPanel>
            <DonationListCreate />
          </TabPanel>

          <TabPanel>
            <p><MoneyDonationsList /></p>
          </TabPanel>
          
          <TabPanel>
            <p>Panel3</p>  
          </TabPanel>

          <TabPanel>
            <p>Panel4</p>
          </TabPanel>

          <TabPanel>
            <p>Panel5</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
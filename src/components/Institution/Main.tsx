import { FC } from "react";
import { Flex, TabList, Tabs, Tab, TabPanel, TabPanels } from "@chakra-ui/react";
import { Apadrinamiento, News, Recolecciones, DonationPendings, MoneyDonations } from "./components";

export const InstitutionMain: FC = () => {
  return (
    <Flex
      borderRadius="lg"
      boxShadow="xl"
      m="20px auto 0"
      w="80%"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Tabs minHeight="600px" height={"100%"} width="100%">
        <TabList>
          <Tab>Donaciones Bienes</Tab>
          <Tab>Donaciones Monetarias</Tab>
          <Tab>Recolecciones Pendientes</Tab>
          <Tab>Apadrinamiento</Tab>
          <Tab>Ultimas noticias</Tab>
        </TabList>

        <TabPanels height="100%" bg={"red"}>
          <TabPanel>
            <DonationPendings />
          </TabPanel>

          <TabPanel>
            <MoneyDonations />
          </TabPanel>
          
          <TabPanel>
            <Recolecciones />
          </TabPanel>

          <TabPanel>
            <Apadrinamiento />
          </TabPanel>

          <TabPanel>
            <News />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};
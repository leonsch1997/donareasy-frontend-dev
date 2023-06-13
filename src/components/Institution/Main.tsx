import {
  Flex,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { Recolecciones } from "./components";
import { DonationPendings, MoneyDonations } from "../Common";

export const InstitutionMain = () => {
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
        </TabList>

        <TabPanels height="100%" maxHeight={"70vh"} overflow={"auto"}>
          <TabPanel>
            <DonationPendings />
          </TabPanel>

          <TabPanel>
            <MoneyDonations />
          </TabPanel>

          <TabPanel>
            <Recolecciones />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

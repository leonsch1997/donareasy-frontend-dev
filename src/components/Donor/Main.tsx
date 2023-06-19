import { FC } from "react";
import {
  Flex,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { DonationPendings, MoneyDonations } from "../Common";

export const DonorMain: FC = () => {
  return (
    <Flex
      borderRadius="lg"
      boxShadow="lg"
      m="20px auto 0"
      w="1024px"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Tabs minHeight="600px" height={"100%"} pb={10}>
        <TabList>
          <Tab>Donaciones Bienes</Tab>
          <Tab>Donaciones Monetarias</Tab>
        </TabList>

        <TabPanels height="100%" maxHeight={"70vh"} overflow={"auto"}>
          <TabPanel>
            <DonationPendings />
          </TabPanel>

          <TabPanel>
            <MoneyDonations />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

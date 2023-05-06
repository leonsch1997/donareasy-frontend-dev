import { FC } from "react";
import {
  Flex,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { DonationPendings, MoneyDonations, News } from "../Common";

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
          <Tab>Ultimas noticias</Tab>
        </TabList>

        <TabPanels height="100%" maxHeight={"70vh"} overflow={"auto"}>
          <TabPanel>
            <DonationPendings />
          </TabPanel>

          <TabPanel>
            <MoneyDonations />
          </TabPanel>

          <TabPanel>
            <News />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
};

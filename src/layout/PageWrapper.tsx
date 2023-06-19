import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Flex,
  Spacer,
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  MenuItem,
  Center,
  IconButton,
  MenuDivider,
} from "@chakra-ui/react";
import { TbUserCircle, TbBuildingCommunity, TbLogin } from "react-icons/tb";

import { routes } from "../routes";
import { useCookies } from "react-cookie";
import { clientSession } from "../components/constants";
import { Logo } from "./components";
import { UserType } from "../components/Common";

export const PageWrapper: FC = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies();

  const handleSessionButton = () => {
    if (cookies[clientSession]) removeCookie(clientSession);
    navigate(routes.login);
  };

  const rol = UserType[cookies.clientSession?.group as UserType] ?? null;
  const isInst = cookies.clientSession?.group === UserType.Instituciones;
  const isDon = cookies.clientSession?.group === UserType.donantes;

  const MenuComponent = () => {
    const iconProps = { strokeWidth: "1.25", color: "white", size: "xl" };
    const iconComponent = isInst ? (
      <TbBuildingCommunity {...iconProps} />
    ) : isDon ? (
      <TbUserCircle {...iconProps} />
    ) : null;

    const sessionOptions = (
      <MenuGroup title="Sesión">
        <MenuItem onClick={handleSessionButton}>
          {cookies[clientSession] ? "Cerrar sesión" : "Iniciar sesión"}
        </MenuItem>
      </MenuGroup>
    );

    if (!iconComponent)
      return (
        <Menu>
          <MenuButton
            as={IconButton}
            rounded="full"
            colorScheme="transparent"
            aria-label="Options"
            _active={{ boxShadow: 'none' }}
            _focus={{ boxShadow: 'none' }}
            icon={<TbLogin {...iconProps} />}
          />
          <MenuList>{sessionOptions}</MenuList>
        </Menu>
      );

    return (
      <Menu>
        <MenuButton
          as={IconButton}
          rounded="full"
          colorScheme="transparent"
          aria-label="Options"
          _active={{ boxShadow: 'none' }}
          _focus={{ boxShadow: 'none' }}
          icon={iconComponent}
        />
        <MenuList>
          <MenuGroup title={"Viendo como"}>
            <MenuItem isDisabled>{rol}</MenuItem>
          </MenuGroup>
          <MenuDivider />
          {sessionOptions}
        </MenuList>
      </Menu>
    );
  };

  return (
    <>
      <Flex p={3} bg={"teal.300"}>
        <Logo />
        <Spacer />
        <Center alignContent="center">
          {location.pathname !== routes.login && <MenuComponent />}
        </Center>
      </Flex>

      <Flex justifyContent={"center"} minHeight={"70vh"} height={"auto"}>
        {children}
      </Flex>
    </>
  );
};

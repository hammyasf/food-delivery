import {
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  HStack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronDownIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { setAccessToken } from "../utils/accessToken";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useEffect } from "react";
import { setIsAuthenticated } from "../utils/isAuthenticated";
import { date } from "yup";

function NavLink({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Box
      to={to}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
      as={Link}
    >
      {children}
    </Box>
  );
}

export function Navbar() {
  const { data } = useMeQuery();
  useEffect(() => {
    const authenticated: boolean = data && data.me ? true : false;
    setIsAuthenticated(authenticated);
  }, [data]);
  const { toggleColorMode, colorMode } = useColorMode();
  const [logout, { client }] = useLogoutMutation();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box as={Link} to="/">
              Food Delivery
            </Box>
          </HStack>
          <HStack spacing={2} alignItems={"center"}>
            {data && data.me ? (
              <Menu>
                <MenuButton
                  as={Button}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <IconButton
                    size={"md"}
                    icon={<ChevronDownIcon />}
                    aria-label={"Show Dropdown Menu"}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/restaurants">
                    Restaurants
                  </MenuItem>
                  <MenuItem>Orders</MenuItem>
                  <MenuItem
                    onClick={async () => {
                      await logout();
                      setAccessToken("");
                      await client!.resetStore();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/register">Register</NavLink>
              </>
            )}
            <IconButton
              size={"md"}
              icon={colorMode === "light" ? <SunIcon /> : <MoonIcon />}
              aria-label={"Show Dropdown Menu"}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
      </Box>
    </>
  );
}

import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Spacer,
  Center,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import React from "react";
import { AccessRights } from "./accessRights";
import { ChatIcon } from "@chakra-ui/icons";

const Topbar = (props) => {
  const { onOpen } = useDisclosure();
  const setFullWidth = props.entitlement.includes(AccessRights.user);

  return (
    <Flex
      ml={!setFullWidth && { base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="5px"
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <Box>
        <IconButton
          display={{ base: "flex", md: "none" }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <Text
          display={{ base: "flex", md: "none" }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold"
        >
          Logo
        </Text>
      </Box>

      <Box flex={1}>
        {props.entitlement.includes(AccessRights.user) && (
          <Flex alignItems={"center"}>
            <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
              <ChatIcon color={"#6C63FF"} /> Help Desk
            </Text>
          </Flex>
        )}
      </Box>

      <Box w="250px">
        <HStack spacing={{ base: "0", md: "6" }}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size="sm"
                    bg="#6C63FF"
                    name="Pasindu Jayawardhana"
                    src="https://bit.ly/tioluwani-kolawole"
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="xs">Pasindu Jayawardhana</Text>
                    <Text fontSize="xs" color="gray.600">
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue("white", "gray.900")}
                borderColor={useColorModeValue("gray.200", "gray.700")}
              >
                <Divider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Topbar;

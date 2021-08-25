import React from "react";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import menu from "./menu";
import { ValidateAccessRight } from "./accessRights";
import {ChatIcon} from "@chakra-ui/icons";

const Sidebar = () => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const filteredMenu = menu.filter((item) => {
    if (ValidateAccessRight(item.entitlement)) {
      return item;
    }
  });

  return (
    <Box
      transition="3s ease"
      bg={"#6C63FF"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold" color={"#ffff"}>
            <ChatIcon fill={"#333333"}/> Help Desk
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {filteredMenu.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          route={link.route}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, route, children, ...rest }) => {
  return (
    <Link to={route} style={{ textDecoration: "none", color: "#ffffff" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "#ffffff",
          color: "black",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "black",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default Sidebar;

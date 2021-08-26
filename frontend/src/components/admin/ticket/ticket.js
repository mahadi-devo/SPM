import React, { useContext, useEffect, useRef, useState } from "react";
import ticketContext from "../../../context/admin/ticket/ticketContext";
import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  color,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  DownloadIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import * as PropTypes from "prop-types";
import CustomTable from "../../shared/customTable";
import {Link, useRouteMatch} from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import DeleteModal from "../../shared/deleteModal";
import { useHistory } from "react-router-dom";

function Fragment(props) {
  return null;
}

Fragment.propTypes = { children: PropTypes.node };

function AlertDialog(props) {
  return null;
}

AlertDialog.propTypes = {
  leastDestructiveRef: PropTypes.any,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool,
  children: PropTypes.node,
};
const Ticket = () => {
  let history = useHistory();
  const { path } = useRouteMatch();
  const TicketContext = useContext(ticketContext);

  const { getAllTickets, tickets } = TicketContext;

  console.log(tickets);

  useEffect(() => {
    getAllTickets();
  }, []);

  const [editTicket, setEditTicket] = useState(false);
  const [ticket, setTicket] = useState("");

  const [isOpenDelete, setIsOpen] = useState(false);
  const onCloseDelete = () => setIsOpen(false);

  const navigateToEdit = (data) => {
    history.push({
      pathname: `${path}/edit/`,
      state: data,
    });
  }

  const cols = [
    {
      title: "Ref No",
      render: (data) => {
        return data._id;
      },
    },
    {
      title: "Name",
      render: (data) => {
        return data.name;
      },
    },
    {
      title: "Subject",
      // isNumeric: true,
      render: (data) => {
        return data.subject;
      },
    },
    {
      title: "Status",
      // isNumeric: true,
      render: (data) => {
        return data.status;
      },
    },
    {
      title: "Actions",
      // isNumeric: true,
      render: (data) => {
        return (
          <HStack w="50%">
            <Spacer />
            <Tooltip hasArrow label="Edit" fontSize="md" placement="top">
              <EditIcon
                onClick={() => navigateToEdit(data)}
                fontSize="1xl"
                cursor="pointer"
                color="#4299e1"
              />
            </Tooltip>

            <Spacer />
            <Tooltip hasArrow label="Delete" fontSize="md" placement="top">
              <DeleteIcon
                fontSize="1xl"
                cursor="pointer"
                onClick={() => setIsOpen(true)}
                color="red"
              />
            </Tooltip>
          </HStack>
        );
      },
    },
  ];

  return (
    <Container maxW="100%" centerContent={true}>
      <VStack w="100%" alignItems="stretch" mt={5}>
        <Flex>
          <Box>
            <Heading as="h6" size="lg">
              Ticket Management
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <HStack mb={8}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<SearchIcon color="gray.300" fontSize="15" />}
                />
                <Input size="sm" placeholder="Search" />
              </InputGroup>
              <Button
                padding={"15px"}
                rightIcon={<DownloadIcon />}
                size="sm"
                color="white"
                _hover={{
                  bg: "#403ac2",
                  color: "#ffffff",
                }}
                bg="#6c63ff"
                variant="solid"
              >
                Report
              </Button>
            </HStack>
          </Box>
        </Flex>
      </VStack>

      <CustomTable
        headColor="white"
        colorScheme={"blackAlpha"}
        cols={cols}
        rows={tickets}
      />

      <DeleteModal
        isOpenDelete={isOpenDelete}
        onCloseDelete={onCloseDelete}
        title="User"
        subTitle="Are you sure? You can't undo this action afterwards."
      />
    </Container>
  );
};

export default Ticket;

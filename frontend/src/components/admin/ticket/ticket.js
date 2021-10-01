import React, { useContext, useEffect, useRef, useState } from "react";
import ticketContext from "../../../context/admin/ticket/ticketContext";
import {
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button, Center,
  color,
  Container,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement, Select,
  Spacer, Text,
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
import { saveAs } from 'file-saver';
import axios from 'axios';
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

  const createAndDownloadPdf = () => {
    axios
      .post('http://localhost:5000/api/v1/ticket/generate-ticket-report')
      .then(() =>
        axios.post('http://localhost:5000/api/v1/ticket/fetch-ticket-report', {
          responseType: 'blob',
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      });
  };

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
        <Flex p={5}>
          <Box>
            <Heading as="h6" size="lg">
              Ticket Management{' '}
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme='blue'
                size='sm'
                _hover={{
                  boxShadow: '2xl',
                }}
                bg='#6C63FF'
                onClick={createAndDownloadPdf}
              >
                Import
              </Button>
            </Heading>
          </Box>
          <Spacer />
        </Flex>
        <HStack px="5" style={{ marginBottom: "10px" }}>
          <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                size="sm"
                height="30px"
                children={<SearchIcon color="gray.300" />}
            />
            <Input size="sm" w="20vw" placeholder="Search" />
          </InputGroup>
          <Spacer />
          <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
          >
            <Center w="200px">
              <Text size="xs">Sort By</Text>
            </Center>
            <Select variant="outline" placeholder="Select" size="sm">
              <option value="Department">Department</option>
              <option value="Manager">Manager</option>
              <option value="Latest">Latest</option>
            </Select>
            <Spacer />
            <Center w="200px">
              <Text size="sm">Order By</Text>
            </Center>
            <Select variant="outline" placeholder="Select" size="sm">
              <option value="Department">Ascending</option>
              <option value="Manger">Descending</option>
            </Select>
          </div>
        </HStack>
        <Spacer />
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

import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Stack,
  HStack,
  Box,
  Heading,
  Spacer,
  IconButton,
  Text,
  Button,
  Center,
  Tooltip,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import * as Yup from 'yup';
import { FaEye } from 'react-icons/fa';
import {
  DeleteIcon,
  DownloadIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { find } from 'lodash';
import departmentContext from '../../context/department/departmentContext';
import ticketContext from "../../context/admin/ticket/ticketContext";
import DeleteModal from '../shared/deleteModal';
import DepartmentForm from './departmentForm';
import CustomTable from "../shared/customTable";

function DepartmentView(props) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { depatments, getDeartment, deleteDeparment } = useContext(departmentContext);
  const { getAllTickets, tickets } = useContext(ticketContext);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const department = find(
    depatments,
    (department) => department._id === props.match.params.id
  );

  const validationSchema = Yup.object().shape({
    departmentId: Yup.string().required('Department ID is required!'),
    departmentName: Yup.string().required('Department Name is required!'),
    manager: Yup.string().required('Manager is required'),
  });

  const onCloseDelete = () => setIsOpenDelete(false);

  const onDelete = () => {
    deleteDeparment(props.match.params.id);
    setIsOpenDelete(false);
    history.goBack();
  };

  useEffect(() => {
    getDeartment();
    getAllTickets();
  }, []);

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
                onClick={() => {}}
                fontSize="1xl"
                cursor="pointer"
                color="#4299e1"
              />
            </Tooltip>
          </HStack>
        );
      },
    },
  ];

  return (
    <Container maxW="100%" centerContent={true}>
      <Stack w="80%" alignItems="stretch">
        <HStack>
          <Heading as="h4" size="lg">
            Department Details
          </Heading>
          <Spacer />
          <IconButton
            variant="ghost"
            colorScheme="blue"
            aria-label="Back"
            fontSize="20px"
            isRound
            icon={<FaArrowLeft />}
            onClick={history.goBack}
          />
          <Button
            colorScheme="blue"
            size="sm"
            onClick={() => setIsUpdate(!isUpdate)}
          >
            {isUpdate ? 'View' : 'Update'}
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            onClick={() => setIsOpenDelete(true)}
          >
            Delete
          </Button>
        </HStack>
        <Center>
          <Box width={{ base: '100%', sm: '100%', md: '100%' }}>
            <DepartmentForm
              initialValues={department}
              update={isUpdate}
              onCancle={() => setIsUpdate(!isUpdate)}
            />
          </Box>
        </Center>
        <Center>
          <Box mt={4} p={5} shadow="md" width="100%" borderWidth="1px">
            <HStack>
              <Heading fontSize="xl">Ticket List</Heading>
              <Spacer />
              <Button
                leftIcon={<DownloadIcon />}
                size="sm"
                bg="#6C63FF"
                color="white"
                _hover={{
                  boxShadow: '2xl',
                }}
                variant="solid"
              >
                Report
              </Button>
            </HStack>
            <Text>here are all the ticket  belogs to this department</Text>
            <Box mt={4} pl={5}>
              <CustomTable
                headColor="white"
                colorScheme={"blackAlpha"}
                cols={cols}
                rows={tickets}
              />
            </Box>
          </Box>
        </Center>
      </Stack>
      <DeleteModal
        isOpenDelete={isOpenDelete}
        onDelete={onDelete}
        onCloseDelete={onCloseDelete}
        title="Deparment"
        subTitle="Are you sure? You can't undo this action afterwards."
      />
    </Container>
  );
}

export default DepartmentView;

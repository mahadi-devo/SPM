import React, { useContext, useEffect } from 'react';
import {
  Container,
  Box,
  Spacer,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import { FaPlus, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link, useRouteMatch } from 'react-router-dom';

import CustomTable from '../shared/customTable';
import departmentContext from '../../context/department/departmentContext';

const DepartmentHome = (props) => {
  const { url } = useRouteMatch();
  const { depatments, getDeartment } = useContext(departmentContext);

  useEffect(() => {
    getDeartment();
  }, []);

  const Handelview = (id) => {
    console.log('clicked view on ', id);
  };

  const HandelEdit = (id) => {
    console.log('clicked edit on ', id);
  };

  const HandelDelete = (id) => {
    console.log('clicked delete on ', id);
  };

  const cols = [
    {
      title: 'Department ID',
      render: (data) => {
        return data.departmentId;
      },
    },
    {
      title: 'Department Name',
      render: (data) => {
        return data.departmentName;
      },
    },
    {
      title: 'Manager Name',
      // isNumeric: true,
      render: (data) => {
        return data.manager;
      },
    },
    {
      title: 'Manager Name',
      // isNumeric: true,
      render: (data) => {
        return (
          <HStack w="50%">
            <FaEye
              cursor="pointer"
              onClick={() => Handelview(data.departmentId)}
              color="blue"
            />
            <Spacer />
            <FaEdit
              cursor="pointer"
              onClick={() => HandelEdit(data.departmentId)}
              color="orange"
            />
            <Spacer />
            <FaTrashAlt
              cursor="pointer"
              onClick={() => HandelDelete(data.departmentId)}
              color="red"
            />
          </HStack>
        );
      },
    },
  ];

  return (
    <Container maxW="100%" centerContent={true}>
      <VStack w="90%" alignItems="stretch" mt={5}>
        <HStack>
          <Heading as="h1" size="xl">
            Department Management
          </Heading>
          <Spacer />
          <Link to={`${url}/add`}>
            <Button leftIcon={<FaPlus />} colorScheme="blue" variant="solid">
              ADD
            </Button>
          </Link>
        </HStack>
        <CustomTable cols={cols} rows={depatments} />
      </VStack>
    </Container>
  );
};

export default DepartmentHome;

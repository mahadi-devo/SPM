import React from 'react';
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
import { FaPlus, FaEye, FaEdit, FaTrashAlt} from 'react-icons/fa';
import { Link, useRouteMatch } from 'react-router-dom';

import CustomTable from '../shared/customTable';

const DepartmentHome = (props) => {
  const { url } = useRouteMatch();

  const Handelview = (id) => {
    console.log('clicked view on ', id);
  }
  
  const HandelEdit = (id) => {
    console.log('clicked edit on ', id);
  }
  
  const HandelDelete = (id) => {
    console.log('clicked delete on ', id);
  }

  const cols = [
    {
      title: 'Department ID',
      render: (data) => {
        return data.id;
      },
    },
    {
      title: 'Department Name',
      render: (data) => {
        return data.name;
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
        return <HStack w="50%">
          <FaEye cursor='pointer' onClick={() => Handelview(data.id)} color="blue" />
          <Spacer />
          <FaEdit cursor='pointer' onClick={() => HandelEdit(data.id)} color="yellow" />
          <Spacer />
          <FaTrashAlt cursor='pointer' onClick={() => HandelDelete(data.id)} color="red" />
        </HStack>;
      },
    },
  ];

  const rows = [
    {
      id: 'IT',
      name: 'Information Technology ',
      manager: 'Nuwan Chamara',
    },
    {
      id: 'ET',
      name: 'Information Technology ',
      manager: 'Nuwan Chamara',
    },
    {
      id: 'BT',
      name: 'Information Technology ',
      manager: 'Nuwan Chamara',
    },
    {
      id: 'ENG',
      name: 'Information Technology ',
      manager: 'Nuwan Chamara',
    },
    {
      id: 'BA',
      name: 'Information Technology ',
      manager: 'Nuwan Chamara',
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
        <CustomTable cols={cols} rows={rows}/>
      </VStack>
    </Container>
  );
};

export default DepartmentHome;

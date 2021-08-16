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
import { FaPlus, FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

import CustomTable from '../../shared/customTable';

const User = () => {
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
      title: 'User ID',
      render: (data) => {
        return data.id;
      },
    },
    {
      title: 'User Name',
      render: (data) => {
        return data.name;
      },
    },
    {
      title: 'User Email',
      // isNumeric: true,
      render: (data) => {
        return data.email;
      },
    },
    {
      title: 'Department',
      // isNumeric: true,
      render: (data) => {
        return data.department;
      },
    },
    {
      title: 'Mobile',
      // isNumeric: true,
      render: (data) => {
        return data.mobile;
      },
    },
    {
      title: 'Action',
      // isNumeric: true,
      render: (data) => {
        return (
          <HStack w='50%'>
            <FaEye
              fontSize='6xl'
              cursor='pointer'
              onClick={() => Handelview(data.id)}
              color='blue'
            />
            <Spacer />
            <FaEdit
              fontSize='3xl'
              cursor='pointer'
              onClick={() => HandelEdit(data.id)}
              color='yellow'
            />
            <Spacer />
            <FaTrashAlt
              fontSize='3xl'
              cursor='pointer'
              onClick={() => HandelDelete(data.id)}
              color='red'
            />
          </HStack>
        );
      },
    },
  ];

  const rows = [
    {
      id: 'IT',
      name: 'Aflal ',
      email: 'aflal@gmail.com',
      department: 'IT',
      mobile: '+94234234234',
    },
    {
      id: 'ET',
      name: 'Pasindu ',
      email: 'pasindu@gmail.com',
      department: 'ET',
      mobile: '+94234234234',
    },
    {
      id: 'BT',
      name: 'Mahadi ',
      email: 'mahadi@gmail.com',
      department: 'BT',
      mobile: '+94234234234',
    },
    {
      id: 'ENG',
      name: 'Avishka ',
      email: 'avishka@gmail.com',
      department: 'ENG',
      mobile: '+94234234234',
    },
  ];

  return (
    <Container maxW='100%' centerContent={true}>
      <VStack w='90%' alignItems='stretch' mt={5}>
        <HStack>
          <Heading as='h1' size='lg'>
            User Management
          </Heading>
          <Spacer />
          <Button
            leftIcon={<FaPlus />}
            colorScheme='blue'
            size='sm'
            variant='solid'>
            ADD
          </Button>
        </HStack>
        <CustomTable cols={cols} rows={rows} />
      </VStack>
    </Container>
  );
};

export default User;

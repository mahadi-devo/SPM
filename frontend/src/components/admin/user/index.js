import React, { useState, useContext, useEffect } from 'react';

import {
  Container,
  Spacer,
  VStack,
  HStack,
  Heading,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Box,
  Flex,
} from '@chakra-ui/react';

import { FaPlus } from 'react-icons/fa';
import { DeleteIcon, SearchIcon, EditIcon } from '@chakra-ui/icons';

import CustomTable from '../../shared/customTable';
import DeleteModal from '../../shared/deleteModal';

import { Link, useRouteMatch } from 'react-router-dom';

import UserContext from '../../../context/admin/user/userContext';

const User = () => {
  const { url } = useRouteMatch();

  const userContext = useContext(UserContext);
  const { users, getUser } = userContext;

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  console.log(users);

  const [isOpenDelete, setIsOpen] = useState(false);
  const onCloseDelete = () => setIsOpen(false);

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

      render: (data) => {
        return data.email;
      },
    },
    {
      title: 'Department',
      render: (data) => {
        return data.department;
      },
    },
    {
      title: 'Mobile',
      render: (data) => {
        return data.mobile;
      },
    },
    {
      title: ' Actions ',
      render: (data) => {
        return (
          <HStack w='50%'>
            <Spacer />
            <EditIcon fontSize='1xl' cursor='pointer' color='#4299e1' />
            <Spacer />
            <DeleteIcon
              fontSize='1xl'
              cursor='pointer'
              onClick={() => setIsOpen(true)}
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
      <VStack w='100%' alignItems='stretch' mt={5}>
        <Flex>
          <Box>
            <Heading as='h1' size='lg'>
              User Management
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <HStack mb={8}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon color='gray.300' />}
                />
                <Input size='sm' w='20vw' placeholder='Search' />
              </InputGroup>

              <Link to={`${url}/add`}>
                <Button
                  leftIcon={<FaPlus />}
                  colorScheme='blue'
                  size='sm'
                  variant='solid'>
                  ADD
                </Button>
              </Link>
            </HStack>
          </Box>
        </Flex>
      </VStack>

      <CustomTable
        headColor='white'
        colorScheme={'blackAlpha'}
        cols={cols}
        rows={users}
      />

      <DeleteModal
        isOpenDelete={isOpenDelete}
        onCloseDelete={onCloseDelete}
        title='User'
        subTitle="Are you sure? You can't undo this action afterwards."
      />
    </Container>
  );
};

export default User;

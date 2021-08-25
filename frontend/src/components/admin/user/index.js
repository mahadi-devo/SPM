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
  Box,
  Flex,
  Tooltip,
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

  console.log('My users', users);
  console.log('My users2', users);

  // users.map((user) => {
  //   console.log(user);
  // });

  const [isOpenDelete, setIsOpen] = useState(false);
  const onCloseDelete = () => setIsOpen(false);

  const cols = [
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
            <Tooltip hasArrow label='Edit' fontSize='md' placement='top'>
              <EditIcon fontSize='1xl' cursor='pointer' color='#4299e1' />
            </Tooltip>

            <Spacer />
            <Tooltip hasArrow label='Delete' fontSize='md' placement='top'>
              <DeleteIcon
                fontSize='1xl'
                cursor='pointer'
                onClick={() => setIsOpen(true)}
                color='red'
              />
            </Tooltip>
          </HStack>
        );
      },
    },
  ];

  const rowss = [
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
        rows={rowss}
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

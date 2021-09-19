import React, { useState, useContext, useEffect, useRef } from 'react';

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
  Center,
  Text,
  Select,
} from '@chakra-ui/react';

import { FaPlus } from 'react-icons/fa';
import {
  DeleteIcon,
  SearchIcon,
  EditIcon,
  DownloadIcon,
} from '@chakra-ui/icons';

import CustomTable from '../../shared/customTable';
import DeleteModal from '../../shared/deleteModal';

import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import UserContext from '../../../context/admin/user/userContext';

const User = () => {
  const { url } = useRouteMatch();
  const history = useHistory();

  const userContext = useContext(UserContext);
  const { users, getUser, deleteUser } = userContext;
  const currentUser = useRef('');
  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const [isOpenDelete, setIsOpen] = useState(false);
  const onCloseDelete = () => setIsOpen(false);

  const HandelDelete = (id) => {
    currentUser.current = id;
    setIsOpen(true);
  };

  const onDelete = (id) => {
    console.log('On delete', id);
    deleteUser(id);
    setIsOpen(false);
  };

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
              <EditIcon
                fontSize='1xl'
                onClick={() => history.push(`${url}/edit/${data._id}`)}
                cursor='pointer'
                color='#6C63FF'
              />
            </Tooltip>

            <Spacer />
            <Tooltip hasArrow label='Delete' fontSize='md' placement='top'>
              <DeleteIcon
                fontSize='1xl'
                cursor='pointer'
                onClick={() => HandelDelete(data._id)}
                color='red'
              />
            </Tooltip>
          </HStack>
        );
      },
    },
  ];

  return (
    <Container maxW='100%' centerContent={true}>
      <VStack w='100%' alignItems='stretch' mt={5}>
        <Flex px={5}>
          <Box>
            <Heading as='h4' size='lg'>
              User Management{' '}
              <Button
                leftIcon={<DownloadIcon />}
                colorScheme='blue'
                size='sm'
                _hover={{
                  boxShadow: '2xl',
                }}
                bg='#6C63FF'>
                Import
              </Button>
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <HStack mb={8}>
              {/*<InputGroup>*/}
              {/*  <InputLeftElement*/}
              {/*    pointerEvents='none'*/}
              {/*    children={<SearchIcon color='gray.300' />}*/}
              {/*  />*/}
              {/*  <Input size='sm' w='20vw' placeholder='Search' />*/}
              {/*</InputGroup>*/}

              <Link to={`${url}/add`}>
                <Button
                  leftIcon={<FaPlus />}
                  colorScheme='blue'
                  size='sm'
                  _hover={{
                    boxShadow: '2xl',
                  }}
                  bg='#6C63FF'>
                  ADD
                </Button>
              </Link>
            </HStack>
          </Box>
        </Flex>
        <HStack px='5' pb='5'>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              size='sm'
              height='30px'
              children={<SearchIcon color='gray.300' />}
            />
            <Input size='sm' w='20vw' placeholder='Search' />
          </InputGroup>
          <Spacer />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Center w='200px'>
              <Text size='xs'>Sort By</Text>
            </Center>
            <Select variant='outline' placeholder='Select' size='sm'>
              <option value='Department'>Ascending</option>
              <option value='Manager'>Descending</option>
            </Select>
            <Spacer />
            <Center w='200px'>
              <Text size='sm'>Order By</Text>
            </Center>
            <Select variant='outline' placeholder='Select' size='sm'>
              <option value='Department'>Username</option>
              <option value='Manger'>Department</option>
            </Select>
          </div>
        </HStack>
      </VStack>

      <CustomTable
        headColor='white'
        colorScheme={'blackAlpha'}
        cols={cols}
        rows={users}
      />

      <DeleteModal
        isOpenDelete={isOpenDelete}
        onDelete={() => onDelete(currentUser.current)}
        onCloseDelete={onCloseDelete}
        title='User'
        subTitle="Are you sure? You can't undo this action afterwards."
      />
    </Container>
  );
};

export default User;

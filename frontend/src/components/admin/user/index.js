import { useState, useRef } from 'react';

import {
  Container,
  Spacer,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';

import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDisclosure } from '@chakra-ui/react';

import CustomTable from '../../shared/customTable';
import DeleteModal from '../../shared/deleteModal';

const User = () => {
  //const { isOpen, onOpen, onClose } = useDisclosure();

  const [isOpenDelete, setIsOpen] = useState(false);
  const onCloseDelete = () => setIsOpen(false);

  const cancelRef = useRef();

  const HandelEdit = (id) => {
    console.log('clicked edit on ', id);
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
            <FaEdit
              fontSize='4xl'
              cursor='pointer'
              onClick={() => HandelEdit(data.id)}
              color='#4299e1'
            />
            <Spacer />
            <FaTrashAlt
              fontSize='4xl'
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
      <VStack w='90%' alignItems='stretch' mt={5}>
        <HStack mb={8}>
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
        <CustomTable
          headColor='white'
          colorScheme={'blackAlpha'}
          cols={cols}
          rows={rows}
        />
      </VStack>

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

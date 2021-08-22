import React, { Fragment, useState, useRef } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Spacer,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import CustomTable from '../../shared/customTable';
import ViewTicket from './ViewTicket';

const TicketHistory = () => {
  let history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [editTicket, setEditTicket] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();
  const HandelEdit = (id) => {
    console.log('clicked edit on ', id);
    // history.push(`/ticket/${id}`);
    setEditTicket(true);
  };

  const HandelDelete = (id) => {
    console.log('clicked delete on ', id);
    setIsOpen(true);
  };

  const cols = [
    {
      title: 'Ref No',
      render: (data) => {
        return data.id;
      },
    },
    {
      title: 'Name',
      render: (data) => {
        return data.name;
      },
    },
    {
      title: 'Subject',
      // isNumeric: true,
      render: (data) => {
        return data.subject;
      },
    },
    {
      title: 'Status',
      // isNumeric: true,
      render: (data) => {
        return data.status;
      },
    },
    {
      title: 'Actions',
      // isNumeric: true,
      render: (data) => {
        return (
          <HStack w='50%'>
            <EditIcon
              color='#6C63FF'
              w={5}
              h={5}
              cursor='pointer'
              onClick={() => HandelEdit(data.id)}
            />
            <Spacer />
            <DeleteIcon
              color='#C10707'
              w={5}
              h={5}
              cursor='pointer'
              onClick={() => HandelDelete(data.id)}
            />
          </HStack>
        );
      },
    },
  ];

  const rows = [
    {
      id: '12345',
      name: 'Pasindu Jayawardena ',
      subject: 'PC is not responding',
      status: 'Pending',
    },
    {
      id: '6789',
      name: 'Mahadi Hassan',
      subject: 'Display is not working',
      status: 'Closed',
    },
    {
      id: '3055',
      name: 'Aflal Ahmed',
      subject: 'Printer is not working',
      status: 'Open',
    },
    {
      id: '5584',
      name: 'Avishka shyaman ',
      subject: 'Coffee machine is not working',
      status: 'Pending',
    },
  ];

  const pull_data = (data) => {
    console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
    setEditTicket(false);
  };

  return (
    // <div style={{ borderWidth: '1px', borderRadius: '12px' }}>
    //   <Table variant='simple'>
    //     <Thead>
    //       <Tr>
    //         <Th bg='gray.300' style={{ borderTopLeftRadius: '12px' }}>
    //           Ref No
    //         </Th>
    //         <Th bg='gray.300'>Name</Th>
    //         <Th bg='gray.300'>Subject</Th>
    //         <Th bg='gray.300'>Status</Th>
    //         <Th bg='gray.300' style={{ borderTopRightRadius: '12px' }}>
    //           Action
    //         </Th>
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       <Tr>
    //         <Td>inches</Td>
    //         <Td>millimetres (mm)</Td>
    //         <Td>PC is not responding</Td>
    //         <Td>Open</Td>
    //         <Td>
    //           <EditIcon color='#6C63FF' w={5} h={5} />{' '}
    //           <DeleteIcon color='#C10707' w={5} h={5} ml='2' />{' '}
    //         </Td>
    //       </Tr>
    //       <Tr>
    //         <Td>feet</Td>
    //         <Td>centimetres (cm)</Td>
    //         <Td>Mouse is not working</Td>
    //         <Td>Closed</Td>
    //         <Td>
    //           <EditIcon color='#6C63FF' w={5} h={5} />{' '}
    //           <DeleteIcon color='#C10707' w={5} h={5} ml='2' />{' '}
    //         </Td>
    //       </Tr>
    //       <Tr>
    //         <Td>yards</Td>
    //         <Td>metres (m)</Td>
    //         <Td>Web cam is not working</Td>
    //         <Td>Pending</Td>
    //         <Td>
    //           <EditIcon color='#6C63FF' w={5} h={5} />{' '}
    //           <DeleteIcon color='#C10707' w={5} h={5} ml='2' />{' '}
    //         </Td>
    //       </Tr>
    //     </Tbody>
    //     <Tfoot>
    //       <Tr>
    //         <Td>yards</Td>
    //         <Td>metres (m)</Td>
    //         <Td>Web cam is not working</Td>
    //         <Td>Pending</Td>
    //         <Td>
    //           <EditIcon color='#6C63FF' w={5} h={5} />{' '}
    //           <DeleteIcon color='#C10707' w={5} h={5} ml='2' />{' '}
    //         </Td>
    //       </Tr>
    //     </Tfoot>
    //   </Table>
    // </div>
    <Fragment>
      {editTicket ? (
        <ViewTicket func={pull_data} />
      ) : (
        <div style={{ borderWidth: '1px', borderRadius: '12px' }}>
          <CustomTable cols={cols} rows={rows} />
        </div>
      )}

      <div>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Customer
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure? You can't undo this action afterwards.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme='red' onClick={onClose} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
    </Fragment>
  );
};

export default TicketHistory;

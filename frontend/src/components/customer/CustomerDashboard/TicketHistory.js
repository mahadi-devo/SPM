import React, {
  Fragment,
  useState,
  useRef,
  useContext,
  useEffect,
} from 'react';
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
import customerContext from '../../../context/customer/customerContext';

const TicketHistory = () => {
  const CustomerContext = useContext(customerContext);

  const { tickets, getTickets } = CustomerContext;

  useEffect(() => {
    getTickets();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [editTicket, setEditTicket] = useState(false);
  const [ticket, setTicket] = useState('');

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const HandelEdit = (id) => {
    console.log('clicked edit on ', id);
    const x = tickets.filter((ticket) => {
      return ticket._id === id;
    });

    setTicket(x[0]);
    console.log('huhhuhuhu', ticket);
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
        return data._id;
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
              onClick={() => HandelEdit(data._id)}
            />
            <Spacer />
            <DeleteIcon
              color='#C10707'
              w={5}
              h={5}
              cursor='pointer'
              onClick={() => HandelDelete(data._id)}
            />
          </HStack>
        );
      },
    },
  ];

  const pull_data = (data) => {
    setTicket(null);
    setEditTicket(false);
  };

  return (
    <Fragment>
      {editTicket ? (
        <ViewTicket ticket={ticket} func={pull_data} />
      ) : (
        <div style={{ borderWidth: '1px', borderRadius: '12px' }}>
          <CustomTable cols={cols} rows={tickets} />
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

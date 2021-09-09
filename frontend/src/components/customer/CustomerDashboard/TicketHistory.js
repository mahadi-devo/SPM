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
  InputGroup,
  InputLeftElement,
  Input,
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
import { DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import CustomTable from '../../shared/customTable';
import ViewTicket from './ViewTicket';
import customerContext from '../../../context/customer/customerContext';

const TicketHistory = () => {
  const CustomerContext = useContext(customerContext);

  const { tickets, getTickets, removeLoaded } = CustomerContext;

  useEffect(() => {
    getTickets();
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [editTicket, setEditTicket] = useState(false);
  const [ticket, setTicket] = useState('');

  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  const HandelEdit = (id) => {
    const x = tickets.filter((ticket) => {
      return ticket._id === id;
    });

    setTicket(x[0]);
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
    removeLoaded();
  };

  return (
    <Fragment>
      {editTicket ? (
        <ViewTicket ticket={ticket} func={pull_data} />
      ) : (
        <Fragment>
          <InputGroup
            style={{
              marginBottom: '20px',
              width: '250px',
              marginLeft: 'auto',
              marginRight: '0',
            }}>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' />}
            />
            <Input type='tel' placeholder='Search Ticket' />
          </InputGroup>
          <div style={{ borderWidth: '1px', borderRadius: '12px' }}>
            <CustomTable cols={cols} rows={tickets} />
          </div>
        </Fragment>
      )}

      <div>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                Delete Ticket
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

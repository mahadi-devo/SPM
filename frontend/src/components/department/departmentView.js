import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Stack,
  VStack,
  HStack,
  Box,
  Heading,
  Spacer,
  IconButton,
  Input,
  Textarea,
  Text,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Center,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { find } from 'lodash';
import departmentContext from '../../context/department/departmentContext';
import DeleteModal from '../shared/deleteModal';
import DepartmentForm from './departmentForm';

function DepartmentView(props) {
  const history = useHistory();
  const { depatments, getDeartment, deleteDeparment } = useContext(departmentContext);

  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  
  const department = find(depatments, department => department._id === props.match.params.id);

  const validationSchema = Yup.object().shape({
    departmentId: Yup.string().required('Department ID is required!'),
    departmentName: Yup.string().required('Department Name is required!'),
    manager: Yup.string().required('Manager is required'),
  });

  const onCloseDelete = () => setIsOpenDelete(false);

  const onDelete = () => {
    deleteDeparment(props.match.params.id);
    setIsOpenDelete(false);
    history.goBack();
  }

  useEffect(() => {
    getDeartment();
  }, []);

  return (
    <Container maxW="100%" centerContent={true}>
      <Stack w="80%" alignItems="stretch">
        <HStack>
          <Heading as="h4" size="lg">
            Department Details
          </Heading>
          <Spacer />
          <IconButton
            variant="ghost"
            colorScheme="blue"
            aria-label="Back"
            fontSize="20px"
            isRound
            icon={<FaArrowLeft />}
            onClick={history.goBack}
          />
          <Button colorScheme="blue" size="sm" onClick={() => setIsUpdate(!isUpdate)}>
            {isUpdate ? 'View' : 'Update'}
          </Button>
          <Button colorScheme="red" size="sm" onClick={() => setIsOpenDelete(true)}>
            Delete
          </Button>
        </HStack>
        <Center>
          <Box width={{ base: '100%', sm: '100%', md: '100%' }}>
            <DepartmentForm initialValues={department} update={isUpdate}/>
          </Box>
        </Center>
        <Center>
          <Box mt={4} p={5} shadow="md" width="100%" borderWidth="1px">
           <Heading fontSize="xl">User list</Heading>
           <Text >here are all the users belogs to this department</Text>
           <Box mt={4} pl={5}>
             <Text >User name one</Text>
             <Text >User name one</Text>
             <Text >User name one</Text>
           </Box>
          </Box>
        </Center>
      </Stack>
      <DeleteModal
        isOpenDelete={isOpenDelete}
        onDelete = {onDelete}
        onCloseDelete={onCloseDelete}
        title="Deparment"
        subTitle="Are you sure? You can't undo this action afterwards."
      />
    </Container>
  );
}

export default DepartmentView;

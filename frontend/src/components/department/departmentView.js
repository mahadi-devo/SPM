import React, { useContext } from 'react';
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
import departmentContext from '../../context/department/departmentContext';

function DepartmentView() {
  const history = useHistory();
  const { addDeparment } = useContext(departmentContext);

  const validationSchema = Yup.object().shape({
    departmentId: Yup.string().required('Department ID is required!'),
    departmentName: Yup.string().required('Department Name is required!'),
    manager: Yup.string().required('Manager is required'),
  });

  return (
    <Container maxW="100%" centerContent={true}>
      <Stack w="80%" alignItems="stretch">
        <HStack>
          <Heading as="h1" size="xl">
            Create Details
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
          <Button colorScheme="blue">Update</Button>
          <Button colorScheme="red">Delete</Button>
        </HStack>
        <Center>
        <Box width={{ base: "100%", sm: "100%", md: "90%" }}>
          <Formik
            initialValues={{
              departmentId: 'SE',
              departmentName: 'Software Engineering',
              manager: 'Aruna Lakruwan',
              desctiption: 'Software engineering is the discipline of designing, creating and maintaining software by applying technologies and practices from computer science, project management, engineering, application domains, interface design, digital assets management and other fields.',
            }}
            onSubmit={(values, actions) => {
              console.log(values, actions);
              addDeparment(values);
            }}
          >
            {(formik) => (
              <Form>
                <Box fontSize="lg" mt="8">
                  <Field name="departmentId">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.departmentId && form.touched.departmentId
                        }
                        isRequired
                      >
                        <FormLabel htmlFor="departmentId">
                          Department ID
                        </FormLabel>
                        <Input
                          {...field}
                          id="departmentId"
                          placeholder="eg :- IT"
                          isReadOnly
                        />
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box fontSize="lg" mt="5">
                  <Field name="departmentName">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.departmentName &&
                          form.touched.departmentName
                        }
                      >
                        <FormLabel htmlFor="departmentName">
                          Department Name
                        </FormLabel>
                        <Input
                          {...field}
                          id="departmentName"
                          placeholder="Enter Name Here"
                          isReadOnly
                        />
                        <FormErrorMessage>
                          {form.errors.departmentName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box fontSize="lg" mt="5">
                  <Field name="manager">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.manager && form.touched.manager}
                        isReadOnly
                      >
                        <FormLabel htmlFor="manager">Manager</FormLabel>
                        <Input {...field} id="manager" placeholder="John Doe" isReadOnly />
                        <FormErrorMessage>{form.errors.manager}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box fontSize="lg" mt="5">
                  <Field name="desctiption">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="desctiption">Desctiption</FormLabel>
                        <Textarea
                          {...field}
                          id="manager"
                          placeholder="John Doe"
                          isReadOnly
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </Form>
            )}
          </Formik>
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
    </Container>
  );
}

export default DepartmentView;

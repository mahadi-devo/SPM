import React, { Fragment, useState, useContext, useEffect } from 'react';
import {
  Flex,
  Spacer,
  Center,
  Text,
  Box,
  Square,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  toast,
  useColorModeValue,
  useToast,
  Button,
  Textarea,
  Image,
  Select,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { TicketSchema } from './ticketSchema';
import FileUploader from '../../shared/FileUpload';
import customerContext from '../../../context/customer/customerContext';
import departmentContext from '../../../context/department/departmentContext';

const Ticket = () => {
  const CustomerContext = useContext(customerContext);

  const DepartmentContext = useContext(departmentContext);

  const { addTicket, loading, sucess } = CustomerContext;

  const { getDeartment, depatments } = DepartmentContext;

  const toast = useToast();

  useEffect(() => {
    if (sucess) {
      toast({
        title: 'Ticket Created Successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    getDeartment();
    // eslint-disable-next-line
  }, [sucess]);

  const [file, setFile] = useState('');

  const getFile = (FileData) => {
    const reader = new FileReader();
    if (FileData !== null) {
      if (FileData.size > 1000000 || FileData.size === 0) {
        toast({
          title: 'Invalid File Size',
          description: 'File size exceed the maximum size',
          status: 'warning',
          duration: 7000,
          isClosable: true,
        });
      } else {
        reader.readAsDataURL(FileData);
        reader.onloadend = () => {
          setFile(reader.result);
        };
        reader.onerror = () => {
          console.error('AHHHHHHHH!!');
        };
      }
    }
  };

  const submitHandler = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await addTicket({
        name: values.name,
        email: values.email,
        department: values.department,
        subject: values.subject,
        message: values.message,
        file: file,
      });
      resetForm({});
    } catch (error) {}
  };
  return (
    <Fragment>
      <Flex>
        <Box flex='1'>
          <Flex minH={'100vh'} align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'}>
              <Stack align={'center'}>
                <Heading fontSize='3xl' color={'gray.600'}>
                  Create Ticket
                </Heading>
              </Stack>
              <Box rounded={'lg'} width={'450px'}>
                <Formik
                  initialValues={{ name: '', email: '', password: '' }}
                  validationSchema={TicketSchema}
                  onSubmit={(values, actions) => {
                    submitHandler(values, actions);
                  }}>
                  {({ props, values }) => (
                    <Form>
                      <Stack spacing={4}>
                        <Field name='name'>
                          {({ field, form, values }) => (
                            <FormControl
                              isInvalid={form.errors.name && form.touched.name}
                              isRequired>
                              <FormLabel htmlFor='name'>Name</FormLabel>
                              <Input
                                borderColor='#707070'
                                {...field}
                                id='name'
                                placeholder='John Doe'
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='email'>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
                              isRequired>
                              <FormLabel htmlFor='Email'>Email</FormLabel>
                              <Input
                                borderColor='#707070'
                                {...field}
                                id='email'
                                placeholder='john@gmail.com'
                              />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name='department'>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.department &&
                                form.touched.department
                              }
                              isRequired>
                              <FormLabel htmlFor='department'>
                                Department
                              </FormLabel>
                              <Select
                                borderColor='#707070'
                                {...field}
                                id='department'
                                value={values.department || ''}
                                placeholder='Department'>
                                {/* <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option> */}
                                {depatments.map((item) => (
                                  <option value={item._id}>
                                    {item.departmentName}
                                  </option>
                                ))}
                              </Select>
                              <FormErrorMessage>
                                {form.errors.department}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name='subject'>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.subject && form.touched.subject
                              }
                              isRequired>
                              <FormLabel htmlFor='subject'>Subject</FormLabel>
                              <Input
                                borderColor='#707070'
                                {...field}
                                id='subject'
                                value={values.subject || ''}
                                placeholder='Subject'
                              />
                              <FormErrorMessage>
                                {form.errors.subject}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name='message'>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.message && form.touched.message
                              }
                              isRequired>
                              <FormLabel htmlFor='message'>Message</FormLabel>
                              <Textarea
                                borderColor='#707070'
                                {...field}
                                id='message'
                                placeholder='message'
                                value={values.message || ''}
                              />
                              <FormErrorMessage>
                                {form.errors.message}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <FormLabel>Attach file</FormLabel>
                        <FileUploader
                          noOfFiles='1'
                          multiple={false}
                          input='Upload Your Resource Here'
                          getFileCallback={getFile}
                        />
                      </Stack>
                      <Stack spacing={10} pt={8}>
                        <Button
                          bg='#6C63FF'
                          color={'white'}
                          _hover={{
                            bg: 'teal.500',
                          }}
                          loadingText='Saving'
                          spinnerPlacement='start'
                          isLoading={loading}
                          type='submit'>
                          Submit
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Stack>
          </Flex>
        </Box>
        <Square flex='1'>
          <Box boxSize='lg'>
            {/* <Image src='../../../../public/ticketbg.png' /> */}
            <Image src='./ticketbg.png' mt='10' />
          </Box>
        </Square>
      </Flex>
    </Fragment>
  );
};

export default Ticket;

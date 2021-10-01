import React, { useEffect, useContext } from 'react';
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
import axios from 'axios';

import { Formik, Form, Field } from 'formik';
import { TicketSchema } from './ticketSchema';
import customerContext from '../../../context/customer/customerContext';
import { saveAs } from 'file-saver';

import { DownloadIcon, ArrowBackIcon } from '@chakra-ui/icons';

const ViewTicket = ({ match, func, ticket }) => {
  const CustomerContext = useContext(customerContext);

  const { getviewTicket, loadedTicket, closeTicket } = CustomerContext;
  const toast = useToast();
  useEffect(() => {
    getviewTicket(ticket._id);
  }, []);

  const createAndDownloadPdf = () => {
    axios
      .post('http://localhost:5000/api/v1/ticket/generate-report', loadedTicket)
      .then(() =>
        axios.post('http://localhost:5000/api/v1/ticket/fetch-report', {
          responseType: 'blob',
        })
      )
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'newPdf.pdf');
      });
  };

  // const { name, email, status, subject, department, message } = loadedTicket;

  const submitHandler = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };
  return (
    <div>
      <Button
        style={{ marginLeft: '50px', marginBottom: '20px' }}
        leftIcon={<ArrowBackIcon />}
        onClick={() => {
          func('hello');
        }}>
        Back
      </Button>
      <Flex justifyContent='space-between' px={'50'}>
        <Box>
          {loadedTicket !== null && (
            <Flex minH={'100vh'}>
              <Stack spacing={8} mx={'auto'} maxW={'lg'}>
                <Box rounded={'lg'} width={'500px'} bg>
                  <Formik
                    initialValues={{
                      name: loadedTicket.name,
                      email: loadedTicket.email,
                      subject: loadedTicket.subject,
                      message: loadedTicket.message,
                      department: loadedTicket.department.departmentName,
                    }}
                    validationSchema={TicketSchema}
                    onSubmit={(values, actions) => {
                      submitHandler(values, actions);
                    }}>
                    {(props, values) => (
                      <Form>
                        <Stack spacing={4}>
                          <Field name='name'>
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                                isRequired>
                                <FormLabel htmlFor='name'>Name</FormLabel>
                                <Input
                                  borderColor='#707070'
                                  {...field}
                                  id='name'
                                  placeholder='John Doe'
                                  isDisabled
                                  bg='gray.300'
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
                                  isDisabled
                                  bg='gray.300'
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
                                <Input
                                  borderColor='#707070'
                                  {...field}
                                  isDisabled
                                  id='department'
                                  placeholder='Department'
                                  bg='gray.300'
                                />

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
                                  isDisabled
                                  {...field}
                                  id='subject'
                                  placeholder='Subject'
                                  bg='gray.300'
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
                                  isDisabled
                                  borderColor='#707070'
                                  {...field}
                                  id='message'
                                  placeholder='message'
                                  bg='gray.300'
                                />
                                <FormErrorMessage>
                                  {form.errors.message}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>

                          <Field name='reply'>
                            {({ field, form }) => (
                              <FormControl>
                                <FormLabel htmlFor='message'>Reply</FormLabel>
                                <Textarea
                                  borderColor='#707070'
                                  {...field}
                                  id='message'
                                  placeholder='Reply'
                                />
                              </FormControl>
                            )}
                          </Field>
                        </Stack>
                        <Stack spacing={10} pt={8}>
                          <Button
                            bg='#6C63FF'
                            color={'white'}
                            _hover={{
                              bg: 'teal.500',
                            }}
                            isLoading={props.isSubmitting}
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
          )}
        </Box>
        <Box w='400px' style={{ textAlign: 'right' }}>
          {loadedTicket !== null && (
            <>
              <Heading as='h6' size='xs'>
                REF: {loadedTicket._id}
              </Heading>
              <Heading as='h6' size='xs' style={{ marginTop: '4px' }}>
                Created Date: {loadedTicket.created_at.split('T')[0]}
              </Heading>
              <Heading as='h6' size='xs' style={{ marginTop: '4px' }}>
                Last Updated: {loadedTicket.updated_at.split('T')[0]}
              </Heading>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  lineHeight: '1.2',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}>
                <Heading as='h5' size='sm' style={{ marginRight: '3px' }}>
                  Status:
                </Heading>
                <Heading as='h5' size='sm' color='green'>
                  {loadedTicket.status.toUpperCase()}
                </Heading>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}>
                <Button
                  bg='#B22222'
                  size='md'
                  _hover={{
                    bg: 'red',
                  }}
                  onClick={() => {
                    closeTicket(loadedTicket, 1);
                    toast({
                      title: 'Ticket Closed Successfully',
                      status: 'success',
                      duration: 5000,
                      isClosable: true,
                      position: 'top',
                    });
                  }}
                  color={'white'}
                  style={{
                    width: '200px',
                    marginTop: '10px',
                    marginRight: '0',
                    marginLeft: 'auto',
                  }}>
                  CLOSE TICKET
                </Button>
                <Button
                  leftIcon={<DownloadIcon />}
                  style={{
                    width: '200px',
                    marginTop: '10px',
                    marginRight: '0',
                    marginLeft: 'auto',
                  }}
                  onClick={createAndDownloadPdf}
                  colorScheme='teal'
                  variant='solid'>
                  Generate report
                </Button>
              </div>
            </>
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default ViewTicket;

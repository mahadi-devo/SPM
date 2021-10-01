import React, { useEffect, useContext, useState } from 'react';
import {
  Flex,
  Spacer,
  Center,
  Text,
  Box,
  Square,
  FormControl,
  ButtonGroup,
  Editable,
  IconButton,
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
  EditableInput,
  EditablePreview,
  useEditableControls,
} from '@chakra-ui/react';
import axios from 'axios';
import config from '../../../utils/config';
import {
  ArrowBackIcon,
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
} from '@chakra-ui/icons';
import { Spinner } from '@chakra-ui/react';

import { Formik, Form, Field } from 'formik';
import { TicketSchema } from './ticketSchema';
import customerContext from '../../../context/customer/customerContext';
import { saveAs } from 'file-saver';

const ViewTicket = ({ match, func, ticket }) => {
  const CustomerContext = useContext(customerContext);

  // const userId = localStorage.getItem('id');

  const [chats, setChats] = useState([]);
  const [chatEdit, setChatEdit] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('id'));
  const { getviewTicket, loadedTicket, closeTicket } = CustomerContext;
  useEffect(() => {
    setUserId(localStorage.getItem('id'));
    getviewTicket(ticket._id);
  }, []);

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/chat/${loadedTicket._id}`, config);
      await setChats(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChat = async (chat) => {
    try {
      setLoading(true);
      const res = await axios.delete(`/api/v1/chat/${chat._id}`, config);
      await getChats();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const chatSubmitHandler = async (event, chatId) => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `/api/v1/chat/${chatId}`,
        { message: event },
        config
      );
      await getChats();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toast = useToast();
  const submitHandler = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      const res = await axios.post(
        `/api/v1/chat/${loadedTicket._id}`,
        { message: values.reply },
        config
      );
      getChats();
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  const EditableControls = ({ chat }) => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent='end' size='sm' marginBottom='5'>
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '5',
        }}>
        <div>
          <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
        </div>
        <div onClick={(e) => deleteChat(chat)}>
          <IconButton
            style={{ marginLeft: '5px' }}
            size='sm'
            icon={<DeleteIcon />}
            {...getSubmitButtonProps()}
          />
        </div>
      </div>
    );
  };

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

  return (
    <div>
      <Button
        style={{ marginLeft: '150px', marginBottom: '20px' }}
        leftIcon={<ArrowBackIcon />}
        onClick={() => {
          func('hello');
        }}>
        Back
      </Button>
      <Flex justifyContent='space-between' px={'50'}>
        <Box>
          {loadedTicket !== null && (
            <Flex minH={'80vh'}>
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
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Stack>
            </Flex>
          )}
          <div style={{ marginLeft: '110px' }}>
            <Text fontWeight={'600'} mb='10'>
              <ChatIcon /> Conversations
            </Text>
            {loading && <Spinner />}
            {chats.map((c, index) => (
              <Editable
                id={index}
                colorScheme='cyan'
                style={{
                  marginBottom: '20px',
                  width: '500px',
                }}
                textAlign='left'
                defaultValue={c.message}
                onSubmit={(e) => chatSubmitHandler(e, c._id)}
                isPreviewFocusable={false}>
                {c.user && c.user._id === userId && (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                      <b>@{c.user.name} (Me) </b>
                      <EditableControls chat={c} />
                    </div>
                    <EditablePreview
                      bg='cyan.50'
                      style={{
                        width: '500px',
                        minHeight: '50px',
                        padding: '10px',
                        marginTop: '10px',
                      }}></EditablePreview>
                    <EditableInput
                      style={{
                        width: '500px',
                        Height: '200px',
                        padding: '10px',
                      }}
                    />
                  </div>
                )}
                {c.user && c.user._id !== userId && (
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}>
                      <b>@{c.user.name} </b>
                    </div>
                    <EditablePreview
                      bg='gray.50'
                      style={{
                        width: '500px',
                        minHeight: '50px',
                        padding: '10px',
                        marginTop: '10px',
                      }}></EditablePreview>
                  </div>
                )}
              </Editable>
            ))}
            <Formik
              initialValues={{
                reply: '',
              }}
              onSubmit={(values, actions) => {
                submitHandler(values, actions);
              }}>
              {(props, values) => (
                <Form>
                  <Stack spacing={10} pt={8}>
                    <Field name='reply'>
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.message && form.touched.message
                          }
                          isRequired>
                          <FormLabel htmlFor='reply'>Reply</FormLabel>
                          <Textarea
                            width={'500px'}
                            isRequired={true}
                            borderColor='#707070'
                            {...field}
                            id='reply'
                            placeholder='Reply'
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Stack spacing={10} pt={8}>
                    <Button
                      style={{
                        width: '100px',
                        marginLeft: '400px',
                        marginRight: '98px',
                      }}
                      bg='#6C63FF'
                      color={'white'}
                      _hover={{
                        bg: 'teal.500',
                      }}
                      isLoading={props.isSubmitting}
                      type='submit'>
                      Send
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </div>
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

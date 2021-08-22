import React from 'react';
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

const ViewTicket = ({ match, func }) => {
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
        onClick={() => {
          func('hello');
        }}>
        back
      </Button>
      <Flex>
        <Box flex='1'>
          <Flex minH={'100vh'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'}>
              <Box rounded={'lg'} width={'450px'}>
                <Formik
                  initialValues={{ name: '', email: '', password: '' }}
                  validationSchema={TicketSchema}
                  onSubmit={(values, actions) => {
                    submitHandler(values, actions);
                  }}>
                  {(props) => (
                    <Form>
                      <Stack spacing={4}>
                        <Field name='name'>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={form.errors.name && form.touched.name}
                              isRequired>
                              <FormLabel htmlFor='name'>Name</FormLabel>
                              <Input
                                borderColor='#707070'
                                {...field}
                                id='name'
                                placeholder='John Doe'
                                isDisabled
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
                                isDisabled
                                id='department'
                                placeholder='Department'>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
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
                                isDisabled
                                {...field}
                                id='subject'
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
                                isDisabled
                                borderColor='#707070'
                                {...field}
                                id='message'
                                placeholder='message'
                              />
                              <FormErrorMessage>
                                {form.errors.message}
                              </FormErrorMessage>
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
        </Box>
        <Box w='400px' bg='green'></Box>
      </Flex>
    </div>
  );
};

export default ViewTicket;

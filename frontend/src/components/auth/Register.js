import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Select,
  Square,
  Stack,
  Text,
  Textarea,
  toast,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { SignupSchema } from './authSchema';
import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import { useHistory } from 'react-router-dom';

const Register = () => {
  const toast = useToast();
  let history = useHistory();
  const authContext = useContext(AuthContext);
  const { register, error, isAuthenticated } = authContext;

  // if (isAuthenticated) {
  //   toast({
  //     title: "Account created.",
  //     description: "We've created your account for you.",
  //     status: "success",
  //     duration: 1000,
  //     isClosable: true,
  //   });
  // }
  //
  // if (error) {
  //   toast({
  //     title: error,
  //     status: "error",
  //     duration: 5000,
  //     position: "top",
  //     isClosable: true,
  //   });
  // }

  const submitHandler = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      history.push('/customer');
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  return (
    <>
      <Flex>
        <Box flex='1'>
          <Flex minH={'100vh'} align={'center'} justify={'center'}>
            <Stack spacing={10} mx={'auto'} maxW={'lg'}>
              <Stack>
                <Heading fontSize='3xl' color={'gray.600'}>
                  Hello!
                  <br />
                  Create your account
                </Heading>
              </Stack>
              <Box rounded={'lg'} width={'450px'}>
                <Formik
                  initialValues={{ name: '', email: '', password: '' }}
                  validationSchema={SignupSchema}
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
                        <Field name='password'>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                              isRequired>
                              <FormLabel htmlFor='password'>Password</FormLabel>
                              <Input
                                {...field}
                                id='password'
                                placeholder='secret***'
                              />
                              <FormErrorMessage>
                                {form.errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                      <Stack spacing={10} pt={8}>
                        <Button
                          bg={'#6C63FF'}
                          color={'white'}
                          _hover={{
                            boxShadow: 'dark-lg',
                          }}
                          isLoading={props.isSubmitting}
                          type='submit'>
                          Register
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>

              <Text flex={1}>
                Already have an account ?{' '}
                <Link to='/login'>
                  <span style={{ color: '#6C63FF' }}>Login here</span>
                </Link>
              </Text>
            </Stack>
          </Flex>
        </Box>
        <Square flex='1'>
          <Box boxSize='lg'>
            <Image boxSize='580px' src='./register.png' />
          </Box>
        </Square>
      </Flex>
    </>
  );
};

export default Register;

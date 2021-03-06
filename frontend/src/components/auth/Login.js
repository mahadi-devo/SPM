import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  Square,
  Image,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { LoginSchema, SignupSchema } from './authSchema';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
import { AccessRights } from '../shared/accessRights';

const Login = () => {
  const toast = useToast();
  let history = useHistory();
  const authContext = useContext(AuthContext);
  const { error, login, isAuthenticated } = authContext;

  // useEffect(() => {
  //   // if (isAuthenticated) {
  //   //   toast({
  //   //     title: 'Account created.',
  //   //     description: "We've created your account for you.",
  //   //     status: 'success',
  //   //     duration: 1000,
  //   //     isClosable: true,
  //   //   });
  //   //   history.push('/customer');
  //   // }

  //   if (error) {
  //     toast({
  //       title: error,
  //       status: 'error',
  //       duration: 5000,
  //       position: 'top',
  //       isClosable: true,
  //     });
  //   }
  //   // eslint-disable-next-line
  // }, [error, isAuthenticated, history.push]);

  const submitHandler = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      // history.push('/admin/tickets/');
      await login({
        email: values.email,
        password: values.password,
      });

      // history.push('/customer');
      const userRole = JSON.parse(localStorage.getItem('role'));

      if (userRole === AccessRights.user) {
        history.push('/customer');
      } else if (userRole === AccessRights.admin) {
        history.push('/admin');
      } else if (userRole === AccessRights.organizationalUser) {
        history.push('/admin');
      }
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
                  Welcome back
                </Heading>
              </Stack>
              <Box rounded={'lg'} width={'450px'}>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={(values, actions) => {
                    submitHandler(values, actions);
                  }}>
                  {(props) => (
                    <Form>
                      <Stack spacing={4}>
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
                          _hover={{ boxShadow: 'dark-lg' }}
                          isLoading={props.isSubmitting}
                          type='submit'>
                          Login
                        </Button>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>

              <Text flex={1}>
                Don't have an account ?{' '}
                <Link to='/register'>
                  <span style={{ color: '#6C63FF' }}>Create account</span>
                </Link>
              </Text>
            </Stack>
          </Flex>
        </Box>
        <Square flex='1'>
          <Box boxSize='lg'>
            {/* <Image src='../../../../public/ticketbg.png' /> */}
            <Image boxSize='540px' src='./login.png' mt='' />
          </Box>
        </Square>
      </Flex>
    </>
  );
};

export default Login;

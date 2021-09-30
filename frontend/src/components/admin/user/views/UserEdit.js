import React, { useContext } from 'react';
import {
  Container,
  VStack,
  HStack,
  Box,
  Heading,
  Spacer,
  IconButton,
  Input,
  Select,
  Center,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { find } from 'lodash';
import * as Yup from 'yup';

import UserContext from '../../../../context/admin/user/userContext';

function UserEdit(props) {
  const history = useHistory();

  const userContext = useContext(UserContext);

  const { userUpdate, users } = userContext;

  const user = find(users, (user) => user._id === props.match.params.id);

  console.log('🚀 ~ file: UserEdit.js ~ line 34 ~ UserEdit ~ user', user);

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is required!'),
    userEmail: Yup.string().required('User Email is required!'),
    department: Yup.string().required('Department is required!'),
    mobile: Yup.string().required('Mobile is required!'),
    password: Yup.string().required('Password is required!'),
  });

  const submitFrom = (values, actions) => {
    console.log('Hiii');
    userUpdate(values);
    history.push('/admin/users');
  };

  return (
    <Container maxW='100%' centerContent={true}>
      <Center>
        <VStack w='100%' alignItems='stretch'>
          <HStack>
            <Heading as='h1' size='xl'>
              Edit User
            </Heading>
            <Spacer />
            <IconButton
              variant='ghost'
              colorScheme='purple'
              aria-label='Back'
              fontSize='20px'
              isRound
              icon={<FaArrowLeft />}
              onClick={history.goBack}
            />
          </HStack>
          <Formik
            initialValues={{
              id: user._id,
              userName: user.name,
              userEmail: user.email,
              department: user.department,
              mobile: user.mobile,
              password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={submitFrom}>
            {(formik) => (
              <Form>
                <Box fontSize='lg' mt='8' w='30vw'>
                  <Field name='userName'>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.userName && form.touched.userName
                        }
                        isRequired>
                        <FormLabel htmlFor='userName'>User Name</FormLabel>
                        <Input
                          {...field}
                          id='userName'
                          placeholder='Enter User Name'
                        />
                        <FormErrorMessage>
                          {form.errors.userName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box fontSize='lg' mt='5' w='30vw'>
                  <Field name='userEmail'>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.userEmail && form.touched.userEmail
                        }
                        isRequired>
                        <FormLabel htmlFor='userEmail'>Email</FormLabel>
                        <Input
                          {...field}
                          id='userEmail'
                          isReadOnly={true}
                          variant='filled'
                          placeholder='Enter Email'
                        />
                        <FormErrorMessage>
                          {form.errors.userEmail}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box fontSize='lg' mt='5' w='30vw'>
                  <Field name='department'>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.department && form.touched.department
                        }
                        isRequired>
                        <FormLabel htmlFor='department'>Department</FormLabel>
                        <Select
                          {...field}
                          id='department'
                          placeholder='Select Department'>
                          <option value='IT'>IT</option>
                          <option value='BS'>BS</option>
                          <option value='EN'>EN</option>
                          <option value='MS'>MS</option>
                        </Select>
                        <FormErrorMessage>
                          {form.errors.department}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box fontSize='lg' mt='5' w='30vw'>
                  <Field name='mobile'>
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.mobile && form.touched.mobile}
                        isRequired>
                        <FormLabel htmlFor='mobile'>Mobile</FormLabel>
                        <Input
                          {...field}
                          id='mobile'
                          placeholder='Enter Mobile Number'
                        />
                        <FormErrorMessage>
                          {form.errors.mobile}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box fontSize='lg' mt='5' w='30vw'>
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
                          placeholder='Enter Password'
                        />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
                <Box fontSize='lg' mt='5' w='30vw'>
                  <Button
                    width='100%'
                    type='submit'
                    bg='#6C63FF'
                    _hover={{
                      boxShadow: '2xl',
                    }}
                    color='white'>
                    Update
                  </Button>
                </Box>
                <Box fontSize='lg' mt='5' w='30vw'>
                  <Button
                    onClick={() => {}}
                    width='100%'
                    maxW='100%'
                    type='reset'
                    bg='red'
                    _hover={{
                      boxShadow: '2xl',
                    }}
                    color='white'>
                    Reset
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </VStack>
      </Center>
    </Container>
  );
}

export default UserEdit;

import React from 'react';
import {
  Container,
  VStack,
  HStack,
  Box,
  Heading,
  Spacer,
  IconButton,
  Input,
  Textarea,
  Checkbox,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';

function DepartmentAdd() {
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    departmentId: Yup.string().required('Department ID is required!'),
    departmentName: Yup.string().required('Department Name is required!'),
    manager: Yup.string().required('Manager is required'),
  });

  return (
    <Container maxW="100%" centerContent={true}>
      <VStack w="90%" alignItems="stretch">
        <HStack>
          <Heading as="h1" size="xl">
            Create New Department
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
        </HStack>
        <Formik
          initialValues={{
            departmentId: '',
            departmentName: '',
            manager: '',
            desctiption: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log(values, actions);
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
                      />
                      <FormErrorMessage>
                        {form.errors.departmentId}
                      </FormErrorMessage>
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
                      isRequired
                    >
                      <FormLabel htmlFor="departmentName">
                        Department Name
                      </FormLabel>
                      <Input
                        {...field}
                        id="departmentName"
                        placeholder="Enter Name Here"
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
                      isRequired
                    >
                      <FormLabel htmlFor="manager">Manager</FormLabel>
                      <Input {...field} id="manager" placeholder="John Doe" />
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
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Box>
              <Box fontSize="lg" mt="5">
                <Checkbox colorScheme="blue" isChecked={false}>
                  Add Another Department
                </Checkbox>
              </Box>
              <Box fontSize="lg" mt="5">
                <Button width="100%" type="submit" colorScheme="blue">
                  Save
                </Button>
              </Box>
              <Box fontSize="lg" mt="5">
                <Button
                  onClick={() => {}}
                  width="100%"
                  maxW="100%"
                  type="reset"
                  colorScheme="red"
                >
                  Cancle
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </VStack>
    </Container>
  );
}

export default DepartmentAdd;

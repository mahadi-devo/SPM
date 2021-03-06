import React, { useContext } from "react";
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

function DepartmentAdd() {
  const history = useHistory();
  const { addDeparment } = useContext(departmentContext);

  const submitFrom = (values, actions) => {
    addDeparment(values);
    history.push('/admin/departments');
  }

  const validationSchema = Yup.object().shape({
    departmentId: Yup.string().required("Department ID is required!"),
    departmentName: Yup.string().required("Department Name is required!"),
    manager: Yup.string().required("Manager is required"),
  });

  return (
    <Container maxW="100%" centerContent={true}>
      <Stack w="70%" alignItems="stretch">
        <HStack>
          <Heading as="h4" size="lg">
            Create New Department
          </Heading>
          <Spacer />
          <IconButton
            variant="ghost"
            colorScheme="purple"
            aria-label="Back"
            fontSize="20px"
            isRound
            icon={<FaArrowLeft />}
            onClick={history.goBack}
          />
        </HStack>
        <Center>
          <Box width={{ base: "100%", sm: "100%", md: "100%" }}>
            <Formik
              initialValues={{
                departmentId: "",
                departmentName: "",
                manager: "",
                desctiption: "",
              }}
              validationSchema={validationSchema}
              onSubmit={submitFrom}
            >
              {(formik) => (
                <Form>
                  <Box fontSize="lg" mt="8">
                    <Field name="departmentId">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.departmentId &&
                            form.touched.departmentId
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
                          isInvalid={
                            form.errors.manager && form.touched.manager
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="manager">Manager</FormLabel>
                          <Input
                            {...field}
                            id="manager"
                            placeholder="Enter Manager Name Here"
                          />
                          <FormErrorMessage>
                            {form.errors.manager}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                  </Box>
                  <Box fontSize="lg" mt="5">
                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                        >
                          <FormLabel htmlFor="description">
                            Description
                          </FormLabel>
                          <Textarea
                            {...field}
                            id="description"
                            placeholder="Enter Manager Desctiption Here"
                          />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
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
                    <Button
                      width="100%"
                      type="submit"
                      bg="#6C63FF"
                      _hover={{
                        boxShadow: "2xl",
                      }}
                      color="white"
                    >
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
          </Box>
        </Center>
      </Stack>
    </Container>
  );
}

export default DepartmentAdd;

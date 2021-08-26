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
  toast,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import departmentContext from '../../context/department/departmentContext';

function DepartmentAdd() {
  const toast = useToast();
  const history = useHistory();
  const { addDeparment } = useContext(departmentContext);

  const submitFrom = (values, actions) => {
    console.log(values, actions);
    addDeparment(values);
    toast({
      title: "Department created.",
      description: "You have created a new Department.",
      status: "success",
      position: "top-right",
      duration: 1500,
      isClosable: true,
    });
    history.push('/admin/departments');
  }

  const validationSchema = Yup.object().shape({
    departmentId: Yup.string().required("Department ID is required!"),
    departmentName: Yup.string().required("Department Name is required!"),
    manager: Yup.string().required("Manager is required"),
  });

  return (
    <Container maxW="100%" centerContent={true}>
      <Stack w="80%" alignItems="stretch">
        <HStack>
          <Heading as="h4" size="lg" paddingLeft="10">
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
          <Box width={{ base: "100%", sm: "100%", md: "90%" }}>
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
                            placeholder="John Doe"
                          />
                          <FormErrorMessage>
                            {form.errors.manager}
                          </FormErrorMessage>
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
                          <FormLabel htmlFor="desctiption">
                            Desctiption
                          </FormLabel>
                          <Textarea
                            {...field}
                            id="manager"
                            placeholder="John Doe"
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

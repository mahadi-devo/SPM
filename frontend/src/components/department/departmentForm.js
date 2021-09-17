import React from 'react';
import {
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';

const departmentForm = (props) => {
  const { initialValues, update } = props;

  return (
    <Formik
      initialValues={initialValues}
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
                  <FormLabel htmlFor="departmentId">Department ID</FormLabel>
                  <Input
                    {...field}
                    id="departmentId"
                    placeholder="eg :- IT"
                    isReadOnly={update}
                  />
                </FormControl>
              )}
            </Field>
          </Box>
          <Box fontSize="lg" mt="5">
            <Field name="departmentName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.departmentName && form.touched.departmentName
                  }
                >
                  <FormLabel htmlFor="departmentName">
                    Department Name
                  </FormLabel>
                  <Input
                    {...field}
                    id="departmentName"
                    placeholder="Enter Name Here"
                    isReadOnly={!update}
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
                  isReadOnly={!update}
                >
                  <FormLabel htmlFor="manager">Manager</FormLabel>
                  <Input
                    {...field}
                    id="manager"
                    placeholder="John Doe"
                    isReadOnly={!update}
                  />
                  <FormErrorMessage>{form.errors.manager}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>
          <Box fontSize="lg" mt="5">
            <Field name="desctiption">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="desctiption">Desctiption</FormLabel>
                  <Textarea
                    {...field}
                    id="manager"
                    placeholder="John Doe"
                    isReadOnly={!update}
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>
          {update && (
            <>
              <Box fontSize="lg" mt="5">
                <Button
                  width="100%"
                  type="submit"
                  bg="#6C63FF"
                  _hover={{
                    boxShadow: '2xl',
                  }}
                  color="white"
                >
                  Update
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
            </>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default departmentForm;

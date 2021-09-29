import React, {useContext} from 'react';
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
import departmentContext from '../../context/department/departmentContext';

const DepartmentForm = (props) => {
  const { initialValues, update, onCancle } = props;
  const { depatments, getDeartment, updateDeparment } = useContext(departmentContext);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        updateDeparment(values);
        onCancle();
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
            <Field name="description">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="description">Description</FormLabel>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Type department description here"
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
                  onClick={onCancle}
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

export default DepartmentForm;

import React, { useEffect } from "react";
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
  Divider,
  Grid,
  Icon,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { Formik, Form, Field } from "formik";
import { TicketSchema } from "./ticketSchema";
import { ChatIcon } from "@chakra-ui/icons";
import * as Yup from "yup";

const ViewTicket = ({ match, func, ticket }) => {
  useEffect(() => {
    console.log("view", ticket);
  }, []);

  const { name, email, status, subject, department, message } = ticket;

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

  const conversationHandler = async (
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
    <div style={{ paddingLeft: "25px" }}>
      <Button
        onClick={() => {
          func("hello");
        }}
      >
        back
      </Button>
      <Flex>
        <Box>
          <Flex>
            <Stack spacing={8} mx={"auto"} maxW={"lg"}>
              <Box rounded={"lg"} width={"600px"} marginTop={10}>
                <Formik
                  initialValues={{
                    name: name,
                    email: email,
                    subject: subject,
                    message: message,
                    department: department,
                  }}
                  validationSchema={TicketSchema}
                  onSubmit={(values, actions) => {
                    submitHandler(values, actions);
                  }}
                >
                  {(props, values) => (
                    <Form>
                      <Stack spacing={4}>
                        <Field name="name">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={form.errors.name && form.touched.name}
                              isRequired
                            >
                              <FormLabel htmlFor="name">Name</FormLabel>
                              <Input
                                borderColor="#707070"
                                {...field}
                                id="name"
                                placeholder="John Doe"
                                isDisabled
                              />
                              <FormErrorMessage>
                                {form.errors.name}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="email">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
                              isRequired
                            >
                              <FormLabel htmlFor="Email">Email</FormLabel>
                              <Input
                                borderColor="#707070"
                                {...field}
                                id="email"
                                placeholder="john@gmail.com"
                                isDisabled
                              />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="department">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.department &&
                                form.touched.department
                              }
                              isRequired
                            >
                              <FormLabel htmlFor="department">
                                Department
                              </FormLabel>
                              <Select
                                borderColor="#707070"
                                {...field}
                                isDisabled
                                id="department"
                                placeholder="Department"
                              >
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                              </Select>
                              <FormErrorMessage>
                                {form.errors.department}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="subject">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.subject && form.touched.subject
                              }
                              isRequired
                            >
                              <FormLabel htmlFor="subject">Subject</FormLabel>
                              <Input
                                borderColor="#707070"
                                isDisabled
                                {...field}
                                id="subject"
                                placeholder="Subject"
                              />
                              <FormErrorMessage>
                                {form.errors.subject}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>

                        <Field name="message">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.message && form.touched.message
                              }
                              isRequired
                            >
                              <FormLabel htmlFor="message">Message</FormLabel>
                              <Textarea
                                isDisabled
                                borderColor="#707070"
                                {...field}
                                id="message"
                                placeholder="message"
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
                          bg="#6C63FF"
                          color={"white"}
                          _hover={{
                            bg: "teal.500",
                          }}
                          isLoading={props.isSubmitting}
                          type="submit"
                        >
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
        <Box></Box>
      </Flex>
      <Divider padding={5} marginBottom={5} />
      <Flex marginBottom={3}>
        <Icon as={ChatIcon} w={6} h={6} />
        <Heading as="h4" size="md" marginLeft={3}>
          Start a conversation
        </Heading>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} minHeight={200}>
        <Box width={"600px"} h="10">
          <Formik
            initialValues={{
              conversation: "hj",
            }}
            validationSchema={Yup.object().shape({
              conversation: Yup.string().required,
            })}
            onSubmit={(values, actions) => {
              conversationHandler(values, actions);
            }}
          >
            {(props, values) => (
              <Form>
                <Field name="conversation">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.message && form.touched.message}
                      isRequired
                    >
                      <Textarea
                        borderColor="#707070"
                        {...field}
                        id="conversation"
                        placeholder="conversation"
                      />
                      <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                  }}
                >
                  <Button
                    bg="#6C63FF"
                    color={"white"}
                    _hover={{
                      bg: "teal.500",
                    }}
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </div>
  );
};

export default ViewTicket;

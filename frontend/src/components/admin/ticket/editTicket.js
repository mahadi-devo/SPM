import React, {useContext, useEffect, useState} from "react";
import customerContext from "../../../context/customer/customerContext";
import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Textarea,
  toast,
  useEditableControls,
  useToast,
} from "@chakra-ui/react";
import {
  ArrowBackIcon,
  ChatIcon,
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  DownloadIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import { TicketSchema } from "../../customer/CustomerDashboard/ticketSchema";
import { useHistory, useLocation } from "react-router-dom";
import ticketContext from "../../../context/admin/ticket/ticketContext";

const EditTicket = () => {
  const location = useLocation();
  const history = useHistory();
  const data = location.state;
  const [demo, setDemo] = useState(false)

  const TicketContext = useContext(ticketContext);

  const { updateTickets } = TicketContext;
  const toast = useToast();

  const submitHandler = async (
    values,
    { setSubmitting, setErrors, setStatus, resetForm }
  ) => {
    try {
      console.log(values)
      const replyMsg = values.reply;

      const msgBody = {
        message: replyMsg,
        ticketId: data._id,
      };
      await updateTickets(msgBody);
      toast({
        title: "Message Sent",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setDemo(true);
      resetForm({});
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
      setSubmitting(false);
      setErrors({ submit: error.message });
    }
  };

  const EditableControls = () => {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="end" size="sm" marginBottom="5">
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "5",
        }}
      >
        <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
        <IconButton
          style={{ marginLeft: "5px" }}
          size="sm"
          icon={<DeleteIcon />}
          {...getSubmitButtonProps()}
        />
      </div>
    );
  };

  return (
    <div style={{ padding: "15px" }}>
      <div
        style={{
          display: "flex",
          direction: "flex-row",
          justifyContent: "space-between",
        }}
      >
        <Button
          style={{ marginLeft: "110px", marginBottom: "20px" }}
          onClick={() => history.push("/admin/tickets/")}
          leftIcon={<ArrowBackIcon />}
        >
          Back
        </Button>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isOpen}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                bg="#0D6401"
                color="#ffffff"
                _active={{
                  bg: "#0D6401",
                  color: "#ffffff",
                }}
              >
                {isOpen ? data.status.toUpperCase() : data.status.toUpperCase()}
              </MenuButton>
              <MenuList>
                <MenuItem>Pending</MenuItem>
                <MenuItem>On Hold</MenuItem>
                <MenuItem>Resolved</MenuItem>
              </MenuList>
            </>
          )}
        </Menu>
      </div>

      <Flex>
        <Box flex="1">
          {data !== null && (
            <Flex mb={"10"}>
              <Stack spacing={8} mx={"auto"} maxW={"lg"}>
                <Box rounded={"lg"} width={"500px"} bg>
                  <Formik
                    initialValues={{
                      name: data.name,
                      email: data.email,
                      subject: data.subject,
                      message: data.message,
                      department: data.department.departmentName,
                      reply: "",
                    }}
                    validationSchema={TicketSchema}
                  >
                    {(props, values) => (
                      <Form>
                        <Stack spacing={4}>
                          <Field name="name">
                            {({ field, form }) => (
                              <FormControl
                                isInvalid={
                                  form.errors.name && form.touched.name
                                }
                                isRequired
                              >
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Input
                                  borderColor="#707070"
                                  {...field}
                                  id="name"
                                  placeholder="John Doe"
                                  bg="gray.300"
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
                                  bg="gray.300"
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
                                <Input
                                  borderColor="#707070"
                                  {...field}
                                  isDisabled
                                  id="department"
                                  placeholder="Department"
                                  bg="gray.300"
                                />

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
                                  bg="gray.300"
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
                                  bg="gray.300"
                                />
                                <FormErrorMessage>
                                  {form.errors.message}
                                </FormErrorMessage>
                              </FormControl>
                            )}
                          </Field>
                        </Stack>
                      </Form>
                    )}
                  </Formik>
                </Box>
              </Stack>
            </Flex>
          )}
          <div style={{ marginLeft: "119px" }}>
            <Text fontWeight={"600"} mb="10">
              <ChatIcon /> Conversations
            </Text>
            <Editable
              colorScheme="cyan"
              style={{
                marginBottom: "20px",
                width: "500px",
              }}
              textAlign="left"
              defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus️"
              fontSize="sm"
              isPreviewFocusable={false}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <b>@me</b>
                <EditableControls />
              </div>
              <EditablePreview
                bg="gray.50"
                style={{
                  width: "500px",
                  minHeight: "50px",
                  padding: "10px",
                  marginTop: "10px",
                }}
              ></EditablePreview>
              <EditableInput
                style={{ width: "500px", Height: "200px", padding: "10px" }}
              />
            </Editable>
            <Editable
              colorScheme="cyan"
              style={{
                marginBottom: "20px",
                width: "500px",
              }}
              textAlign="left"
              defaultValue="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus️"
              fontSize="sm"
              isPreviewFocusable={false}
            >
              <b>@Pasindu</b>
              <EditablePreview
                bg="cyan.50"
                style={{
                  width: "500px",
                  minHeight: "50px",
                  padding: "10px",
                  marginTop: "10px",
                }}
              ></EditablePreview>
            </Editable>
            { demo && (
                <Editable
                    colorScheme="cyan"
                    style={{
                      marginBottom: "20px",
                      width: "500px",
                    }}
                    textAlign="left"
                    defaultValue="Hi There️"
                    fontSize="sm"
                    isPreviewFocusable={false}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <b>@me</b>
                    <EditableControls />
                  </div>
                  <EditablePreview
                      bg="gray.50"
                      style={{
                        width: "500px",
                        minHeight: "50px",
                        padding: "10px",
                        marginTop: "10px",
                      }}
                  ></EditablePreview>
                  <EditableInput
                      style={{ width: "500px", Height: "200px", padding: "10px" }}
                  />
                </Editable>
            )}

            <Formik
              initialValues={{
                reply: "",
              }}
              onSubmit={(values, actions) => {
                submitHandler(values, actions);
              }}
            >
              {(props, values) => (
                <Form>
                  <Stack spacing={10} pt={8}>
                    <Field name="reply">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.message && form.touched.message
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="reply">Reply</FormLabel>
                          <Textarea
                            width={"500px"}
                            isRequired={true}
                            borderColor="#707070"
                            {...field}
                            id="reply"
                            placeholder="Reply"
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Stack>
                  <Stack spacing={10} pt={8}>
                    <Button
                      style={{
                        width: "100px",
                        marginLeft: "auto",
                        marginRight: "98px",
                      }}
                      bg="#6C63FF"
                      color={"white"}
                      _hover={{
                        bg: "teal.500",
                      }}
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Send
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
        <Box w="400px" style={{ textAlign: "right" }}>
          {data !== null && (
            <>
              <Heading as="h6" size="xs">
                REF: {data._id}
              </Heading>
              <Heading as="h6" size="xs" style={{ marginTop: "4px" }}>
                Created Date: {data.created_at.split("T")[0]}
              </Heading>
              <Heading as="h6" size="xs" style={{ marginTop: "4px" }}>
                Last Updated: {data.updated_at.split("T")[0]}
              </Heading>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  lineHeight: "1.2",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <Heading as="h5" size="sm" style={{ marginRight: "3px" }}>
                  Status:
                </Heading>
                <Heading as="h5" size="sm" color="green">
                  {data.status.toUpperCase()}
                </Heading>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              >
                <Button
                  bg="#B22222"
                  size="md"
                  _hover={{
                    bg: "red",
                  }}
                  color={"white"}
                  style={{
                    width: "200px",
                    marginTop: "10px",
                    marginRight: "0",
                    marginLeft: "auto",
                  }}
                >
                  CLOSE TICKET
                </Button>
                <Button
                  leftIcon={<DownloadIcon />}
                  style={{
                    width: "200px",
                    marginTop: "10px",
                    marginRight: "0",
                    marginLeft: "auto",
                  }}
                  colorScheme="teal"
                  variant="solid"
                >
                  Generate report
                </Button>
              </div>
            </>
          )}
        </Box>
      </Flex>
    </div>
  );
};

export default EditTicket;

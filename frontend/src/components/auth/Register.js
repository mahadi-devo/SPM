import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  toast,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { SignupSchema } from "./authSchema";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { useHistory } from "react-router-dom";

const Register = () => {
  const toast = useToast();
  let history = useHistory();
  const authContext = useContext(AuthContext);
  const { register, error, isAuthenticated } = authContext;

  useEffect(() => {

    if (isAuthenticated) {
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      history.push('/customer');
    }

    if (error) {
      toast({
        title: error,
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history.push]);

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
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"3xl"}>
              Sign up to <Text as="mark">Help Desk Ticketing</Text>
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Formik
              initialValues={{ name: "", email: "", password: "" }}
              validationSchema={SignupSchema}
              onSubmit={(values, actions) => {
                submitHandler(values, actions);
              }}
            >
              {(props) => (
                <Form>
                  <Stack spacing={4}>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.name && form.touched.name}
                          isRequired
                        >
                          <FormLabel htmlFor="name">Name</FormLabel>
                          <Input {...field} id="name" placeholder="John Doe" />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="email">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={form.errors.email && form.touched.email}
                          isRequired
                        >
                          <FormLabel htmlFor="Email">Name</FormLabel>
                          <Input
                            {...field}
                            id="email"
                            placeholder="john@gmail.com"
                          />
                          <FormErrorMessage>
                            {form.errors.email}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="password">
                      {({ field, form }) => (
                        <FormControl
                          isInvalid={
                            form.errors.password && form.touched.password
                          }
                          isRequired
                        >
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <Input
                            {...field}
                            id="password"
                            placeholder="secret***"
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
                      bg={"teal.400"}
                      color={"white"}
                      _hover={{
                        bg: "teal.500",
                      }}
                      isLoading={props.isSubmitting}
                      type="submit"
                    >
                      Register
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Register;

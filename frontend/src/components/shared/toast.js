import { useToast } from '@chakra-ui/react';

const Toast = (props) => {
  const toast = useToast();

  const { title, description, status, duration, isClosable } = props;
  return toast({
    title: 'Account created.',
    description: "We've created your account for you.",
    status: 'success',
    duration: 9000,
    isClosable: true,
  });
};

export default Toast;

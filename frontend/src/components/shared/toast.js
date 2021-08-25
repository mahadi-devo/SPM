import { useToast } from '@chakra-ui/react';

const Toast = (props) => {
  const toast = useToast();

  const { title, description, status, duration, isClosable } = props;
  return toast({
    title: { title },
    description: { description },
    status: { status },
    duration: { duration },
    isClosable: { isClosable },
  });
};

export default Toast;

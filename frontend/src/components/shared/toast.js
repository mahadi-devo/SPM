import { useToast } from '@chakra-ui/react';

const Toast = (props) => {
  const toast = useToast();

  console.log('Hitted toast');

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

import React from 'react';
import {
  Container,
  Box,
  Spacer,
  VStack,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  FormHelperText,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import { useDisclosure } from '@chakra-ui/react';

const AddUserSideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      initialFocusRef={firstField}
      onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>Create User</DrawerHeader>

        <DrawerBody>
          <Stack spacing='24px'>
            <Box>
              <FormLabel htmlFor='username'>Name</FormLabel>
              <Input
                ref={firstField}
                id='username'
                placeholder='Please enter user name'
              />
            </Box>

            <Box>
              <FormLabel htmlFor='owner'>Select Owner</FormLabel>
              {/* <Select id='owner' defaultValue='segun'>
                <option value='segun'>Segun Adebayo</option>
                <option value='kola'>Kola Tioluwani</option>
              </Select> */}
            </Box>

            <Box></Box>
          </Stack>
        </DrawerBody>

        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue'>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddUserSideBar;

import {
  Avatar,
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Spacer,
  Center,
} from '@chakra-ui/react';
import { FiBell, FiChevronDown, FiMenu } from 'react-icons/fi';
import React from 'react';
import { AccessRights } from './accessRights';

const Topbar = (props) => {
  const { onOpen } = useDisclosure();
  const setFullWidth = props.entitlement.includes(AccessRights.user);

  return (
    <Flex
      ml={!setFullWidth && { base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height='20'
      alignItems='center'
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth='10px'
      borderBottomColor='#6C63FF'
      justifyContent={{ base: 'space-between', md: 'flex-end' }}>
      <Box>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant='outline'
          aria-label='open menu'
          icon={<FiMenu />}
        />

        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize='2xl'
          fontFamily='monospace'
          fontWeight='bold'>
          Logo
        </Text>
      </Box>

      {/* <Center flex='1'>
        {props.entitlement.includes(AccessRights.user) && (
          <Tabs>
            <TabList>
              <Tab>Ticket</Tab>
              <Tab>Ticket History</Tab>
            </TabList>
          </Tabs>
        )}
      </Center> */}

      <Box w='250px'>
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton
            size='lg'
            variant='ghost'
            aria-label='open menu'
            icon={<FiBell />}
          />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                py={2}
                transition='all 0.3s'
                _focus={{ boxShadow: 'none' }}>
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={
                      'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                    }
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems='flex-start'
                    spacing='1px'
                    ml='2'>
                    <Text fontSize='sm'>Justina Clark</Text>
                    <Text fontSize='xs' color='gray.600'>
                      Admin
                    </Text>
                  </VStack>
                  <Box display={{ base: 'none', md: 'flex' }}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList
                bg={useColorModeValue('white', 'gray.900')}
                borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem>
                <MenuDivider />
                <MenuItem>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Box>
    </Flex>
  );
};

export default Topbar;

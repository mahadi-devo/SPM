import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Box,
  Spacer,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Center,
} from "@chakra-ui/react";
import { FaPlus, FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import {DeleteIcon, SearchIcon, EditIcon, DownloadIcon} from "@chakra-ui/icons";

import CustomTable from "../shared/customTable";
import DeleteModal from "../shared/deleteModal";
import departmentContext from "../../context/department/departmentContext";

const DepartmentHome = (props) => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { depatments, getDeartment } = useContext(departmentContext);

  const [isOpenDelete, setIsOpen] = useState(false);
  const onCloseDelete = () => setIsOpen(false);

  useEffect(() => {
    getDeartment();
  }, []);

  const Handelview = (id) => {
    console.log("clicked view on ", id);
  };

  const HandelEdit = (id) => {
    console.log("clicked edit on ", id);
  };

  const HandelDelete = (id) => {
    console.log("clicked delete on ", id);
    setIsOpen(true);
  };

  const cols = [
    {
      title: "Department ID",
      render: (data) => {
        return data.departmentId;
      },
    },
    {
      title: "Department Name",
      render: (data) => {
        return data.departmentName;
      },
    },
    {
      title: "Manager Name",
      // isNumeric: true,
      render: (data) => {
        return data.manager;
      },
    },
    {
      title: "Manager Name",
      // isNumeric: true,
      render: (data) => {
        return (
          <HStack w="50%">
            <FaEye
              cursor="pointer"
              onClick={() => history.push(`${url}/view/`)}
              color="gray.100"
            />
            <Spacer />
            <FaEdit
              cursor="pointer"
              onClick={() => HandelEdit(data.departmentId)}
              color="#6C63FF"
            />
            <Spacer />
            <DeleteIcon
              fontSize="1xl"
              cursor="pointer"
              onClick={() => HandelDelete(data.departmentId)}
              color="red"
            />
          </HStack>
        );
      },
    },
  ];

  return (
    <Container maxW="100%" centerContent={true}>
      <VStack w="100%" alignItems="stretch" mt={5}>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          <Heading as="h4" size="lg" mb="5">
            Department Management{' '}
            <Button
                leftIcon={<DownloadIcon />}
                colorScheme='blue'
                size='sm'
                _hover={{
                  boxShadow: '2xl',
                }}
                bg='#6C63FF'>
              Import
            </Button>
          </Heading>
          <Spacer />
          <Link to={`${url}/add`}>
            <Button
              leftIcon={<FaPlus />}
              size="sm"
              bg="#6C63FF"
              color="white"
              _hover={{
                boxShadow: "2xl",
              }}
              variant="solid"
            >
              ADD
            </Button>
          </Link>
        </div>
        <HStack style={{ marginBottom: "10px" }}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              size="sm"
              height="30px"
              children={<SearchIcon color="gray.300" />}
            />
            <Input size="sm" w="20vw" placeholder="Search" />
          </InputGroup>
          <Spacer />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Center w="200px">
              <Text size="xs">Sort By</Text>
            </Center>
            <Select variant="outline" placeholder="Select" size="sm">
              <option value="Department">Department</option>
              <option value="Manager">Manager</option>
              <option value="Latest">Latest</option>
            </Select>
            <Spacer />
            <Center w="200px">
              <Text size="sm">Order By</Text>
            </Center>
            <Select variant="outline" placeholder="Select" size="sm">
              <option value="Department">Department</option>
              <option value="Manger">Manger</option>
            </Select>
          </div>
        </HStack>
        {/* <CustomTable cols={cols} rows={depatments} /> */}
        <CustomTable
          headColor="white"
          colorScheme={"blackAlpha"}
          cols={cols}
          rows={depatments}
        />
      </VStack>
      <DeleteModal
        isOpenDelete={isOpenDelete}
        onCloseDelete={onCloseDelete}
        title="Deparment"
        subTitle="Are you sure? You can't undo this action afterwards."
      />
    </Container>
  );
};

export default DepartmentHome;

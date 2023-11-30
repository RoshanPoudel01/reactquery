import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Button,
  Center,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import axios from "axios";
import SearchBar from "../Components/SearchBar";

const DisplayForm = () => {
  const [username, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const mutation = useMutation((newUser) =>
    axios.post("http://localhost:4000/auth/register", newUser)
  );
  const handleClick = () => {
    mutation.mutate({ username, email, password });
  };
  if (mutation.isLoading) {
    return <span>Submitting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post submitted!</span>;
  }
  return (
    <>
      <SearchBar />
      <Center>
        <Card width={"50%"}>
          <CardHeader
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            Form
          </CardHeader>
          <CardBody>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                id="email"
                name="email"
                type="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                id="pass"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Center>
                <Button m={2} p={2} onClick={handleClick} colorScheme="blue">
                  Send
                </Button>
              </Center>
            </FormControl>
          </CardBody>
        </Card>
      </Center>
    </>
  );
};

export default DisplayForm;

import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Stack,
  Text,
  Image,
  Center,
} from "@chakra-ui/react";

const ViewModal = ({ type, color, id, title, body, image, price }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useMutation(() => {
    const item = axios.delete("https://fakestoreapi.com/products/6");
  });

  const deleteData = () => {
    mutation.mutate();
  };

  if (mutation.isLoading) {
    return <span>Deleting...</span>;
  }

  if (mutation.isError) {
    return <span>Error: {mutation.error.message}</span>;
  }

  if (mutation.isSuccess) {
    return <span>Post deleted!</span>;
  }

  return (
    <>
      <Button onClick={onOpen} colorScheme={color}>
        {type}
      </Button>

      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              {title && (
                <>
                  <Text>ID: {id}</Text>
                  <Text>Title: {title}</Text>
                  <Text>Body: {body}</Text>
                  <Text>Price: $.{price}</Text>
                  <Center>
                    {" "}
                    <Image boxSize="50%" src={image} />
                  </Center>
                </>
              )}
              {!title && <Text>Are You Sure you want to delete?</Text>}
            </Stack>
          </ModalBody>

          <ModalFooter>
            {!title && (
              <Button colorScheme="red" mr={2} onClick={deleteData}>
                {" "}
                Yes{" "}
              </Button>
            )}

            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewModal;

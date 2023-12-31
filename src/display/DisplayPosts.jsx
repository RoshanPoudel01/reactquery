import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Card,
  CardBody,
  CardHeader,
  Select,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";
import ViewModal from "../Components/ViewModal";
import SearchBar from "../Components/SearchBar";

const DisplayPosts = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(5);
  const retrievePosts = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}`
    );
    console.log(response?.data);
    setData(response?.data?.products);
  };

  // useEffect(() => {
  //   retrievePosts();
  // }, [limit]);
  const handleLimit = (event) => {
    console.log(event.target.value, "limit");
    setLimit(event.target.value);
    console.log(limit, "Limitset");
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery(["post", limit], retrievePosts);

  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Box>
      {isLoading ? (
        <Box
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
          height={"100vh"}
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <Card>
          <SearchBar />
          <CardHeader fontSize={"lg"}>
            <Flex>
              <Text m={2}>Posts Table</Text>
              <Select placeholder="SelectLimit" onChange={handleLimit}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
              </Select>
            </Flex>
          </CardHeader>

          <CardBody>
            <Table className="tableview" variant="striped">
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Title</Th>
                  <Th>Price</Th>
                  <Th>Action</Th>
                  <Th>Terminate</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.length &&
                  data?.map((item, index) => (
                    <Tr key={item.id}>
                      <Td>{item?.id}</Td>
                      <Td>{item?.title}</Td>
                      <Td>$.{item?.price}</Td>
                      {/* <Td>
                        <Image
                          boxSize="100px"
                          objectFit="cover"
                          src={item?.image}
                          alt="Image"
                        />
                      </Td> */}

                      <Td>
                        <ViewModal
                          type={"View"}
                          color={"blue"}
                          id={item.id}
                          title={item.title}
                          body={item.description}
                          image={item.image}
                          price={item.price}
                        />
                      </Td>
                      <Td>
                        <ViewModal type={"Delete"} id={item.id} color={"red"} />
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default DisplayPosts;

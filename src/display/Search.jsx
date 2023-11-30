import { Box, Card, CardBody, CardHeader, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import SearchBar from "../Components/SearchBar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const Search = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const [value, setValue] = useState([]);
  const title = searchParam.get("title");
  const getProducts = async () => {
    const result = await axios.get("https://dummyjson.com/products");
    const searchedProduct = result?.data?.products.filter(
      (res) => res.title === title
    );
    setValue(searchedProduct);
    console.log(searchedProduct);
  };
  const { data, isLoading, error } = useQuery(["products", title], getProducts);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  return (
    <Card>
      <SearchBar />
      <CardBody>
        {value.map((item) => (
          <Card key={item.id}>
            <CardHeader>{item.title}</CardHeader>
            <CardBody>
              <Text>{item.description}</Text>
              <Box display={"flex"} gap={4}>
                {item.images.map((img) => (
                  <Image boxSize="250px" objectFit="cover" src={img} />
                ))}
              </Box>
            </CardBody>
          </Card>
        ))}
      </CardBody>
    </Card>
  );
};

export default Search;

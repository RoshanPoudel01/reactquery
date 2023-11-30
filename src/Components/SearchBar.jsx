import {
  Box,
  Button,
  Card,
  Hide,
  Input,
  InputGroup,
  InputLeftElement,
  Show,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useQuery } from "react-query";
import useDebounce from "../Components/useDebounce";
import { useNavigate, useSearchParams } from "react-router-dom";
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [hideSuggestion, setHideSuggestion] = useState(true);
  const [suggestion, setSuggestion] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const debouncedSearch = useDebounce(searchValue, 500);

  const getProducts = async () => {
    const products = await axios.get(
      `https://dummyjson.com/products/search?q=${searchValue}`
    );

    setSuggestion(products?.data?.products);
  };

  const {
    data: product,
    error,
    isLoading,
  } = useQuery(["products", debouncedSearch], getProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  const handleClick = (e) => {
    setSearchParam({ title: e });
    navigate(`/search?title=${encodeURIComponent(e)}`);
  };

  return (
    <Box p={2}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onFocus={() => {
            setHideSuggestion(false);
          }}
          onBlur={() => {
            setTimeout(() => {
              setHideSuggestion(true);
            }, 200);
          }}
          placeholder="Search"
        />
        <Button ml={2}>Search</Button>
      </InputGroup>
      {hideSuggestion ? (
        <Hide></Hide>
      ) : (
        <Show>
          {suggestion?.map((item) => (
            <Card
              cursor={"pointer"}
              onClick={() => handleClick(item.title)}
              size={"lg"}
              key={item.id}
            >
              {item.title}
            </Card>
          ))}
        </Show>
      )}
    </Box>
  );
};

export default SearchBar;

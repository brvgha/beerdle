import React from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/spinner";
import GameTemplate from "../components/gameTemplate";
import { healthCheck } from "../api/beerdle-api";
import ErrorTemplate from "../components/errorTemplate";

const HomePage: React.FC = () => {


  const { error, isLoading, isError } = useQuery({
    queryKey: ["status"],
    queryFn: healthCheck,
    retry: 1,
    retryDelay: 1000,
  });

  console.log('isLoading?', isLoading);

  if (isLoading) return <Spinner />;

  if (isError) {
    return <ErrorTemplate error={error?.message} />;
  }
  return <GameTemplate />;

};

export default HomePage;

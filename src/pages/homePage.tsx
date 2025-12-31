import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/spinner";
import GameTemplate from "../components/gameTemplate";
import { healthCheck } from "../api/beerdle-api";
import ErrorTemplate from "../components/errorTemplate";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!sessionStorage.getItem("guesses")) {
      navigate("/");
    }
  }, [navigate]);

  const { error, isLoading, isError } = useQuery({
    queryKey: ["status"],
    queryFn: healthCheck,
    retry: 1,
    retryDelay: 1000,
  });

  if (isLoading) return <Spinner />;

  if (isError) {
    return <ErrorTemplate error={error?.message} />;
  }
  return <GameTemplate />;

};

export default HomePage;

import React from "react";
// import { BeerdleProps } from "../types/interfaces";
// import { useQuery } from "@tanstack/react-query";
// import { checkSessionStorage } from "../utils";
// import { useNavigate } from "react-router-dom";
// import Spinner from "../components/spinner";
import GameTemplate from "../components/gameTemplate";

const HomePage: React.FC = () => {
  // const navigate = useNavigate();

  /* React.useEffect(() => {
    if (!checkSessionStorage(sessionStorage.getItem("loggedin"))) {
      navigate("/");
    }
  }, [navigate]); */

  /* const { data, error, isLoading, isError } = useQuery<[], Error>({
    queryKey: ["beerdle-data"],
    queryFn: async () => {
      const res = await fetch("/api/data");
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },
  }); */

  // if (isLoading) return <Spinner />;

  // if (isError) return <h1>{error.message}</h1>;

  return <GameTemplate />;
};

export default HomePage;

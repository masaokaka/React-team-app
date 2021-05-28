import React from "react";
import { Search } from "../components/home/Search";
import { Items } from "../components/home/Items";

export const Home = () => {

  return (
      <React.Fragment>
        <Search />
        <Items />
    </React.Fragment>
  );
};

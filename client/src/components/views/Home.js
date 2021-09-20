import React, { Fragment, useState } from "react";

import Hero from "../misc/Hero";
import OperationTableHome from "../operations/OperationTableHome";

const Home = () => (
  <Fragment>
    <Hero />
    <OperationTableHome />
  </Fragment>
);

export default Home;

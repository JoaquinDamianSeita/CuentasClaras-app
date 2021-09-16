import React, { Fragment, useState } from "react";

import Hero from "../misc/Hero";
import OperationListTable from "../opertions/OperationListTable";

const Home = () => (
  <Fragment>
    <Hero />
    <OperationListTable/>
  </Fragment>
);

export default Home;

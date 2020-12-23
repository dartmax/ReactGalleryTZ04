import React from "react";


const reduced = (Parent, Provider) => ({ children }) => (
  <Parent>
    <Provider >{children}</Provider>
  </Parent>
);

const ReduceProvider = ({ providers, children }) => {
  const ReducedProvider = providers.reduce(reduced);
  return <ReducedProvider>{children}</ReducedProvider>;
}

export default ReduceProvider;
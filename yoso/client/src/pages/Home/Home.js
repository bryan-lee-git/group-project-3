import React from "react";
import { UserContext } from "../../App";
import HomeConduit from "../../components/HomeConduit";

export default () => {
  return (
    <UserContext.Consumer>
      {userContext => {
        return <HomeConduit context={userContext} />;
      }}
    </UserContext.Consumer>
  );
};

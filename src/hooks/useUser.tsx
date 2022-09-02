import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInVar, logUserOut } from "../apollo";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatar
    }
  }
`;

const useUser = () => {
  const navigate = useNavigate();
  const hasToken = useReactiveVar(isLoggedInVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(navigate);
    }
  }, [data]);
  return { data };
};

export default useUser;

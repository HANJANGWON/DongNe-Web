import { gql } from "@apollo/client";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      fullName
      avatar
    }
  }
`;

export default ME_QUERY;

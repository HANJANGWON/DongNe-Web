import { gql } from "@apollo/client";

const FOLLOW_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

export default FOLLOW_USER_MUTATION;

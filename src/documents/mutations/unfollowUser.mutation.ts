import { gql } from "@apollo/client";

const UNFOLLOW_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

export default UNFOLLOW_USER_MUTATION;

import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { POST_FRAGMENT } from "../fragments";

type ProfileParams = {
  username: string;
};

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      fullName
      bio
      avatar
      posts {
        ...PostFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
      isManager
    }
  }
  ${POST_FRAGMENT}
`;

const Profile = () => {
  const { username } = useParams<ProfileParams>();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  return <div>{username}</div>;
};

export default Profile;

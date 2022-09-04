import { gql, useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import { FatText } from "../shared/shared";

interface PostProps {
  id: number;
  user: {
    avatar?: string;
    fullName: string;
  };
  file: string;
  isLiked: boolean;
  likes: number;
}

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const PostContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;
const PostHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

const FullName = styled(FatText)`
  margin-left: 15px;
`;

const PostFile = styled.img`
  min-width: 100%;
  max-width: 100%;
`;

const PostData = styled.div`
  padding: 15px;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PostAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  padding: 15px;
  display: block;
`;

const Post = ({ id, user, file, isLiked, likes }: PostProps) => {
  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Post:${id}`;
      const fragment = gql`
        fragment BSName on Post {
          isLiked
          likes
        }
      `;
      const result = cache.readFragment({
        id: fragmentId,
        fragment,
      });
      if ("isLiked" in result && "likes" in result) {
        const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            isLiked: !cacheIsLiked,
            likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
          },
        });
      }
    }
  };
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
    update: updateToggleLike,
  });
  return (
    <PostContainer key={id}>
      <PostHeader>
        <Avatar lg url={user.avatar} />
        <FullName>{user.fullName}</FullName>
      </PostHeader>
      <PostFile src={file} />
      <PostData>
        <PostActions>
          <div>
            <PostAction
              onClick={() => {
                toggleLikeMutation();
              }}
            >
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PostAction>
            <PostAction>
              <FontAwesomeIcon icon={faComment} />
            </PostAction>
            <PostAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PostAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PostActions>
        <Likes>{`좋아요 ${likes}개`}</Likes>
      </PostData>
    </PostContainer>
  );
};

export default Post;

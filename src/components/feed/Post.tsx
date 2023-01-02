import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as SolidHeart,
  faComment as SolidComment,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Comment } from "../../generated/graphql";
import Avatar from "../shared/Avatar";
import { FatText } from "../shared/shared";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import TOGGLE_LIKE_MUTATION from "../../documents/mutations/toggleLike.mutation";

interface PostProps {
  id: number;
  user: {
    avatar?: string;
    username: string;
    fullName: string;
  };
  caption: string;
  file: string;
  isLiked: boolean;
  likes: number;
  commentsNumber: number;
  comments: Comment[];
}

const PostContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
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

const PostUsername = styled(FatText)`
  margin-left: 15px;
`;

const Caption = styled.span`
  margin: 20px;
  font-size: 15px;
  line-height: 23px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    cursor: pointer;
    font-weight: bold;
    &:hover {
      text-decoration: underline;
    }
  }
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

const CaptionContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Post = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentsNumber,
  comments,
}: PostProps) => {
  const [openComments, setOpenComments] = useState("");

  const openCommentsOnClick = () => {
    if (openComments === "") {
      setOpenComments("open");
    } else {
      setOpenComments("");
    }
  };

  const updateToggleLike = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;
    if (ok) {
      const postId = `Post:${id}`;
      cache.modify({
        id: postId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number, { readField }: any) {
            if (readField("isLiked")) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
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
        <Link to={`/users/${user?.username}`}>
          <Avatar lg url={user.avatar} />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <PostUsername>{user.username}</PostUsername>
        </Link>
      </PostHeader>
      <CaptionContainer>
        <Caption>
          {caption.split(" ").map((word, index) =>
            /[\d]+동/g.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/dongtags/${word}`}>{word}</Link>{" "}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word} </React.Fragment>
            )
          )}
        </Caption>
      </CaptionContainer>
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
            <PostAction
              onClick={() => {
                openCommentsOnClick();
              }}
            >
              <FontAwesomeIcon
                icon={openComments === "open" ? SolidComment : faComment}
              />
            </PostAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PostActions>
        <Likes>{`좋아요 ${likes}개`}</Likes>
        <Comments
          postId={id}
          commentsNumber={commentsNumber}
          comments={comments}
          openComments={openComments}
        />
      </PostData>
    </PostContainer>
  );
};

export default Post;

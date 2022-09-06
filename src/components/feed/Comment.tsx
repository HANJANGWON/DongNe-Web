import { gql, useMutation } from "@apollo/client";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styled from "styled-components";
import { FatText } from "../shared/shared";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

interface CommentContainerProps {
  id: number;
  postId: number;
  user: string;
  payload: string;
  isMine: boolean;
}

const SCommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

const CommentContainer = ({
  id,
  postId,
  isMine,
  user,
  payload,
}: CommentContainerProps) => {
  const updateDeleteComment = (cache: any, result: any) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Post:${postId}`,
        fields: {
          commentsNumber(prev: any) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <SCommentContainer>
      <FatText>{user}</FatText>
      <CommentCaption>{payload}</CommentCaption>
      {isMine ? (
        <FontAwesomeIcon
          style={{ color: "tomato", cursor: "pointer", marginLeft: "5px" }}
          icon={faTrashCan}
          onClick={onDeleteClick}
        />
      ) : null}
    </SCommentContainer>
  );
};

export default CommentContainer;

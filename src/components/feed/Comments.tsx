import styled from "styled-components";
import { Comment } from "../../generated/graphql";
import CommentContainer from "./Comment";

const CommentsContainer = styled.div`
  padding-left: 15px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 13px;
`;

interface CommentsContainerProps {
  commentsNumber: number;
  comments: Comment[];
}

const Comments = ({ commentsNumber, comments }: CommentsContainerProps) => {
  return (
    <CommentsContainer>
      <CommentCount>{`댓글 ${commentsNumber}`}</CommentCount>
      {comments?.map((comment) => (
        <CommentContainer
          key={comment.id}
          user={comment.user.fullName}
          payload={comment.payload}
        />
      ))}
    </CommentsContainer>
  );
};

export default Comments;

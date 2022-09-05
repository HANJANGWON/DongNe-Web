import styled from "styled-components";
import { FatText } from "../shared/shared";

interface CommentContainerProps {
  user: string;
  payload: string;
}

const SCommentContainer = styled.div`
  margin-bottom: 7px;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
`;

const CommentContainer = ({ user, payload }: CommentContainerProps) => {
  return (
    <SCommentContainer>
      <FatText>{user}</FatText>
      <CommentCaption>{payload}</CommentCaption>
    </SCommentContainer>
  );
};

export default CommentContainer;

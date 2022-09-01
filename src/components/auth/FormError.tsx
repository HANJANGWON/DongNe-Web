import styled from "styled-components";

type FormErrorProps = {
  message?: any;
};

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
`;

const SLoginFormError = styled(SFormError)`
  margin-bottom: 25px;
`;

const SSignUpFormError = styled(SFormError)`
  margin-top: 25px;
`;

export const LoginFormError = ({ message }: FormErrorProps) => {
  return message === "" || !message ? null : (
    <SLoginFormError>{message}</SLoginFormError>
  );
};

export const SignUpFormError = ({ message }: FormErrorProps) => {
  return message === "" || !message ? null : (
    <SSignUpFormError>{message}</SSignUpFormError>
  );
};

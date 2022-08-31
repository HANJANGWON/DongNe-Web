import styled from "styled-components";

type FormErrorProps = {
  message?: any;
};

const SFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 25px;
`;

const FormError = ({ message }: FormErrorProps) => {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
};

export default FormError;

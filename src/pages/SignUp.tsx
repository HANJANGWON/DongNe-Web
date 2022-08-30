import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import { Input } from "../components/auth/Input";
import PageTitle from "../components/PageTitle";
import { HeaderContainer, SubTitle } from "../components/shared/shared";
import routes from "../routes";

const FontAwesome = styled.div`
  color: ${(props) => props.theme.accent};
`;

const SignUp = () => {
  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <FormBox>
        <HeaderContainer>
          <FontAwesome>
            <FontAwesomeIcon icon={faBuilding} size="3x" />
          </FontAwesome>
          <SubTitle>동네를 이용하고 싶다면 가입하세요.</SubTitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
          <Input type="text" placeholder="이름" />
          <Input type="text" placeholder="이메일" />
          <Button type="submit" value="가입" />
        </form>
      </FormBox>
      <BottomBox
        cta="계정이 있으신가요?"
        linkText="로그인"
        link={routes.home}
      />
    </AuthLayout>
  );
};

export default SignUp;

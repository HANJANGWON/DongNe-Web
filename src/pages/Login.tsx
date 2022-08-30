import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import { Input } from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import { HeaderContainer, SubTitle } from "../components/shared/shared";
import routes from "../routes";

const GoogleLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const FontAwesome = styled.div`
  color: ${(props) => props.theme.accent};
`;

const Login = () => {
  return (
    <AuthLayout>
      <PageTitle title="로그인" />
      <FormBox>
        <HeaderContainer>
          <FontAwesome>
            <FontAwesomeIcon icon={faBuilding} size="3x" />
          </FontAwesome>
          <SubTitle>동네에 오신걸 환영합니다</SubTitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="아이디" />
          <Input type="password" placeholder="비밀번호" />
          <Button type="submit" value="로그인" />
        </form>
        <Separator />
        <GoogleLogin>
          <FontAwesomeIcon icon={faGoogle} />
          <span>Google로 로그인</span>
        </GoogleLogin>
      </FormBox>
      <BottomBox
        cta="계정이 없으신가요?"
        linkText="회원가입"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;

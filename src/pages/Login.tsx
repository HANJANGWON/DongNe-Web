import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WhiteBox = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  width: 100%;
`;

const TopBox = styled(WhiteBox)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 35px 40px 25px 40px;
  margin-bottom: 10px;
  form {
    margin-top: 35px;
    width: 100%;
    display: flex;
    justify-items: center;
    flex-direction: column;
    align-items: center;
  }
`;

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
`;
const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
`;

const BottomBox = styled(WhiteBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

const Wrapper = styled.div`
  max-width: 350px;
  width: 100%;
`;

const Separator = styled.div`
  margin: 20px 0px 30px 0px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: rgb(219, 219, 219);
  }
  span {
    flex-shrink: 0;
    font-size: 13px;
    margin: 0px 10px;
    font-weight: 600;
    color: #8e8e8e;
  }
`;

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
    <Container>
      <Wrapper>
        <TopBox>
          <FontAwesome>
            <FontAwesomeIcon icon={faBuilding} size="3x" />
          </FontAwesome>
          <form>
            <Input type="text" placeholder="아이디" />
            <Input type="password" placeholder="비밀번호" />
            <Button type="submit" value="로그인" />
          </form>
          <Separator>
            <div></div>
            <span>또는</span>
            <div></div>
          </Separator>
          <GoogleLogin>
            <FontAwesomeIcon icon={faGoogle} />
            <span>Google로 로그인</span>
          </GoogleLogin>
        </TopBox>
        <BottomBox>
          <span>계정이 없으신가요?</span>
          <Link to="/sign-up">회원가입</Link>
        </BottomBox>
      </Wrapper>
    </Container>
  );
};

export default Login;

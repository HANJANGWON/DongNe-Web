import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import FormError from "../components/auth/FormError";
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
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data: any) => {
    //console.log(data);
  };

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
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "아이디를 입력해 주세요.",
            })}
            name="username"
            type="text"
            placeholder="아이디"
          />

          <Input
            {...register("password", { required: "비밀번호를 입력해주세요." })}
            name="password"
            type="password"
            placeholder="비밀번호"
          />

          <Button type="submit" value="로그인" disabled={!formState.isValid} />
        </form>
        <Separator />
        <FormError
          message={
            formState.errors?.username?.message
              ? formState.errors?.username?.message
              : formState.errors?.password?.message
          }
        />
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

import { useMutation } from "@apollo/client";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/shared/Button";
import FormBox from "../components/auth/FormBox";
import { LoginFormError } from "../components/auth/FormError";
import { Input } from "../components/auth/Input";
import Notification from "../components/auth/Notification";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import { HeaderContainer, SubTitle } from "../components/shared/shared";
import routes from "../routes";
import LOGIN_MUTATION from "../documents/mutations/login.mutation";

interface LoginState {
  username?: string;
  password?: string;
  message?: string;
}

interface FormData {
  username: string;
  password: string;
  loginResult?: string;
}

const GoogleLogin = styled.div`
  color: ${(props) => props.theme.googleLogin};
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const FontAwesome = styled.div`
  color: ${(props) => props.theme.accent};
`;

const Login = () => {
  const location = useLocation();
  const state = location.state as LoginState | null;
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      username: state?.username || "",
      password: state?.password || "",
    },
  });
  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("loginResult", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    const { username, password }: FormData = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="?????????" />
      <FormBox>
        <HeaderContainer>
          <FontAwesome>
            <FontAwesomeIcon icon={faBuilding} size="3x" />
          </FontAwesome>
          <SubTitle>????????? ????????? ???????????????</SubTitle>
        </HeaderContainer>
        <Notification message={state?.message} />
        <form onSubmit={handleSubmit(onSubmitValid)} autoComplete="off">
          <Input
            {...register("username", {
              required: "???????????? ????????? ?????????.",
              onChange() {
                clearErrors("loginResult");
              },
            })}
            name="username"
            type="text"
            placeholder="?????????"
          />

          <Input
            {...register("password", {
              required: "??????????????? ??????????????????.",
              onChange() {
                clearErrors("loginResult");
              },
            })}
            name="password"
            type="password"
            placeholder="????????????"
          />

          <Button
            type="submit"
            value={loading ? "?????????..." : "?????????"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <Separator />
        <LoginFormError
          message={
            formState.errors?.username?.message
              ? formState.errors?.username?.message
              : formState.errors?.password?.message
          }
        />
        <LoginFormError message={formState.errors?.loginResult?.message} />
        <GoogleLogin>
          <FontAwesomeIcon icon={faGoogle} />
          <span>Google??? ?????????</span>
        </GoogleLogin>
      </FormBox>
      <BottomBox
        cta="????????? ????????????????"
        linkText="????????????"
        link={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;

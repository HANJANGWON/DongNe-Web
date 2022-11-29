import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import { faAdd, faHome } from "@fortawesome/free-solid-svg-icons";
import { ApolloClient, useApolloClient, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { Link } from "react-router-dom";
import routes from "../routes";
import useUser from "../hooks/useUser";
import Avatar from "./shared/Avatar";
import DarkMode from "./shared/DarkModeBtn";
import { MdLogout } from "react-icons/md";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;
const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 3px 15px;
  color: ${(props) => props.theme.buttonFontColor};
  font-weight: 600;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Header = () => {
  const client: ApolloClient<object> = useApolloClient();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <SHeader>
      <Wrapper>
        <Column>
          <Link to={routes.home}>
            <FontAwesomeIcon icon={faBuilding} size="2x" />
          </Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Link>
              </Icon>
              <Icon>
                <Link to={"posts/upload"}>
                  <FontAwesomeIcon icon={faAdd} size="lg" />
                </Link>
              </Icon>
              <Icon>
                <MdLogout
                  size={"20px"}
                  style={{ display: "flex" }}
                  onClick={() => logUserOut(client)}
                />
              </Icon>
              <Icon>
                <DarkMode />
              </Icon>
              <Icon>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <IconsContainer>
              <Link to={routes.home}>
                <Button>Login</Button>
              </Link>
              <Icon>
                <DarkMode />
              </Icon>
            </IconsContainer>
          )}
        </Column>
      </Wrapper>
    </SHeader>
  );
};

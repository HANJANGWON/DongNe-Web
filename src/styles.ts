import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const darkTheme: DefaultTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
};

export const lightTheme: DefaultTheme = {
  accent: "#348dec",
  borderColor: "rgb(219, 219, 219)",
};

export const GlobalStyles = createGlobalStyle`
    ${reset};
    * {
      box-sizing: border-box;
    }
    input {
      all:unset;
    }
    body { 
        background-color: ${(props) => props.theme.bgColor};
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: rgb(38, 38, 38);
    }
    a {
      text-decoration: none;
    }
   
`;

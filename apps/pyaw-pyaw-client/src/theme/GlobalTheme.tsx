import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    font-family: 'Roboto', sans-serif;
    
    height: 100%;

    margin: 0;

    padding: 0;

    width: 100%;
  }
`;

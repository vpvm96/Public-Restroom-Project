import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body,
   * {
    box-sizing: border-box;
    margin: 0 auto;
    padding: 0;
  }
`;

export default GlobalStyle;

import Select from "react-select";

import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --background: #fdf0d5;

        --blue-300: #669bbc;
        --blue-400: #028090;
        --blue-600: #003049;

        --white: #fff;
    }
    
    *  {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    // Font-size: 16px (Desktop)
    html{
        scroll-behavior: smooth;

        @media (max-width: 1080px) {
            font-size: 93.75%; // 15px
        }
        @media (max-width: 720px) {
            font-size: 87.5%; // 14px
        }
    }
    body, input, textarea, button {
        font-family: 'Roboto' ,sans-serif;
        font-weight: 400;
        outline: none;
    }
    h1, h2 ,h3, h4, h5, h6, strong {
        font-weight: 600;
    }
    body { 
        background: #669bbc;
        -webkit-font-smoothing: antialiased;
    }
    button {
        cursor: pointer;
    }

    input, textarea {
        :-webkit-autofill {
        -webkit-text-fill-color: white; /* Cor do texto */
        -webkit-box-shadow: 0 0 0px 1000px rgba(255, 255, 255, 0.2) inset !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
    }

    }
    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const StyledSelect = styled(Select)`
  width: 100%;
`;
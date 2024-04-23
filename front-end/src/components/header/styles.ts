import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 100%;
    height: 80px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    padding: 0 1.5rem;

    background: var(--blue-600);

    h2{
        color: var(--white);
        font-family: "Oswald", sans-serif;
        font-size: 2rem;
    }

    span{
        color: #669bbc;
    }
`

export const AuthContainer = styled.div`
    width: fit-content;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 1rem;

    :hover{
        transition: 0.4s;

        opacity: 0.8;
        scale: 1.1;
    }
`

export const Button = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 0.75rem;

    background: var(--blue-300);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;

    img{
        width: 30px;

        border-radius: 50%;
    }
`
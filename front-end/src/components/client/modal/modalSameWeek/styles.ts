import styled from "styled-components";

export const Container = styled.section`
    min-width: 500px;
    min-height: 300px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    gap: 1rem;

    background: var(--background);

    border-radius: 1rem;

    padding: 1rem;

    span{
        text-align: center;
        font-size: 1.15rem;
    }
`

export const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    h4{
        font-size: 1.15rem;
    }

    svg{
        cursor: pointer;
    }
`

export const ButtonsContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button{
        width: 100%;

        color: var(--white);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
    }

    button:first-child {
        background: #0a9396;
    }

    button:last-child {
        margin-top: 1rem;
        background: #ae2012;
    }
`
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

    padding: 2rem;

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

export const ContentContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    label{
        padding: 1rem 0 0 0;

        color: var(--black);
    }

    input{
        width: 100%;
        margin: 0.25rem 0 0 0;

        padding: 0.5rem;

        color: #333333;
                
        border: none;
        border-radius: 0.25rem;
    }

    button{
        width: 100%;

        margin-top: 1rem;

        gap: 0.75rem;

        background: var(--blue-600);
        color: var(--white);
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;

        img{
            width: 30px;

            border-radius: 50%;
        }
                
        :hover{
            transition: 0.4s;

            opacity: 0.8;
            scale: 1.1;
        }
    }
`
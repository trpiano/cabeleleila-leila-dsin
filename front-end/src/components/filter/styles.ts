import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 80px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    padding: 0 1rem;

    background: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1,875rem rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);


    label, span{
        color: var(--white);
    }

    form{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        padding: 0 0.5rem;

        gap: 4rem;

        input{
            width: 100%;
            margin: 0.25rem 0 0 0;

            padding: 0.5rem;

            color: #333333;
                
            border: none;
            border-radius: 0.25rem;
        }
    }
`

export const FilterOptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
`
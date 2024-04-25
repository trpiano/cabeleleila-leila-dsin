import styled from "styled-components";

export const Container = styled.section`
    width: 100%;

    padding-top: 3rem;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const ContentContainer = styled.div`
    width: 80%;

    padding: 1.5rem 0.75rem;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    gap: 2rem;

    background: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    box-shadow: 0 0.25rem 1,875rem rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);

    h3{
        color: var(--white);
        font-size: 1.5rem;
    }

    @media screen and (max-width: 920px) {
        flex-direction: column;
    }
`

export const SchedulesContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex;

    @media screen and (max-width: 920px) {
        flex-direction: column;
    }
`

export const MyScheduleContainer = styled.div`
    width: 100%;
    min-height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding: 1rem;

    gap: 2rem;

    div{
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 0.5rem;
    }
`

export const WarningContainer = styled.div`
    min-width: 500px;

    background: rgba(255,204,0, 0.8);

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

    gap: 1rem;

    padding: 1rem;

    border-radius: 0.5rem;

    @media screen and (max-width: 920px) {
        min-width: 0px;
        width: 100%;
    }
`

export const NotFoundSchedulesContainer = styled.div`
    min-width: 500px;

    background: rgba(3, 111, 252, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;

    text-align: center;

    gap: 1rem;

    padding: 1rem;

    border-radius: 0.5rem;

    @media screen and (max-width: 920px) {
        min-width: 0px;
        width: 100%;
    }
`

export const NewScheduleContainer = styled.div`
    width: 100%;
    min-height: 300px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    padding: 1rem;
`

export const FormContainer = styled.div`
    width: 100%;

    form{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        label{
            padding: 1rem 0 0 0;

            color: var(--white);
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
    }
`

type ScheduleCardProps = {
    isDisabled: boolean
}

export const ScheduleCards = styled.button<ScheduleCardProps>`
    width: 100%;
    min-width: 500px;
    min-height: 50px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    background: var(--blue-600);
    opacity: ${(props) => props.isDisabled ? '0.6' : '1'};
    cursor: ${(props) => props.isDisabled ? 'not-allowed' : 'pointer'};
    color: var(--white);

    padding: 0.5rem 1rem;

    border-radius: 0.25rem;
    border: none;

    span{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        gap: 0.5rem;
    }

    button{ 
        z-index: 2;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        gap: 0.5rem;

        background: var(--blue-300);
        color: var(--white);

        border: none;
        border-radius: 0.5rem;

        padding: 0.25rem 0.5rem;
    }

    button:hover{
        transition: 0.4s;

        opacity: 0.8;
        scale: 1.1;
    }

    @media screen and (max-width: 920px) {
        min-width: 0px;
    }
`
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
    flex-direction: row;
    align-items: center;
    justify-content: center;

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
`

export const MyScheduleContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const NewScheduleContainer = styled.div`
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div{
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

            .select{
                width: 100%;
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
            }
        }
    }
`
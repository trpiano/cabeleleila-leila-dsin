import Modal from 'styled-react-modal'

import { IoMdClose } from "react-icons/io";

import { ButtonsContainer, Container, HeaderContainer } from './styles';
import { Dispatch, SetStateAction } from 'react';

type ModalProps = {
    isOpen: boolean;
    date: string
    toggleModal: () => void;
    isForSameDay: Dispatch<SetStateAction<boolean>>;
}

export function ModalSameWeek(props: ModalProps) {
    // const date = new Date(props.date);
    // const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // const formatter = new Intl.DateTimeFormat('pt-BR', options);
    // const formattedDate = formatter.format(date);

    return(
        <Modal
            isOpen={props.isOpen}
            onBackgroundClick={props.toggleModal}
            onEscapeKeydown={props.toggleModal}
        >
            <Container>
                <HeaderContainer>
                    <h4>Sugestão de Agendamento</h4>
                    <IoMdClose onClick={props.toggleModal} />
                </HeaderContainer>


                <span>
                    Verficamos que ha um agendamento para a semana do, 
                    <br />
                    dia formattedDate gostaria de marcar para a mesma data?
                </span>

                <ButtonsContainer>
                    <button onClick={() => props.isForSameDay(true)}>Sim</button>
                    <button onClick={() => props.isForSameDay(false)}>Nao</button>
                </ButtonsContainer>
            </Container>
        </Modal>
    )
}
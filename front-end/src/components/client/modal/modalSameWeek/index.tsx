// Libs
import Modal from 'styled-react-modal'
import { IoMdClose } from "react-icons/io";
import { isAfter, parse, subDays } from 'date-fns';

//API Endpoints
import { registerSchedule } from "../../../../pages/api/schedule-api";

//Constants Values
import { ModalProps } from '../../../../constants/types';

//Custom Styles
import { ButtonsContainer, Container, HeaderContainer } from './styles';
import { DateFormatter } from '../../../../constants/objects';

export function ModalSameWeek(props: ModalProps) {
    const nearestDate = findNearestFutureDate(props.datesInTheSameWeek)

    const formattedDate = DateFormatter(nearestDate);

    function findNearestFutureDate(datesArray) {
        const parsedDates = datesArray.map((dateObj) => parse(dateObj.date, 'yyyy-MM-dd', new Date()));
        const nearestFutureDateObj = parsedDates.find((date) => isAfter(date, new Date()));
    
        return nearestFutureDateObj ? nearestFutureDateObj.getFullYear() + '-' + (nearestFutureDateObj.getMonth() + 1) + '-' + nearestFutureDateObj.getDate() : subDays(parsedDates[0], 1).getFullYear() + '-' + (subDays(parsedDates[0], 1).getMonth() + 1) + '-' + subDays(parsedDates[0], 1).getDate();
    }

    function handleSubmit(isForSameDay: boolean) {
        if (isForSameDay) {
            props.data.date = nearestDate

            registerSchedule(props.data)
                .then(() => {
                    props.toggleModal()

                    props.refetchSchedules()
                })
        } else {
            registerSchedule(props.data)
                .then(() => {
                    props.toggleModal()

                    props.refetchSchedules()
                })
        }
    }

    return (
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
                    Verificamos que ha um agendamento para o
                    <br />
                    dia {formattedDate} gostaria de marcar para a mesma data?
                </span>

                <ButtonsContainer>
                    <button onClick={() => handleSubmit(true)}>Sim</button>
                    <button onClick={() => handleSubmit(false)}>Nao</button>
                </ButtonsContainer>
            </Container>
        </Modal>
    )
}
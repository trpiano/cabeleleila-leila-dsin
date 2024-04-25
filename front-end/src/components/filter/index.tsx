import Switch from "react-switch";
import { DateRangePicker } from 'rsuite';

import { filterPropsType } from "../../constants/types";

import { Container, FilterOptionContainer } from "./styles";

export function Filter(props: filterPropsType) {
    function toggleShowOldestData() {
        props.setShowOldestData(!props.showOldestData)
    }

    async function handleSubmit(event) {
        event.preventDefault()
    }

    return (
        <Container>
            <span>Filtrar por: </span>
            <form onSubmit={(event) => handleSubmit(event)}>
                <FilterOptionContainer>
                    <DateRangePicker 
                        placeholder="Selecione a data" 
                        format="dd/MM/yyyy" 
                        character=" – "
                        onOk={props.setRangeDate}
                        value={props.rangeDate}
                    />
                </FilterOptionContainer>

                <FilterOptionContainer>
                    <Switch onChange={toggleShowOldestData} checked={props.showOldestData} />
                    <label>Mostrar agendamentos antigos</label>
                </FilterOptionContainer>
            </form>
        </Container>
    )
}
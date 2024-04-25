import { useEffect, useState } from 'react';

// Libs
import Modal from 'styled-react-modal'
import makeAnimated from "react-select/animated";
import { IoMdClose } from "react-icons/io";

//Constants Values
import { ModalProps, optionsType } from '../../../constants/types';
import { options } from '../../../constants/objects';

//Custom Styles
import { Container, ContentContainer, HeaderContainer } from './styles';
import { StyledSelect } from '../../../styles/global';

export function ModalViewDetails(props: ModalProps) {
    const animatedComponents = makeAnimated();

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>('')
    const [selectedOptions, setSelectedOptions] = useState<optionsType[]>([]);

    useEffect(() => {
        setName(props.data?.name ?? '')
        setDate(props.data?.date ?? '')
        setSelectedOptions(props.data?.selectedOptions ?? [])
    },[props.isOpen])

    return (
        <Modal
            isOpen={props.isOpen}
            onBackgroundClick={props.toggleModal}
            onEscapeKeydown={props.toggleModal}
        >
            <Container>
                <HeaderContainer>
                    <h4>Detalhes do Agendamento</h4>
                    <IoMdClose onClick={props.toggleModal} />
                </HeaderContainer>

                <ContentContainer>
                        <label>Nome</label>
                        <input
                            name="name"
                            type="text"
                            value={name}
                            readOnly
                        />
                        <label>Data</label>
                        <input
                            name="date"
                            type="date"
                            value={date}
                            readOnly
                        />
                        <label>Serviços</label>
                        <StyledSelect
                            name="services"
                            components={animatedComponents}
                            placeholder="Selecione o serviço"
                            isMulti
                            value={selectedOptions}
                            options={options}
                            className="select"
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={false}
                            isLoading={false}
                            isRtl={false}
                            closeMenuOnSelect={false}
                        />
                </ContentContainer>
            </Container>
        </Modal>
    )
}
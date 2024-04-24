import { Dispatch, SetStateAction, useState } from 'react';

import Modal from 'styled-react-modal'
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { IoMdClose } from "react-icons/io";
import { toast } from 'react-toastify';

import { dataProps, options, optionsType } from '../../scheduleBoard';
import { Container, HeaderContainer } from './styles';
import axios from 'axios';

type ModalProps = {
    isOpen: boolean;
    dataToEdit: dataProps
    toggleModal: () => void;
    isForSameDay: Dispatch<SetStateAction<boolean>>;
}

export function ModalEditSchedule(props: ModalProps) {
    const animatedComponents = makeAnimated();

    const [name, setName] = useState<string>(props.dataToEdit ? props.dataToEdit.name : '');
    const [date, setDate] = useState<string>(props.dataToEdit ? props.dataToEdit.date : '')
    const [selectedOptions, setSelectedOptions] = useState<optionsType[]>(props.dataToEdit ? props.dataToEdit.selectedOptions : []);

    async function editSchedule(data: dataProps) {
        await axios.put(`${process.env.NEXT_PUBLIC_SCHEDULE_API}/schedule/${data.id}`, {
            status: 'CHANGED',
            ...data
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        const data = {
            id: props.dataToEdit.id,
            email: props.dataToEdit.email,
            name,
            date,
            selectedOptions,
        }

        editSchedule(data)
            .then(() => {
                toast.success('Alteração realizado com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                props.toggleModal()
            })
            .catch(() => {
                toast.error('Ocorreu um erro ao realizar a atualização do agendamento, tente novamente!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
    }

    return (
        <Modal
            isOpen={props.isOpen}
            onBackgroundClick={props.toggleModal}
            onEscapeKeydown={props.toggleModal}
        >
            <Container>
                <HeaderContainer>
                    <h4>Editar Agendamento</h4>
                    <IoMdClose onClick={props.toggleModal} />
                </HeaderContainer>

                <div>
                    <form onSubmit={(event) => handleSubmit(event)}>
                        <label>Nome</label>
                        <input
                            name="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label>Data</label>
                        <input
                            name="date"
                            type="date"
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                        />
                        <label>Serviços</label>
                        <Select
                            name="services"
                            components={animatedComponents}
                            placeholder="Selecione o serviço"
                            isMulti
                            options={options}
                            onChange={(item: any) => setSelectedOptions(item)}
                            className="select"
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={false}
                            isLoading={false}
                            isRtl={false}
                            closeMenuOnSelect={false}
                        />

                        <button type="submit">
                            Agendar
                        </button>
                    </form>
                </div>
            </Container>
        </Modal>
    )
}
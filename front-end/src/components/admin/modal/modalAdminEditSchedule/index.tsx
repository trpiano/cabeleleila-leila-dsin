import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// Libs
import Modal from 'styled-react-modal'
import makeAnimated from "react-select/animated";
import { IoMdClose } from 'react-icons/io';
import { toast } from 'react-toastify';

//API Endpoints
import { editSchedule, getAdminAccounts } from '../../../../pages/api/schedule-api';

//Constants Values
import { ModalProps , optionsType } from '../../../../constants/types';
import { options, statusOptions } from '../../../../constants/objects';

//Custom Styles
import { Container, ContentContainer, HeaderContainer } from './styles';
import { StyledSelect } from '../../../../styles/global';


export default function ModalAdminEditSchedule(props: ModalProps) {
    const { data: session } = useSession()

    const isAdmin = getAdminAccounts(session?.user?.email)

    const animatedComponents = makeAnimated();

    const defaultStatus: optionsType = { value: '', label: '' };

    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<string>()
    const [selectedOptions, setSelectedOptions] = useState<optionsType[]>([]);
    const [status, setStatus] = useState<optionsType>(defaultStatus)


    useEffect(() => {
        setName(props.data?.name ?? '')
        setDate(props.data?.date ?? '')
        setSelectedOptions(props.data?.selectedOptions ?? [])
        setStatus(props.data?.status ?? defaultStatus)
    },[props.isOpen])

    function handleSubmit(event) {
        event.preventDefault()

        const data = {
            id: props.data.id,
            email: props.data.email,
            name,
            date,
            selectedOptions,
            status: status
        }

        editSchedule(data, isAdmin)
            .then(() => {
                toast.success('Alteração realizado com sucesso!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                props.toggleModal()
                props.refetchSchedules()
            })
            .catch(() => {
                toast.error('Ocorreu um erro ao realizar a atualização do agendamento, tente novamente!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
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

                <ContentContainer>
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
                        <StyledSelect
                            name="services"
                            components={animatedComponents}
                            placeholder="Selecione o serviço"
                            isMulti
                            value={selectedOptions}
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

                        <label>Status</label>
                        <StyledSelect
                            name="status"
                            components={animatedComponents}
                            placeholder="Selecione o status"
                            value={status}
                            options={statusOptions}
                            onChange={(item: any) => setStatus(item)}
                            className="select"
                            isClearable={true}
                            isSearchable={true}
                            isDisabled={false}
                            isLoading={false}
                            isRtl={false}
                            closeMenuOnSelect={false}
                        />

                        <button type="submit">
                            Atualizar Agendamento
                        </button>
                    </form>
                </ContentContainer>
            </Container>
        </Modal>
    )
}
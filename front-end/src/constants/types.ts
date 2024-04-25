export type optionsType = {
    value: string;
    label: string;
}

export type dataProps = {
    id?: string;
    name: string;
    date: string;
    email: string
    selectedOptions: optionsType[];
    status?: optionsType;
}

export type ModalProps = {
    isOpen: boolean;
    toggleModal: () => void;
    data?: dataProps;
    datesInTheSameWeek?: dataProps[];
    refetchSchedules?: () => void;
}
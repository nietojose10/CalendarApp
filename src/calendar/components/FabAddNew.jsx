import { addHours } from "date-fns";
import { useCalendarStore, useUIStore } from "../../hooks"

export const FabAddNew = () => {

    const { openDateModal } = useUIStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours( new Date(), 2 ),
            bgColor: '#4r4r4r',
            user: {
            _id: '',
            name: ''
            }
        });
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClickNew }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}

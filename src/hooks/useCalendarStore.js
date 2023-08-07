import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/";

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    //Esta funcion reemplaza la funcionalidad del thunk, es decir que ya no tendriamos el archivo llamado thunks donde tenemos todas nuestras funciones asincronas.
    const startSavingEvent = async( calendarEvent ) => {
        //TODO: llegar al backend

        //Todo bien
        if ( calendarEvent._id ) {
            //Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            //Creando
            dispatch( onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }) );
        }

    }

    const startDeletingEvent = () => {

        //Todo: llegar al backend
        dispatch( onDeleteEvent() );

    }

    return {
        
        //Propiedades
            events,
            activeEvent,
            hasEventSelected: !!activeEvent,//Si es null = false, si tiene un objeto = true
        //Metodos
            setActiveEvent,
            startSavingEvent,
            startDeletingEvent,
    }
}

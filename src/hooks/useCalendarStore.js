import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent, onClearActiveEvent } from "../store/";
import { calendarApi } from "../api";
import { convertEventsToDate } from "../helpers";
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onClearActiveEvent() );
        dispatch( onSetActiveEvent( calendarEvent ) );
    }

    //Esta funcion reemplaza la funcionalidad del thunk, es decir que ya no tendriamos el archivo llamado thunks donde tenemos todas nuestras funciones asincronas.
    const startSavingEvent = async( calendarEvent ) => {
        //TODO: llegar al backend


       try {

             //Todo Update Event
            if ( calendarEvent.id ) {
                //Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent ); 
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;

            }

            //Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );

       } catch (error) {

            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg, 'error');

       }
        

    }

    const startDeletingEvent = async() => {

        try {
            console.log(`Evento ID a eliminar ${ activeEvent.id }`); 
            await calendarApi.delete(`/events/${ activeEvent.id }` );
            //Todo: llegar al backend
            dispatch( onDeleteEvent() );


        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

        

    }

    const startLoadingEvents = async() => {

        try {
            
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDate( data.eventos );
            dispatch( onLoadEvents( events ) );
            console.log(events);

        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
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
            startLoadingEvents,
    }
}

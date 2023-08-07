import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Birthdays Boss',
    notes: 'Buying the Boss cake',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Jose Nieto'
    } 
  };

    export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
         ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push( payload );//Si no estuvieramos usando el redux toolkit no podriamos hacer este push ya que estaria mutando la propiedad
            state.activeEvent = null;
        },
        onUpdateEvent: ( state, { payload }) => {
            state.events = state.events.map( event => {

                if ( event._id === payload._id ){
                    return payload;
                }

                return event;
            });
        },
        onDeleteEvent: ( state ) => {

            if ( state.activeEvent ){
                state.events = state.events.filter( event => state.activeEvent._id !== event._id  );
                state.activeEvent = null;
            }
            
        }
    }
    });
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;
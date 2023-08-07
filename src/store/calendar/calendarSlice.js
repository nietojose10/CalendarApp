import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
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
        increment: (state, /* action */ ) => {
            state.counter += 1;
        },
    }
    });
export const { increment } = calendarSlice.actions;
import {
    MONTH_CHANGE, YEAR_CHANGE, DATE_RESET, DAY_SELECTED, FETCH_EVENTS, FETCHED_EVENTS, EVENT_EDIT, EVENT_ADD, EVENT_ADDED, EVENT_UPDATED, EVENT_DELETE_MODAL, EVENT_DELETED, EVENT_SELECT
} from './actionsTypes';
import server from '../../server'

export const goNextMonth = () =>{
    return {
        type: MONTH_CHANGE,
        incDec: 1
    };
};
export const goPrevMonth = () =>{
    return {
        type: MONTH_CHANGE,
        incDec: -1
    };
};
export const goNextYear = () =>{
    return {
        type: YEAR_CHANGE,
        incDec: 1
    };
};
export const fetchEvents = (params) => {
    return dispatch => server.get('api/events',{
        params
    }).then((res)=>{
            dispatch(fetchedEvents(res.data.events));
        });
};
export const goPrevYear = () =>{
    return {
        type: YEAR_CHANGE,
        incDec: -1
    };
};
export const resetDate = () =>{
    return {
        type: DATE_RESET
    };
};
const fetchedEvents = (events) => {
    return {
        type: FETCHED_EVENTS,
        events
    };
};
export const selectDay = (day)=>{
  return {
      type: DAY_SELECTED,
      day
  }
};
export const eventEdit = (_id)=>{
  return {
      type: EVENT_EDIT,
      _id
  }
};
export const eventDeleteModal = (_id)=>{
  return {
      type: EVENT_DELETE_MODAL,
      _id
  }
};
export const eventSelect = (_id)=>{
  return {
      type: EVENT_SELECT,
      _id
  }
};
export const addEvent = ()=>{
  return {
      type: EVENT_ADD,
  }
};
export const storedEvent = (event) => {
    return{
        type: EVENT_ADDED,
        event
    }
};
export const eventStore = (data)=>{
    return dispatch => {
        return server.post('api/events',data)
            .then((res)=>{
                var date = new Date(res.data.event.date);
                res.data.event.year = date.getFullYear();
                res.data.event.month = date.getMonth() + 1;
                res.data.event.day = date.getDate();
                dispatch(storedEvent(res.data.event));
            }).catch((err)=>{
                let error = new Error(err.response.statusText);
                error.response = err.response.data;
                throw error;
            });
    };
};
export const updatedEvent = (event) => {
    return {
        type: EVENT_UPDATED,
        event
    }
};
export const deletedEvent = (_id) => {
    return {
        type: EVENT_DELETED,
        _id
    }
};

export const eventUpdate = (data)=>{
    return dispatch => {
        return server.put('api/events',data)
            .then((res)=>{
                dispatch(updatedEvent(data));
            }).catch((err)=>{
                let error = new Error(err.response.statusText);
                error.response = err.response.data;
                throw error;
            });
    };
};
export const eventDelete = (_id)=>{
    return dispatch => {
        return server.delete(`api/events/${_id}`)
            .then((res)=>{
                dispatch(deletedEvent(_id));
            })
    };
};

import {
    MONTH_CHANGE,
    YEAR_CHANGE,
    DATE_RESET,
    DAY_SELECTED,
    FETCHED_EVENTS,
    EVENT_EDIT,
    EVENT_ADD,
    EVENT_ADDED,
    EVENT_UPDATED, EVENT_DELETE_MODAL, EVENT_DELETED, EVENT_SELECT
} from '../actions/actionsTypes';
import {calendarDays, getDay, getDaysInMonth, month_change_correction} from "../../utilities/calendar_utilities";


const date = new Date();
var total_days =  getDaysInMonth(date.getMonth()+1,date.getFullYear());
var dayStart =  getDay(date.getMonth()+1,date.getFullYear());
const initState = {
    calendar_info:{
        day: date.getDate(),
        month: date.getMonth()+1,
        year: date.getFullYear()
    },
    calendar_extra_info:{
        total_days,
        dayStart,
        calendarDays: calendarDays(total_days,dayStart)
    },
    events: [],
    event_edit_id: null,
};
export default function calendar(state = initState, action = {}) {
    switch (action.type) {
        case EVENT_DELETED:
            console.log(action);
            return {
                ...state,
                events: state.events.filter(event => {
                    return event._id != action._id
                })
            };
        case EVENT_UPDATED:
            return {
                ...state,
                events: state.events.map((event)=>{
                    if(event._id == action.event._id ) return {
                        ...event,
                        title: action.event.title,
                        description: action.event.description,
                    };
                    return event;

                })
            };
        case EVENT_ADDED:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.event
                ]
            };
        case EVENT_ADD:
            return {
                ...state,
                event_edit_id: null,
                event_delete_id: null,
            };
        case EVENT_EDIT:
            return {
                ...state,
                event_edit_id: action._id,
                event_delete_id: null,
            };
        case EVENT_DELETE_MODAL:
            return {
                ...state,
                event_delete_id: action._id,
                event_edit_id: null,
            };
        case EVENT_SELECT:
            return {
                ...state,
                event_delete_id: null,
                event_edit_id: null,
                event_select_id: action._id,
            };
        case FETCHED_EVENTS:
            return {
                ...state,
                events: action.events
            };
        case DAY_SELECTED:
            return {
                ...state,
                selected_day: action.day
            };
        case DATE_RESET:
            const date = new Date();
            var monthYear = [date.getMonth()+1,date.getFullYear()];
            var total_days = getDaysInMonth(...monthYear);
            var dayStart = getDay(...monthYear);
            return{
                ...state,
                calendar_info:{
                    day: date.getDay(),
                    month: date.getMonth()+1,
                    year: date.getFullYear()
                },
                calendar_extra_info:{
                    ...state.calendar_extra_info,
                    total_days,
                    dayStart,
                    calendarDays: calendarDays(total_days, dayStart)
                }
            };
        case YEAR_CHANGE:
            var year = state.calendar_info.year + (action.incDec);
            var total_days  =  getDaysInMonth(state.calendar_info.month,year);
            var dayStart  =  getDay(state.calendar_info.month,year);
            return {
                ...state,
                calendar_info:{
                    ...state.calendar_info,
                    year: year
                },
                calendar_extra_info:{
                    ...state.calendar_extra_info,
                    total_days,
                    dayStart,
                    calendarDays: calendarDays(total_days, dayStart)
                }
            };
        case MONTH_CHANGE:
            var {month, year}  = month_change_correction(state.calendar_info.month+(action.incDec), state.calendar_info.year);
            var total_days =  getDaysInMonth(month,year);
            var dayStart =  getDay(month,year);
            return {
                ...state,
                calendar_info:{
                    ...state.calendar_info,
                    month,
                    year
                },
                calendar_extra_info:{
                    ...state.calendar_extra_info,
                    total_days,
                    dayStart,
                    calendarDays: calendarDays(total_days, dayStart)
                }
            };
        default: return state;
    }
}
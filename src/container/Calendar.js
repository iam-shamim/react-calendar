import React, { Component } from 'react';
import EventDeleteModal from '../component/calendar/EventDeleteModal';
import EventFilterWithColor from '../component/calendar/EventFilterWithColor';
import CalendarHeader from "../component/calendar/CalendarHeader";
import CalendarBody from "../component/calendar/CalendarBody";
class Calendar extends Component{

    render() {
        return (
            <div>
                <div className="col-xs-12 backend-mainbar">
                    <div id="event_calender">
                        <div className="panel panel-default">
                            <div className="panel-heading"><label>Event Calendar</label></div>
                            <div className="panel-body">
                                <EventDeleteModal />
                                <div id="app">
                                    <EventFilterWithColor />
                                    <div className="calendar-view holiday-us-traditional holiday-us-official locale-en locale-en-us y2018 m05 period-month periodCount-1">
                                        <CalendarHeader />
                                        <CalendarBody />

                                    </div>
                                    <ul className="event_list event_group_list">
                                        <div></div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Calendar;
import React from 'react';
import classnames from 'classnames';
export default function CalendarEvent({ event, edit, delete_event,event_select }) {
    return(
        <li>
            <p className="pointer pull-left" onClick={()=>event_select(event._id)}>
                { event.title }
            </p>
            <div className="pull-right">
                <button className="btn btn-primary btn-xs" onClick={()=>edit(event._id)} data-toggle="modal" data-target="#event_insert_modal"><span className="glyphicon glyphicon-pencil"></span></button>
                <button className="btn btn-danger btn-xs" onClick={()=>delete_event(event._id)} data-toggle="modal" data-target="#eventDeleteModel"><span className="glyphicon glyphicon-trash"></span></button>
            </div>
        </li>
    );
}
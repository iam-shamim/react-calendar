import React  from 'react';
import classnames from 'classnames';
export default function CalendarDay({ day,onSelectDay, selected_day,events }) {
    return(
        <div className={classnames('day','pointer',{day_active: day===selected_day && day !== ''})} onClick={()=>onSelectDay(day)}>
            <div className="content">
                <div className="date">
                    {day}
                </div>
                <div className="event_short_list">
                    <ul>
                        { events.map((event,key)=> (<li key={key}> { event.title }</li>)) }
                    </ul>
                </div>
            </div>
        </div>
    );
}
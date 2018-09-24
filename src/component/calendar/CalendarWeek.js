import React, { Component } from 'react';
import CalendarDay from "./CalendarDay";
import connect from "react-redux/es/connect/connect";
class CalendarWeek extends Component {
    render(){
        return(
            <div className="week week1 ws2018-04-29">
                { this.props.week.map((day,key)=> <CalendarDay day={day} key={key} events={this.props.events_list.filter(event => event.day == day)} onSelectDay={this.props.onSelectDay} selected_day={this.props.selected_day} />)}
            </div>
        );
    }

}
const mapStateToProps = state => {
    return {
        events_list: state.calendar.events
    };
};
export default connect(mapStateToProps)(CalendarWeek);
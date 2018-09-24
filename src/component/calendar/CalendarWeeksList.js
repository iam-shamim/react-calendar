import React, { Component} from 'react';
import CalendarWeek from "./CalendarWeek";
import { connect } from 'react-redux';
import {selectDay} from "../../store/actions/calendar";

class CalendarWeeksList extends Component {
    onSelectDay = (day)=>{
        this.props.selectDay(day);
    };
    render(){
        return(
            <div className="weeks">
                <div className="pre_loader d-none"></div>
                { this.props.weeks.map((week, key)=> {
                    return(
                        <div className="week week1 ws2018-04-29" key={key}>
                            <CalendarWeek week={week} onSelectDay={this.onSelectDay} selected_day={this.props.selected_day}/>
                        </div>
                    )
                })}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return{
      selected_day: state.calendar.selected_day
  }
};
export default connect(mapStateToProps,{
    selectDay
})(CalendarWeeksList);
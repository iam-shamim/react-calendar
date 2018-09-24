import React,{Component} from 'react';
import { connect } from 'react-redux';
import CalendarWeeksList from "./CalendarWeeksList";
import { fetchEvents } from '../../store/actions/calendar'
import CalendarEventsList from "./CalendarEventsList";
class CalendarBody extends Component{
    componentWillMount(){
        this.props.fetchEvents({month:this.props.calendar_info.month, year: this.props.calendar_info.year});
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.calendar_info){
            this.props.fetchEvents({month:nextProps.calendar_info.month, year: nextProps.calendar_info.year});
        }
    }
    render() {
        return (
            <div>
                <div className="dayList">
                    <div className="day dow0">Sun</div>
                    <div className="day dow1">Mon</div>
                    <div className="day dow2">Tue</div>
                    <div className="day dow3">Wed</div>
                    <div className="day dow4">Thu</div>
                    <div className="day dow5">Fri</div>
                    <div className="day dow6">Sat</div>
                </div>
                <CalendarWeeksList weeks={this.props.calendarDays}/>
                <CalendarEventsList/>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
      calendarDays: state.calendar.calendar_extra_info.calendarDays,
      calendar_info: state.calendar.calendar_info
  }
};
export default connect(mapStateToProps,{ fetchEvents })(CalendarBody);
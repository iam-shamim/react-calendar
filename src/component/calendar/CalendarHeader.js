import React,{Component} from 'react';
import { connect } from 'react-redux'
import { goNextMonth, goPrevMonth, goPrevYear, goNextYear, resetDate } from '../../store/actions/calendar'
import {getDaysInMonth, getMonthName} from '../../utilities/calendar_utilities'
class CalendarHeader extends Component{
    render() {
        return (
            <div>
                <div className="header">
                    <div className="nav">
                        <button className="previousYear" onClick={() => this.props.goPrevYear()}></button>
                        <button className="previousPeriod" onClick={() => this.props.goPrevMonth()}></button>
                        <button className="nextPeriod" onClick={()=>this.props.goNextMonth()}></button>
                        <button className="nextYear" onClick={()=>this.props.goNextYear()}></button>
                        <button onClick={()=>this.props.resetDate()}>Reset</button>
                    </div>
                    <div className="periodLabel singleYear singleMonth">
                        <div className="startMonth">{ getMonthName(this.props.calendar_info.month) }</div>
                        <div className="endYear">
                            { this.props.calendar_info.year }
                        </div>
                    </div>
                    <div><select className="form-control">
                        <option value="">All</option>
                        <option value="1">Occasional Day</option>
                        <option value="2"> &nbsp;&nbsp;&nbsp; &gt;&gt; Non Holy Day</option>
                        <option value="3"> &nbsp;&nbsp;&nbsp; &gt;&gt; Holy Day</option>
                        <option value="4">Historical Day</option>
                    </select></div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
  return {
      calendar_info: state.calendar.calendar_info,
  }
};
export default connect(mapStateToProps,{goNextMonth, goPrevMonth, goPrevYear, goNextYear, resetDate})(CalendarHeader);
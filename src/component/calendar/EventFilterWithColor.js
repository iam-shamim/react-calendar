import React, { Component } from 'react';
import { connect } from 'react-redux';
import {addEvent} from "../../store/actions/calendar";

class EventFilterWithColor extends Component{
    render() {
        var add_event = null;
        if(this.props.selected_day){
            add_event = (
                <button className="btn btn-primary" data-toggle="modal" data-target="#event_insert_modal" onClick={()=> this.props.addEvent()}>
                    <span className="glyphicon glyphicon-plus"></span> Add Event
                </button>
            );
        }
        return (
            <div>
                <div className="app-description" style={{height: "35px"}}>
                    <div>
                        <div className="pull-left">
                            { add_event }
                        </div>
                        <ul className="pull-right event_type_color">
                            <li title="All Events" className="reset_filter"></li>
                            <li title="Non Holy Day Occasion" className="non_holy_day_occasion"></li>
                            <li title="Holy Day Occasion" className="holy_day_occasion"></li>
                            <li title="Historical Day" className="historical_day"></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return {
      selected_day: state.calendar.selected_day
  };
};
export default connect(mapStateToProps, { addEvent })(EventFilterWithColor);
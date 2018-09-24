import React, { Component} from 'react';
import { connect } from 'react-redux';
import { eventEdit, eventDeleteModal, eventSelect } from "../../store/actions/calendar";
import CalendarEvent from "./CalendarEvent";

class CalendarEventsList extends Component {
     onEditHandler = (_id)=>{
         this.props.eventEdit(_id);
    };
     onDeleteHandler = (_id)=>{
         this.props.eventDeleteModal(_id);
    };
     onSelectEventHandler = (_id)=>{
         this.props.eventSelect(_id);
    };
    render(){
        return(
            <div>
                <div className="event_list">
                    <ul>
                        { this.props.events.map((event,key)=>{
                            return <CalendarEvent key={key} event={event} edit={this.onEditHandler} event_select={this.onSelectEventHandler} delete_event={this.onDeleteHandler}/>
                        }) }
                    </ul>
                </div>
                { this.props.event_select_id && this.props.events.find(event => event._id==this.props.event_select_id) && <div className="event_des_view"><p>{ this.props.events.find(event => event._id==this.props.event_select_id).description}</p></div> }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
  return{
      events: state.calendar.events.filter((event) => {
          return event.day === state.calendar.selected_day;
      }),
      event_select_id: state.calendar.event_select_id,
  }
};
export default connect(mapStateToProps, { eventEdit,eventDeleteModal, eventSelect })(CalendarEventsList);
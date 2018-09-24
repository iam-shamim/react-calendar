import React, {Component} from 'react';
import { connect } from 'react-redux';
import {eventDelete} from "../../store/actions/calendar";
import {bsModalClose} from "../../utilities/calendar_utilities";
class EventDeleteModal extends Component{
    deleteEvent = () =>{
        this.props.eventDelete(this.props.delete_event_info._id).then(()=>{
            bsModalClose('event_delete_modal_close');
        });
    };
    render(){
        return (
            <div>
                <div className="modal fade" id="eventDeleteModel" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal"><span
                                    aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                <h4 className="modal-title" id="myModalLabel">Event Delete</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="event_title">{ this.props.delete_event_info && this.props.delete_event_info.title}</label>
                                    <p>
                                        { this.props.delete_event_info && this.props.delete_event_info.description}
                                    </p>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" id="event_delete_modal_close" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={()=> this.deleteEvent() }><span className="glyphicon glyphicon-trash"></span> Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        delete_event_info: state.calendar.events.find(event => {
            return event._id === state.calendar.event_delete_id;
        })
    }
};
export default connect(mapStateToProps, { eventDelete})(EventDeleteModal);
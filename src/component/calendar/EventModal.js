import React, {Component} from 'react';
import classnames from 'classnames';
import { eventStore, eventUpdate } from "../../store/actions/calendar";
import { connect } from 'react-redux';
import {bsModalClose, snToDouble} from "../../utilities/calendar_utilities";

class EventModal extends Component{
    state = {
        _id: null,
        title: '',
        description: '',
        errors: {}
    };
    onEventSubmit = (event)=>{
        event.preventDefault();
        if(this.state.title === ''){
            this.setState({errors: {title: "Can't be empty"}});
        }else{
            const data = {
                title: this.state.title,
                description: this.state.description,
                event_date: (this.props.calendar_info.year)+'-'+(snToDouble(this.props.calendar_info.month))+'-'+(snToDouble(this.props.selected_day))
            };
            if(this.state._id){
                data._id = this.state._id;
                this.props.eventUpdate(data).then(()=>{
                    bsModalClose('event_insert_modal_close');
                }).catch((err)=>this.setState({errors: err.response.errors}));

            }else{
                this.props.eventStore(data).then(()=>{
                    this.setState({_id: null, title: '', description: ''});
                    bsModalClose('event_insert_modal_close');
                }).catch((err)=>this.setState({errors: err.response.errors}));
            }

        }
    };
    onChange = (event)=> {
        this.setState({
           [event.target.name]: event.target.value
        });

    };
    componentWillReceiveProps(nextProps){
        if(nextProps.event_edit_id){
            this.setState({
                _id: nextProps.edit_event_info._id,
                title: nextProps.edit_event_info.title,
                description: nextProps.edit_event_info.description
            });
        }else if(nextProps.event_edit_id === null){
            this.setState({
                _id: null,
                title: '',
                description: ''
            });
        }
    }
    render() {
        return (
            <div>
                <div className="modal fade" id="event_insert_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <form onSubmit={this.onEventSubmit}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                                    { !this.props.event_edit_id && <h4 className="modal-title" id="myModalLabel">Event Insert</h4> }
                                    { this.props.event_edit_id && <h4 className="modal-title" id="myModalLabel">Edit Event</h4> }

                                </div>
                                <div className="modal-body">
                                    <p className="text-danger text-center">{this.state.errors.global}</p>
                                    <div className={classnames("form-group",{"has-error":this.state.errors.title})}>
                                        <label htmlFor="event_title">Event Title</label>
                                        <input type="text" value={this.state.title} onChange={this.onChange} autoComplete="off" className="form-control" id="event_title" name="title"/>
                                        <span className="text-danger">{ this.state.errors.title }</span>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="event_description">Event Description</label>
                                        <textarea className="form-control" rows="5" id="event_description" name="description" value={this.state.description} onChange={this.onChange}></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default"  id="event_insert_modal_close" data-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        calendar_info: state.calendar.calendar_info,
        selected_day: state.calendar.selected_day,
        event_edit_id: state.calendar.event_edit_id,
        edit_event_info: state.calendar.events.find(event => {
            return event._id === state.calendar.event_edit_id;
        })

    }
};
export default connect(mapStateToProps, { eventStore, eventUpdate })(EventModal);
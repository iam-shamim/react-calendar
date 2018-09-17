import React, {Component} from 'react';

class EventDeleteModal extends Component{
    render() {
        return (
            <div>
                <div id="delete_modal" tabIndex="-1" role="dialog"
                     className="modal fade bs-example-modal-md">
                    <div role="document" className="modal-dialog modal-md">
                        <div className="modal-content">
                            <div className="modal-header"><h4>
                                Delete Event: </h4>
                                <small><i></i></small>
                            </div>
                            <div className="modal-body">
                                <button type="button" data-dismiss="modal"
                                        className="btn btn-default">Close
                                </button>
                                <button className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default EventDeleteModal;
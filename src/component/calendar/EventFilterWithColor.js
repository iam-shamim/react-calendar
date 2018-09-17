import React, { Component } from 'react';
class EventFilterWithColor extends Component{
    render() {
        return (
            <div>
                <div className="app-description" style={{height: "35px"}}>
                    <div>
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
export default EventFilterWithColor;
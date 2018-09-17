import React,{Component} from 'react';
class CalendarHeader extends Component{
    render() {
        return (
            <div>
                <div className="header">
                    <div className="nav">
                        <button className="previousYear"></button>
                        <button className="previousPeriod"></button>
                        <button className="nextPeriod"></button>
                        <button className="nextYear"></button>
                        <button>Reset</button>
                    </div>
                    <div className="periodLabel singleYear singleMonth">
                        <div className="startMonth">September</div>
                        <div className="endYear">
                            2017
                            (
                            ভাদ্র
                            ১৪২৪
                            -
                            আশ্বিন
                            ১৪২৪
                            )
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
export default CalendarHeader;
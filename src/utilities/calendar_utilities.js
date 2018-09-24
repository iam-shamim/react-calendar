export const getDaysInMonth = (month,year) => {
    return new Date(year, month, 0).getDate();
};
export const getDay = (month,year) => {
    return new Date(year, (month-1), 1).getDay();
};
export const calendarDays = (totalDays,dayStart) => {
    var chunkValue = dayStart;
    var days = [];
    var dayNumber = 1;
    var cell = 35;
    if( (totalDays+dayStart) > 35){
        cell = 42;
    }
    for(var i=0;i<cell;i++){
        if(i >= dayStart && dayNumber<=totalDays){
            days.push(dayNumber++);
        }else{
            days.push('');
        }
    }

    var chunk = function(days,groupsize){
        var sets = [], chunks, i = 0;
        chunks = days.length / groupsize;

        while(i < chunks){
            sets[i] = days.splice(0,groupsize);
            i++;
        }

        return sets;
    };
    var chunkDays = chunk(days,7);
    return chunkDays;
};
export const  getMonthName = (month) => {
    month--;
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month];
};

export const  month_change_correction = (month, year) =>  {
    if(month>12 && month>0){
        return{
            month: 1,
            year: year + 1,
        };
    }else if(month <= 0){
        return{
            month: 12,
            year: year - 1,
        };
    }else{
        return{
            month,
            year,
        };
    }
};
export const snToDouble = (number) => {
    number = parseInt(number);
    return number<10? '0'+number:number;
};
export const bsModalClose = (id) => {
    document.getElementById(id).click();
};

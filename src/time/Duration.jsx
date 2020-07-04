let to_secs = 1000
let to_mins = 1875 << 5 
let to_hours = 28125 << 7
let to_days = 84375 << 10
let to_weeks = 590625 << 10



function time_since(past_date){
    
    const current_time = new Date();
    var time_diff = current_time.getTime() - past_date.getTime(); 
    var years = current_time.getFullYear() - past_date.getFullYear();
    var months = (current_time.getMonth + 12*current_time.getFullYear()) - (past_date.getMonth + 12*past_date.getFullYear());
    var weeks = Math.floor(time_diff / to_weeks);
    var days = Math.floor((time_diff%to_weeks) / to_days);
    var hours = Math.floor((time_diff % to_days) / to_hours);
    var minutes = Math.floor((time_diff % to_hours) / to_mins);

    let string = ""
    let count = 2;

    if(years > 0 && count > 0){string += (years+" year"+"s".repeat(years!=1)+" "); count--;}
    if(months > 0 && count > 0){string += (months+" month"+"s".repeat(months!=1)+" "); count--;}
    if(weeks > 0 && count > 0){string += (weeks+" week"+"s".repeat(weeks!=1)+" "); count--;}
    if(days > 0 && count > 0){string += (days+" day"+"s".repeat(days!=1)+" "); count--;}
    if(hours > 0 && count > 0){string += (hours+" hour"+"s".repeat(hours!=1)+" "); count--;}
    if((minutes > 0 || count == 2) && count > 0){string += (minutes+" minute"+"s".repeat(minutes != 1)+" "); count--;}

    return string


}

export default time_since
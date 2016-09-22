window.musicapp = window.musicapp || {};

window.musicapp.fixTime = function(dt){
    return (new Date(dt)).toUTCString();
};

window.musicapp.dateConv1 = function(dtstr){
    var dt = new Date(dtstr);
    dt.setTime(dt.getTime() + dt.getTimezoneOffset()*60*1000);
    var month = dt.getMonth() + 1 + '';
    if(month.length === 1) month = '0' + month;

    var day = dt.getDate() + '';
    if(day.length === 1) day = '0' + day;

    var year = dt.getFullYear() + '';

    return month + '/' + day + '/' + year;
};

window.musicapp.dateConv2 = function(dt){
    dt.setTime(dt.getTime() + dt.getTimezoneOffset()*60*1000);
    var month = dt.getMonth() + 1 + '';
    if(month.length === 1) month = '0' + month;

    var day = dt.getDate() + '';
    if(day.length === 1) day = '0' + day;

    var year = dt.getFullYear() + '';

    var hours = '0' + (dt.getHours());
    hours = hours.substring(hours.length - 2, hours.length);

    var mins = '0' + (dt.getMinutes());
    mins = mins.substring(mins.length - 2, mins.length);

    var secs = '0' + (dt.getSeconds());
    secs = secs.substring(secs.length - 2, secs.length);

    return month + '/' + day + '/' + year + ' ' + hours + ':' + mins + ':' + secs;
};

window.musicapp.dateConv3 = function(dt){
    dt.setTime(dt.getTime() + dt.getTimezoneOffset()*60*1000);
    var month = dt.getMonth() + 1 + '';
    if(month.length === 1) month = '0' + month;

    var day = dt.getDate() + '';
    if(day.length === 1) day = '0' + day;

    var year = dt.getFullYear() + '';

    var hours = '0' + (dt.getHours());
    hours = hours.substring(hours.length - 2, hours.length);

    var mins = '0' + (dt.getMinutes());
    mins = mins.substring(mins.length - 2, mins.length);

    var secs = '0' + (dt.getSeconds());
    secs = secs.substring(secs.length - 2, secs.length);

    return  hours + ':' + mins + ':' + secs;
};

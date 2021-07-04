export function getFormatedDate(date) {
    var dt = new Date(date);
    var currentDate = new Date();
    var m = ((dt.getMonth() + 1).toString().padStart(2, '0'));
    var d = (dt.getDate().toString().padStart(2, '0'));
    var y = (dt.getFullYear().toString().padStart(4, '0'));
    var time = (`${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`
        );
    if (dt.getDay() === currentDate.getDay()) {
        return time;
    } else if(dt.getDate() === currentDate.getDate() -1){
        return 'Yesterday ' + time;
    } else{
        if (dt.getFullYear() === currentDate.getFullYear()) {
            return d + "-" + m + ' ' + time;
        }else{
            return d + "-" + m + '' + y + ' ' + time;
        }
    }
    // return (`${
    //     (dt.getMonth()+1).toString().padStart(2, '0')}/${
    //     dt.getDate().toString().padStart(2, '0')}/${
    //     dt.getFullYear().toString().padStart(4, '0')} ${
    //     dt.getHours().toString().padStart(2, '0')}:${
    //     dt.getMinutes().toString().padStart(2, '0')}:${
    //     dt.getSeconds().toString().padStart(2, '0')}`
    // );
}
export function getDateForLeftSideChat(date) {
    var dt = new Date(date);
    var currentDate = new Date();
    var m = ((dt.getMonth() + 1).toString().padStart(2, '0'));
    var d = (dt.getDate().toString().padStart(2, '0'));
    var y = (dt.getFullYear().toString().padStart(4, '0'));
    var time = (`${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`
        );
    if (dt.getDay() === currentDate.getDay()) {
        return time;
    } else if(dt.getDate() === currentDate.getDate()-1){
        return 'Yesterday';
    } else{
        if (dt.getFullYear() === currentDate.getFullYear()) {
            return d + "-" + m ;
        }else{
            return d + "-" + m + '' + y ;
        }
    }
}
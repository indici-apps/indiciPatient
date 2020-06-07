


export const GetDayName = date => {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(date);
    var dayName = days[d.getDay()];
    return dayName;
};

// function getDayName(date) {
//     var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     var d = new Date(date);
//     var dayName = days[d.getDay()];
//     return dayName;
// }


export const GetAppointmentDate = date => {
    var d = new Date(date);
    var n = d.getDate();
    return n;
}

// function getAppointmentDate(date) {
//     var d = new Date(date);
//     var n = d.getDate();
//     return n;
// }


export const GetMonthName = date => {
    var days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var d = new Date(date);
    var monthName = days[d.getMonth()];
    return monthName;
}


export const GetYear = date =>{
    var d = new Date(date);
    var n = d.getFullYear();
    return n;
}

// function getMonthName(date) {
//     var days = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oc', 'Nov', 'Dec'];
//     var d = new Date(date);
//     var monthName = days[d.getMonth()];
//     return monthName;
// }


export const ReturnTypeIcon = type => {
    if (type === 'Telephonic') {
        return require('../assets/telephone.png');
    }
    if (type === 'Video') {
        return require('../assets/video.png');
    }
    if (type === 'F2F') {
        return require('../assets/face.png');
    }
}

// function returnTypeIcon(type) {
//     if (type === 'Telephonic') {
//         return require('../assets/telephone.png');
//     }
//     if (type === 'Video') {
//         return require('../assets/video.png');
//     }
//     if (type === 'F2F') {
//         return require('../assets/face.png');
//     }
// }